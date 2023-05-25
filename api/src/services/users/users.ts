import { db } from 'src/lib/db'

import type { Game } from '@prisma/client'
import type { QueryResolvers, UserRelationResolvers } from 'types/graphql'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const currentStudents: QueryResolvers['currentStudents'] = async () => {
  const currentUser = db.user.findUnique({
    where: {
      id: context.currentUser?.id,
    },
  })

  const students = await currentUser.students()

  return students
}

export const User: UserRelationResolvers = {
  games: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).games() as Promise<
      Game[]
    >
  },
  teacher: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).teacher()
  },
  students: (_obj, { root }) => {
    return db.user.findUnique({ where: { id: root?.id } }).students()
  },
}
