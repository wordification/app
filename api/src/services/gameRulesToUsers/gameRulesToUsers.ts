import { db } from 'src/lib/db'

import type {
  QueryResolvers,
  MutationResolvers,
  GameRulesToUserRelationResolvers,
} from 'types/graphql'

export const gameRulesToUsers: QueryResolvers['gameRulesToUsers'] = () => {
  return db.gameRulesToUser.findMany()
}

export const gameRulesToUser: QueryResolvers['gameRulesToUser'] = ({ id }) => {
  return db.gameRulesToUser.findUnique({
    where: { id },
  })
}

export const createGameRulesToUser: MutationResolvers['createGameRulesToUser'] =
  ({ input }) => {
    return db.gameRulesToUser.create({
      data: input,
    })
  }

export const updateGameRulesToUser: MutationResolvers['updateGameRulesToUser'] =
  ({ id, input }) => {
    return db.gameRulesToUser.update({
      data: input,
      where: { id },
    })
  }

export const deleteGameRulesToUser: MutationResolvers['deleteGameRulesToUser'] =
  ({ id }) => {
    return db.gameRulesToUser.delete({
      where: { id },
    })
  }

export const GameRulesToUser: GameRulesToUserRelationResolvers = {
  user: (_obj, { root }) => {
    return db.gameRulesToUser.findUnique({ where: { id: root?.id } }).user()
  },
}
