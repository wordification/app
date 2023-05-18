import { db } from 'src/lib/db'

import type { MutationResolvers, Word } from 'types/graphql'

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
    },
    include: {
      incompleteWords: true,
    },
  })
}

export const matchingGameGrade: MutationResolvers['matchingGameGrade'] =
  async ({ gameId, firstWordId, secondWordId }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        incompleteWords: true,
      },
    })

    if (!game) {
      throw new Error('Game not found')
    }

    const firstWord = game?.incompleteWords.find(
      (word) => word.id === firstWordId
    )

    const secondWord = game?.incompleteWords.find(
      (word) => word.id === secondWordId
    )

    if (!firstWord || !secondWord) {
      throw new Error('Word not found')
    }

    if (firstWord.id === secondWord.id) {
      throw new Error('Cannot select the same word twice')
    }

    const correct = firstWord.testedPhonemes.some((phoneme) =>
      secondWord.testedPhonemes.includes(phoneme)
    )

    if (correct) {
      await completeWords(gameId, firstWord, secondWord)
    }

    return { correct, game, firstWord, secondWord }
  }
