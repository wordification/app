import { GameType } from '@prisma/client'

import { db } from 'src/lib/db'

import {
  getGrapheme,
  getLetter,
  getPhoneme,
  getSortingGamePhrase,
  getSortingGameSentence,
  getWord,
} from '../audio'

import type { Phoneme } from '@prisma/client'
import type {
  QueryResolvers,
  MutationResolvers,
  ResolverTypeWrapper,
} from 'types/graphql'

/**
 * Updates a sorting game to select a new word to test. If there are no more
 * words to test, the game is marked as complete. Otherwise, the game is
 * reset to level 1 and the next word is selected.
 *
 * @param gameId The ID of the game to advance
 * @returns The updated game
 */
export const selectNextWord = async (gameId: number) => {
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: {
      incompleteWords: true,
    },
  })

  if (game === null) {
    throw new Error('Game not found')
  }

  const { incompleteWords } = game

  if (incompleteWords.length === 0) {
    return db.game.update({
      data: {
        level: 4,
        complete: true,
        incorrectGuesses: 0,
        currentWordId: null,
      },
      where: { id: gameId },
    })
  }

  const newWord = incompleteWords[0]
  return db.game.update({
    data: {
      level: 1,
      currentWordId: newWord.id,
      incompleteWords: {
        disconnect: [{ id: newWord.id }],
      },
      incorrectGuesses: 0,
    },
    where: { id: gameId },
  })
}

/**
 * Advances to the next level of a sorting game. These are the levels:
 *
 * 0. Initial level (not currently used)
 * 1. Phoneme level (click long I or long O, etc)
 * 2. Grapheme level (click iCe, igh, y, etc)
 * 3. Word level (type the word)
 * 4. Complete (game is over)
 *
 * @param gameId The ID of the game to advance
 * @param currentLevel The current level of the game
 * @returns The updated game or the current game if the game is already complete
 */
export const advanceLevel = (gameId: number, currentLevel: number) => {
  if (currentLevel >= 4) {
    return db.game.findUnique({
      where: { id: gameId },
    })
  }
  if (currentLevel === 3) {
    return selectNextWord(gameId)
  }
  return db.game.update({
    data: {
      level: { increment: 1 },
      incorrectGuesses: 0,
    },
    where: { id: gameId },
  })
}

/**
 * Finds a sorting game by ID and validates that it exists and is a sorting
 * game.
 *
 * @param gameId The ID of the game to find
 * @returns The game if it exists and is a sorting game, and its current word
 * @throws An error if the game is not found
 * @throws An error if the game is not a sorting game
 */
const findSortingGame = async (gameId: number) => {
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: {
      currentWord: true,
    },
  })

  if (!game) {
    throw new Error('Game not found')
  }

  if (game.type !== GameType.SORTING) {
    throw new Error('Game is not a sorting game')
  }

  return game
}

export const sortingGameFirstLevel: QueryResolvers['sortingGameFirstLevel'] =
  async ({ gameId }) => {
    const game = await findSortingGame(gameId)
    const phonemes = game.phonemes.map(async (p) => {
      const phoneme = await db.phoneme.findUnique({
        where: { id: p },
      })
      return phoneme as ResolverTypeWrapper<Phoneme>
    })

    const currentWord = game?.currentWord

    if (!currentWord) {
      throw new Error('Current word not selected')
    }

    // loop thru sounds
    const phonemeAudios = currentWord.phonemes.map((phoneme) =>
      getPhoneme(phoneme)
    )

    const audio = [
      // figure out vowel sound in
      getSortingGamePhrase('introvsound'),
      // [ WORD ]
      getWord(currentWord.word),
      // a sentence that has
      getSortingGamePhrase('intro_sentence'),
      // [ WORD ]
      getWord(currentWord.word),
      // [ SENTENCE ]
      getSortingGameSentence(currentWord.word),
      // the sounds that make
      getSortingGamePhrase('intro_sounds'),
      // [ WORD ]
      getWord(currentWord.word),
      // are
      getSortingGamePhrase('are'),
      // [ SOUNDs ]
      ...phonemeAudios,
      // which is the vowel sound in
      getSortingGamePhrase('intro_vsound_select'),
      // [ WORD ]
      getWord(currentWord.word),
    ]

    return {
      game,
      audio,
      phonemes,
    }
  }

export const sortingGameSecondLevel: QueryResolvers['sortingGameSecondLevel'] =
  async ({ gameId }) => {
    const game = await findSortingGame(gameId)

    const currentWord = game?.currentWord

    if (!currentWord) {
      throw new Error('Current word not selected')
    }

    const audio = [
      getSortingGamePhrase('spelling_pattern'),
      getPhoneme(currentWord.testedPhonemes[0]),
      getSortingGamePhrase('in'),
      getWord(currentWord.word),
    ]

    return {
      game,
      graphemes: ['iCe', 'igh', 'y', 'ow', 'oa', 'oCe'],
      audio,
    }
  }

