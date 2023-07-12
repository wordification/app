import { GameType } from '@prisma/client'

import { db } from 'src/lib/db'

import { getMatchingGamePhrase, getWord } from '../audio'

import type { MutationResolvers, QueryResolvers, Word } from 'types/graphql'
/**
 * Finds a matching game by ID and validates that it exists and is a matching
 * game.
 *
 * @param gameId The ID of the game to find
 * @returns The game if it exists and is a matching game, and its current word
 * @throws An error if the game is not found
 * @throws An error if the game is not a matching game
 */
const findMatchingGame = async (gameId: number) => {
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: {
      incompleteWords: true,
      allWords: true,
    },
  })

  if (!game) {
    throw new Error('Game not found')
  }

  if (game.type !== GameType.MATCHING) {
    throw new Error('Game is not a matching game')
  }

  return game
}

/**
 * Advances to the next level of a matching game. These are the levels:
 *
 * 0. Initial level (not currently used)
 * 1. In progress (try to match words)
 * 2. Complete (game is over)
 *
 * @param gameId The ID of the game to advance
 * @returns The updated game or the current game if the game is already complete
 */
export const completeWords = async (
  gameId: number,
  firstWord: Word,
  secondWord?: Word
) => {
  if (secondWord) {
    /// updated game for MEMORY matching game
    const updatedGame = await db.game.update({
      where: { id: gameId },
      data: {
        incompleteWords: {
          disconnect: [{ id: firstWord.id }, { id: secondWord.id }],
        },
      },
      include: {
        incompleteWords: true,
      },
    })

    if (updatedGame.incompleteWords.length !== 0) {
      return updatedGame
    }

    return db.game.update({
      where: { id: gameId },
      data: {
        level: 2,
        complete: true,
      },
      include: {
        incompleteWords: true,
      },
    })
  } else {
    /// updated game for GROUPING matching game
    const updatedGame = await db.game.update({
      where: { id: gameId },
      data: {
        incompleteWords: {
          disconnect: [{ id: firstWord.id }],
        },
      },
      include: {
        incompleteWords: true,
      },
    })

    const game = await findMatchingGame(gameId)

    if (
      updatedGame.incompleteWords.some(
        (incompleteWord) =>
          incompleteWord.testedPhonemes[0] === game.currentPhonemeId
      )
    ) {
      return updatedGame
    }

    // Iterate to the next phoneme in the phonemes array and set it as the currentPhonemeId
    // If there is no next phoneme, return -1
    const currentIndex = game.phonemes.indexOf(game.currentPhonemeId ?? 0)
    const nextIndex = currentIndex + 1
    const nextPhoneme =
      nextIndex < game.phonemes.length ? game.phonemes[nextIndex] : -1

    if (nextPhoneme > 0) {
      return db.game.update({
        where: { id: gameId },
        data: {
          level: 1,
          currentPhonemeId: nextPhoneme,
          incompleteWords: {
            set: game.allWords.map((word) => ({ id: word.id })),
          },
        },
        include: {
          incompleteWords: true,
        },
      })
    }
    return db.game.update({
      where: { id: gameId },
      data: {
        level: 2,
        complete: true,
        currentPhonemeId: null,
      },
      include: {
        incompleteWords: true,
      },
    })
  }
}

export const matchingGamePlayLevel: QueryResolvers['matchingGamePlayLevel'] =
  async ({ gameId }) => {
    const game = await findMatchingGame(gameId)

    const incompleteWords = game?.incompleteWords

    if (!incompleteWords) {
      throw new Error('No words selected for matching')
    }

    const audio = [getMatchingGamePhrase('instructions')]

    return {
      game,
      audio,
      incompleteWords,
    }
  }

export const readWord: QueryResolvers['readWord'] = async ({ word }) => {
  const audio = [getWord(word)]
  return audio
}

export const groupingMatchingGameGrade: MutationResolvers['groupingMatchingGameGrade'] =
  async ({ gameId, wordId }) => {
    const game = await findMatchingGame(gameId)

    const word = game.incompleteWords.find((word) => word.id === wordId)

    if (!word) {
      throw new Error('Word not found')
    }

    const correct = word.testedPhonemes.some(
      (phoneme) => phoneme === game.currentPhonemeId
    )

    const correctAudio = [getMatchingGamePhrase('correct')]
    const incorrectAudio = [getMatchingGamePhrase('incorrect')]

    if (correct) {
      await completeWords(gameId, word)
      return { correct: true, audio: correctAudio }
    }

    return { correct: false, audio: incorrectAudio }
  }

export const matchingGameGrade: MutationResolvers['matchingGameGrade'] =
  async ({ gameId, firstWordId, secondWordId }) => {
    const game = await findMatchingGame(gameId)

    if (firstWordId === secondWordId) {
      throw new Error('Cannot select the same word twice')
    }

    const firstWord = game.incompleteWords.find(
      (word) => word.id === firstWordId
    )

    const secondWord = game.incompleteWords.find(
      (word) => word.id === secondWordId
    )

    if (!firstWord || !secondWord) {
      throw new Error('Word not found')
    }

    const correct = firstWord.testedPhonemes.some((phoneme) =>
      secondWord.testedPhonemes.includes(phoneme)
    )

    const correctAudio = [getMatchingGamePhrase('correct')]
    const incorrectAudio = [getMatchingGamePhrase('incorrect')]

    if (correct) {
      await completeWords(gameId, firstWord, secondWord)
      return { correct: true, audio: correctAudio }
    }

    return { correct: false, audio: incorrectAudio }
  }
