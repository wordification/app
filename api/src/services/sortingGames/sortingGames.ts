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
