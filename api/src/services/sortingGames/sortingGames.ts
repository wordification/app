import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

import { game } from '../games/games'

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
    return game({ id: gameId })
  }
  if (currentLevel === 3) {
    return selectNextWord(gameId)
  }
  return db.game.update({
    data: {
      level: currentLevel + 1,
    },
    where: { id: gameId },
  })
}

export const sortingGameFirstLevel: QueryResolvers['sortingGameFirstLevel'] = ({
  gameId,
}) => {
  return {
    gameId,
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
  ({ gameId }) => {
    return {
      gameId,
      graphemes: ['iCe', 'igh', 'y', 'ow', 'oa', 'oCe'],
    }
  }

export const sortingGameGradeFirstLevel: MutationResolvers['sortingGameGradeFirstLevel'] =
  async ({ gameId, phoneme }) => {
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

    if (game.currentWord.testedPhonemes.includes(phoneme)) {
      await advanceLevel(game.id, game.level)

      return { correct: true }
    }

    return { correct: false }
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

    if (game.currentWord.testedGraphemes.includes(grapheme)) {
      await advanceLevel(game.id, game.level)

      return { correct: true }
    }

    return { correct: false }
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

    if (game.currentWord.word === entry) {
      await advanceLevel(game.id, game.level)

      return { correct: true }
    }

    return { correct: false }
  }
