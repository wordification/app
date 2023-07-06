import { validate, validateUniqueness } from '@redwoodjs/api'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'

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

export const currentStudents: QueryResolvers['currentStudents'] = async () => {
  const currentUser = db.user.findUnique({
    where: {
      id: context.currentUser?.id,
    },
  })

  const students = await currentUser.students()

  return students
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

  validate(userData.lastName, 'last name', {
    length: { min: 1, max: 255 },
  })

  validate(userData.roles, 'user role', {
    inclusion: {
      in: ['STUDENT', 'TEACHER', 'ADMINISTRATOR'],
      message: 'Role of new user must be student, teacher, or administrator.',
    },
  })

  if (userData.teacherId) {
    validate(userData.teacherId, 'teacher id', {
      numericality: {
        positive: true,
        integer: true,
        message: 'Teacher ID must be a positive integer',
      },
    })

    const findUser = await db.user.findUnique({
      where: { id: userData.teacherId?.valueOf() },
    })
    const findRole = [
      findUser?.roles === 'TEACHER' || findUser?.roles === 'SUPERUSER'
        ? findUser.id
        : undefined,
    ]

    validate(userData.teacherId, 'teacher id', {
      inclusion: {
        in: findRole,
        message:
          'Please select a valid teacher ID. This teacher does not exist.',
      },
    })
  }

  return validateUniqueness(
    'user',
    { email: userData.email },
    { message: 'This email is already in use.' },
    (db) =>
      db.user.create({
        data: userData,
      })
  )
}

export const deleteUser: MutationResolvers['deleteUser'] = ({ id }) => {
  return db.user.delete({
    where: { id },
  })
}

export const updateUser: MutationResolvers['updateUser'] = async ({
  id,
  input,
}) => {
  validate(input.firstName, 'first name', {
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

  if (input.roles !== 'STUDENT') {
    input.teacherId = null
  }

  if (input.teacherId) {
    validate(input.teacherId, 'teacher id', {
      numericality: {
        positive: true,
        integer: true,
        message: 'Teacher ID must be a positive integer',
      },
    })

    const findUser = await db.user.findUnique({
      where: { id: input.teacherId?.valueOf() },
    })
    const findRole = [
      findUser?.roles === 'TEACHER' || findUser?.roles === 'SUPERUSER'
        ? findUser.id
        : undefined,
    ]

    validate(input.teacherId, 'teacher id', {
      inclusion: {
        in: findRole,
        message:
          'Please select a valid teacher ID. This teacher does not exist.',
      },
    })
  }

  return db.user.update({
    data: input,
    where: { id },
  })
}

export const emailUser: MutationResolvers['emailUser'] = async ({ id }) => {
  const user = await db.user.findUnique({
    where: { id },
  })

  if (!user) {
    throw new Error('User does not exist!')
  }

  console.log('Sending email to', user)

  return user
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