export const sortingGameThirdLevel: QueryResolvers['sortingGameThirdLevel'] =
  async ({ gameId }) => {
    const game = await findSortingGame(gameId)

    const currentWord = game?.currentWord

    if (!currentWord) {
      throw new Error('Current word not selected')
    }

    const audio = [
      getSortingGamePhrase('box_prompt'),
      getWord(currentWord.word),
    ]

    return {
      game,
      audio,
    }
  }

const handleGrade = async ({
  gameId,
  gameLevel,
  incorrectGuesses,
  correct,
  incorrectAudio,
  correctAudio,
}: {
  gameId: number
  gameLevel: number
  incorrectGuesses: number
  correct: boolean
  incorrectAudio: string[] | undefined
  correctAudio: string[] | undefined
}) => {
  if (correct) {
    await advanceLevel(gameId, gameLevel)

    return {
      status: 'CORRECT' as const,
      audio: correctAudio,
    }
  }

  // Only allow 2 incorrect guesses
  if (incorrectGuesses >= 1) {
    await advanceLevel(gameId, gameLevel)

    return { status: 'TOO_MANY_INCORRECT_GUESSES' as const }
  }

  await db.game.update({
    data: {
      incorrectGuesses: { increment: 1 },
    },
    where: { id: gameId },
  })

  return { status: 'INCORRECT' as const, audio: incorrectAudio }
}

export const sortingGameGradeFirstLevel: MutationResolvers['sortingGameGradeFirstLevel'] =
  async ({ gameId, phoneme }) => {
    const game = await findSortingGame(gameId)

    if (!game?.currentWord) {
      throw new Error('Current word not selected')
    }

    return handleGrade({
      gameId: game.id,
      gameLevel: game.level,
      incorrectGuesses: game.incorrectGuesses,
      correct: game.currentWord.testedPhonemes.includes(phoneme),
      incorrectAudio: [
        getSortingGamePhrase('incorrect'),
        getPhoneme(phoneme),
        getSortingGamePhrase('incorrect_vsound'),
        getWord(game.currentWord.word),
        getSortingGamePhrase('incorrect_try'),
      ],
      correctAudio: [
        getSortingGamePhrase('correct'),
        getPhoneme(phoneme),
        getSortingGamePhrase('correct_vsound'),
        getWord(game.currentWord.word),
      ],
    })
  }

export const sortingGameGradeSecondLevel: MutationResolvers['sortingGameGradeSecondLevel'] =
  async ({ gameId, grapheme }) => {
    const game = await findSortingGame(gameId)

    if (!game?.currentWord) {
      throw new Error('Current word not selected')
    }

    return handleGrade({
      gameId: game.id,
      gameLevel: game.level,
      incorrectGuesses: game.incorrectGuesses,
      correct: game.currentWord.testedGraphemes.includes(grapheme),
      incorrectAudio: [
        getSortingGamePhrase('incorrect'),
        getSortingGamePhrase('the'),
        getPhoneme(game.currentWord.testedPhonemes[0]),
        getSortingGamePhrase('sound_in'),
        getWord(game.currentWord.word),
        getSortingGamePhrase('not_spelled_with'),
        getGrapheme(grapheme),
        getSortingGamePhrase('tryagain'),
      ],
      correctAudio: [
        getSortingGamePhrase('correct'),
        getSortingGamePhrase('the'),
        getPhoneme(game.currentWord.testedPhonemes[0]),
        getSortingGamePhrase('in'),
        getWord(game.currentWord.word),
        getSortingGamePhrase('spelled_with'),
        getGrapheme(grapheme),
      ],
    })
  }

export const sortingGameGradeThirdLevel: MutationResolvers['sortingGameGradeThirdLevel'] =
  async ({ gameId, entry }) => {
    const game = await findSortingGame(gameId)

    if (!game?.currentWord) {
      throw new Error('Current word not selected')
    }

    const lettersInWord = Array.from(game.currentWord.word.toLowerCase().trim())
    const letters = lettersInWord.map((letter) => {
      return getLetter(letter)
    })

    return handleGrade({
      gameId: game.id,
      gameLevel: game.level,
      incorrectGuesses: game.incorrectGuesses,
      correct:
        game.currentWord.word.toLowerCase().trim() ===
        entry.toLowerCase().trim(),
      incorrectAudio: [
        getSortingGamePhrase('incorrect'),
        getWord(game.currentWord.word),
        getSortingGamePhrase('has_sound'),
        getPhoneme(game.currentWord.testedPhonemes[0]),
        getSortingGamePhrase('and_spelled_with'),
        getGrapheme(game.currentWord.testedGraphemes[0]),
        getSortingGamePhrase('tryagain'),
      ],
      correctAudio: [
        getSortingGamePhrase('correct'),
        getWord(game.currentWord.word),
        getSortingGamePhrase('is_spelled'),
        ...letters,
        getSortingGamePhrase('good_job'),
      ],
    })
  }
