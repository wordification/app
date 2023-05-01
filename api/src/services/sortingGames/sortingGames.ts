import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const sortingGameFirstLevel: QueryResolvers['sortingGameFirstLevel'] = ({
  gameId: _gameId,
}) => {
  return {
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
  async ({ id, input }) => {
    const game = await db.game.findUnique({
      where: { id },
      include: {
        currentWord: true,
      },
    })

    if (game.currentWord.testedPhonemes.includes(input.phoneme)) {
      await db.game.update({
        data: {
          level: 2,
        },
        where: { id },
      })

      return true
    }

    return false
  }
