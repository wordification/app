import { GameType } from '@prisma/client'

import { db } from 'src/lib/db'

import type { MutationResolvers, Word } from 'types/graphql'
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
  secondWord: Word
) => {
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

    if (correct) {
      await completeWords(gameId, firstWord, secondWord)
    }

    return { correct, game, firstWord, secondWord }
  }
