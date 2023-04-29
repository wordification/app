import type {
  QueryResolvers,
  MutationResolvers,
  GameRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const games: QueryResolvers['games'] = () => {
  return db.game.findMany()
}

export const game: QueryResolvers['game'] = ({ id }) => {
  return db.game.findUnique({
    where: { id },
  })
}

export const createGame: MutationResolvers['createGame'] = ({ input }) => {
  return db.game.create({
    data: input,
  })
}

export const updateGame: MutationResolvers['updateGame'] = ({ id, input }) => {
  return db.game.update({
    data: input,
    where: { id },
  })
}

export const deleteGame: MutationResolvers['deleteGame'] = ({ id }) => {
  return db.game.delete({
    where: { id },
  })
}

export const Game: GameRelationResolvers = {
  user: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).user()
  },
  sortingGameWords: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).sortingGameWords()
  },
}
