import { db } from 'src/lib/db'

import {
  getGrapheme,
  getPhoneme,
  getSortingGamePhrase,
  getSortingGameSentence,
  getSortingGameWord,
} from '../audio'

import type { QueryResolvers, MutationResolvers } from 'types/graphql'

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
 * 0. Initial level (not currently used)
 * 1. Phoneme level (click long I or long O, etc)
 * 2. Grapheme level (click iCe, igh, y, etc)
 * 3. Word level (type the word)
 * 4. Complete (game is over)
 * @param gameId The ID of the game to advance
 * @param currentLevel The current level of the game
 * @returns The updated game or undefined if the game is already complete
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

export const sortingGameFirstLevel: QueryResolvers['sortingGameFirstLevel'] =
  async ({ gameId }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
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
      getSortingGameWord(currentWord.word),
      // a sentence that has
      getSortingGamePhrase('intro_sentence'),
      // [ WORD ]
      getSortingGameWord(currentWord.word),
      // [ SENTENCE ]
      getSortingGameSentence(currentWord.word),
      // the sounds that make
      getSortingGamePhrase('intro_sounds'),
      // [ WORD ]
      getSortingGameWord(currentWord.word),
      // are
      getSortingGamePhrase('are'),
      // [ SOUNDs ]
      ...phonemeAudios,
      // which is the vowel sound in
      getSortingGamePhrase('intro_vsound_select'),
      // [ WORD ]
      getSortingGameWord(currentWord.word),
    ]

    return {
      game,
      audio,
      // TODO: figure out a better way to access the phonemes
      phonemes: [
        {
          id: 49,
          label: 'Long I',
        },
        {
          id: 53,
          label: 'Long O',
        },
      ],
    }
  }

export const sortingGameSecondLevel: QueryResolvers['sortingGameSecondLevel'] =
  async ({ gameId }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
    })

    const currentWord = game?.currentWord

    if (!currentWord) {
      throw new Error('Current word not selected')
    }

    const audio = [
      getSortingGamePhrase('spelling_pattern'),
      getPhoneme(currentWord.testedPhonemes[0]),
      getSortingGamePhrase('in'),
      getSortingGameWord(currentWord.word),
    ]

    return {
      game,
      graphemes: ['iCe', 'igh', 'y', 'ow', 'oa', 'oCe'],
      audio,
    }
  }

export const sortingGameThirdLevel: QueryResolvers['sortingGameThirdLevel'] =
  async ({ gameId }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
    })

    const currentWord = game?.currentWord

    if (!currentWord) {
      throw new Error('Current word not selected')
    }

    const audio = [
      getSortingGamePhrase('box_prompt'),
      getSortingGameWord(currentWord.word),
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
}: {
  gameId: number
  gameLevel: number
  incorrectGuesses: number
  correct: boolean
  incorrectAudio: string[] | undefined
}) => {
  if (correct) {
    await advanceLevel(gameId, gameLevel)

    return { correct: true }
  }

  // Only allow 2 incorrect guesses
  if (incorrectGuesses >= 2) {
    await advanceLevel(gameId, gameLevel)

    return { correct: true }
  }

  await db.game.update({
    data: {
      incorrectGuesses: { increment: 1 },
    },
    where: { id: gameId },
  })

  return { correct: false, audio: incorrectAudio }
}

export const sortingGameGradeFirstLevel: MutationResolvers['sortingGameGradeFirstLevel'] =
  async ({ gameId, phoneme }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
    })

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
        getSortingGamePhrase('not_spelling_pattern'),
        getSortingGameWord(game.currentWord.word),
        getSortingGamePhrase('incorrect_try'),
      ],
    })
  }

export const sortingGameGradeSecondLevel: MutationResolvers['sortingGameGradeSecondLevel'] =
  async ({ gameId, grapheme }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
    })

    if (game === null) {
      throw new Error('Game not found')
    }

    if (game.currentWord === null) {
      throw new Error('Current word not selected')
    }

    return handleGrade({
      gameId: game.id,
      gameLevel: game.level,
      incorrectGuesses: game.incorrectGuesses,
      correct: game.currentWord.testedGraphemes.includes(grapheme),
      incorrectAudio: [
        getSortingGamePhrase('incorrect'),
        getGrapheme(grapheme),
        getSortingGamePhrase('not_spelling_pattern'),
        getSortingGameWord(game.currentWord.word),
        getSortingGamePhrase('tryagain'),
      ],
    })
  }

export const sortingGameGradeThirdLevel: MutationResolvers['sortingGameGradeThirdLevel'] =
  async ({ gameId, entry }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
    })

    if (game === null) {
      throw new Error('Game not found')
    }

    if (game.currentWord === null) {
      throw new Error('Current word not selected')
    }

    return handleGrade({
      gameId: game.id,
      gameLevel: game.level,
      incorrectGuesses: game.incorrectGuesses,
      correct:
        game.currentWord.word.toLowerCase().trim() ===
        entry.toLowerCase().trim(),
      incorrectAudio: [
        getSortingGamePhrase('incorrect'),
        getSortingGameWord(game.currentWord.word),
        getSortingGamePhrase('has_sound'),
        getPhoneme(game.currentWord.testedPhonemes[0]),
        getSortingGamePhrase('and_spelled_with'),
        getGrapheme(game.currentWord.testedGraphemes[0]),
        getSortingGamePhrase('tryagain'),
      ],
    })
  }
