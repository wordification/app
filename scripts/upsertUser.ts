// To access your database
import { stdin as input, stdout as output } from 'node:process'
import { createInterface } from 'node:readline/promises'

import { Role } from '@prisma/client'
import { hashPassword } from '@redwoodjs/auth-dbauth-api'
import { db } from 'api/src/lib/db'

import type { Prisma } from '@prisma/client'

type BaseUserInput = {
  password: string
} & Omit<Prisma.UserUncheckedCreateInput, 'hashedPassword' | 'salt'>

export const upsertUser = (user: BaseUserInput) => {
  const { password, ...rest } = user
  const [hashedPassword, salt] = hashPassword(password)
  const userData = { ...rest, hashedPassword, salt }
  return db.user.upsert({
    where: { email: user.email },
    create: userData,
    update: userData,
  })
}

export default async () => {
  const rl = createInterface({ input, output })

  const firstName = await rl.question('Enter first name: ')
  if (!firstName) {
    console.error('First name is required')
    return 1
  }
  const lastName = await rl.question('Enter last name: ')
  if (!lastName) {
    console.error('Last name is required')
    return 1
  }

  const email = await rl.question('Enter email: ')
  if (!email) {
    console.error('Email is required')
    return 1
  }

  const password = await rl.question('Enter password: ')
  if (!password) {
    console.error('Password is required')
    return 1
  }

  const isAdmin = await rl.question('Is this user an administrator? (y/n): ')
  let role: Role
  if (isAdmin === 'y') {
    role = Role.ADMINISTRATOR
  } else {
    const isTeacher = await rl.question('Is this user a teacher? (y/n): ')
    if (isTeacher === 'y') {
      role = Role.TEACHER
    } else {
      role = Role.STUDENT
    }
  }

  const user: BaseUserInput = {
    firstName,
    lastName,
    email,
    password,
    roles: role,
  }

  rl.close()
  const newUser = await upsertUser(user)
  console.info(`User ${newUser.email} created/modified with ID ${newUser.id}`)
}
