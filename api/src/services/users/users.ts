import type { Game } from '@prisma/client'
import type {
  QueryResolvers,
  MutationResolvers,
  UserRelationResolvers,
} from 'types/graphql'

import { removeNulls } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = (params) => {
  if (params === undefined) {
    throw new Error('User ID is required')
  }

  const { id } = params

  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = (params) => {
  if (params === undefined) {
    throw new Error('User input is required')
  }

  const { input } = params
  return db.user.create({
    data: input,
  })
}

export const updateUser: MutationResolvers['updateUser'] = (params) => {
  if (params === undefined) {
    throw new Error('User input is required')
  }

  const { id, input } = params
  return db.user.update({
    data: removeNulls(input),
    where: { id },
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = (params) => {
  if (params === undefined) {
    throw new Error('User ID is required')
  }

  const { id } = params
  return db.user.delete({
    where: { id },
  })
}

export const User: UserRelationResolvers = {
  games: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).games() as Promise<
      Game[]
    >
  },
}
