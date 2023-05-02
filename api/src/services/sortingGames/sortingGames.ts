import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

import { game } from '../games/games'

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
    return db.game.update({
      data: {
        level: 4,
      },
      where: { id: gameId },
    })
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

    if (game.currentWord.testedPhonemes.includes(phoneme)) {
      await advanceLevel(game.id, game.level)

      return true
    }

    return false
  }

export const sortingGameGradeSecondLevel: MutationResolvers['sortingGameGradeSecondLevel'] =
  async ({ gameId, grapheme }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
    })

    if (game.currentWord.testedGraphemes.includes(grapheme)) {
      await advanceLevel(game.id, game.level)

      return true
    }

    return false
  }

export const sortingGameGradeThirdLevel: MutationResolvers['sortingGameGradeThirdLevel'] =
  async ({ gameId, entry }) => {
    const game = await db.game.findUnique({
      where: { id: gameId },
      include: {
        currentWord: true,
      },
    })

    if (game.currentWord.word === entry) {
      await advanceLevel(game.id, game.level)

      return true
    }

    return false
  }
