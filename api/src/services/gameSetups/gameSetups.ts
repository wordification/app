import { db } from 'src/lib/db'

import type {
  QueryResolvers,
  MutationResolvers,
  GameSetupRelationResolvers,
} from 'types/graphql'

export const gameSetups: QueryResolvers['gameSetups'] = () => {
  return db.gameSetup.findMany()
}

export const gameSetup: QueryResolvers['gameSetup'] = ({ id }) => {
  return db.gameSetup.findUnique({
    where: { id },
  })
}

export const createGameSetup: MutationResolvers['createGameSetup'] = ({
  input,
}) => {
  return db.gameSetup.create({
    data: input,
  })
}

export const updateGameSetup: MutationResolvers['updateGameSetup'] = ({
  id,
  input,
}) => {
  return db.gameSetup.update({
    data: input,
    where: { id },
  })
}

export const deleteGameSetup: MutationResolvers['deleteGameSetup'] = ({
  id,
}) => {
  return db.gameSetup.delete({
    where: { id },
  })
}

export const GameSetup: GameSetupRelationResolvers = {
  user: (_obj, { root }) => {
    return db.gameSetup.findUnique({ where: { id: root?.id } }).user()
  },
}
