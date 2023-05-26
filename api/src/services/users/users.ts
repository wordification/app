import { validate } from '@redwoodjs/api'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

import type { Game } from '@prisma/client'
import type {
  MutationResolvers,
  QueryResolvers,
  UserRelationResolvers,
} from 'types/graphql'

export const users: QueryResolvers['users'] = () => {
  return db.user.findMany()
}

export const user: QueryResolvers['user'] = ({ id }) => {
  return db.user.findUnique({
    where: { id },
  })
}

export const createUser: MutationResolvers['createUser'] = async ({
  input,
}) => {
  const { password, ...rest } = input
  const [hashedPassword, salt] = hashPassword(password)
  const userData = { ...rest, hashedPassword, salt }

  validate(userData.firstName, 'first name', {
    length: { min: 1, max: 255 },
  })

  validate(input.lastName, 'last name', {
    length: { min: 1, max: 255 },
  })

  validate(input.roles, 'user role', {
    inclusion: {
      in: ['STUDENT', 'TEACHER', 'ADMINISTRATOR'],
      message: 'Role of new user must be student, teacher, or administrator.',
    },
  })

  if (input.teacherId) {
    validate(input.teacherId, 'teacher id', {
      numericality: {
        positive: true,
        integer: true,
        message: 'Teacher ID must be a positive integer',
      },
    })

    const findUser = await db.user.findUnique({
      where: { id: userData.teacherId?.valueOf() },
    })
    if (findUser === null || findUser?.roles !== 'TEACHER') {
      throw 'Please select a valid teacher ID. This teacher does not exist.'
    }
  }

  return db.user.create({
    data: userData,
  })
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  requireAuth({
    roles: 'ADMINISTRATOR',
  })
  return db.user.delete({
    where: { id },
  })
}

export const updateUser: MutationResolvers['updateUser'] = ({ id, input }) => {
  requireAuth({
    roles: 'ADMINISTRATOR',
  })

  return db.user.update({
    where: { id },
    data: input,
  })
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
