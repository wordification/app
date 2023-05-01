import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

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
      await db.game.update({
        data: {
          level: 2,
        },
        where: { id: gameId },
      })

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
      await db.game.update({
        data: {
          level: 3,
        },
        where: { id: gameId },
      })

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
      await db.game.update({
        data: {
          level: 4,
        },
        where: { id: gameId },
      })

      return true
    }

    return false
  }
