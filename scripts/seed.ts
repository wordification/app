import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

import wordData from './words.json'

const seedUsers = () => {
  const users = [
    {
      firstName: 'John',
      lastName: 'Smith',
      email: 'john@example.com',
      password: 'secret1',
      role: 'STUDENT',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane@example.com',
      password: 'secret2',
      role: 'TEACHER',
    },
  ] as const

  const data = users.map(
    ({
      firstName,
      lastName,
      email,
      password,
      role,
    }): Prisma.UserCreateArgs['data'] => {
      const [hashedPassword, salt] = hashPassword(password)
      return {
        firstName,
        lastName,
        role,
        email,
        hashedPassword,
        salt,
      }
    }
  )

  return db.user.createMany({ data, skipDuplicates: true })
}

const seedWords = () => {
  return db.word.createMany({
    data: wordData.map((word): Prisma.WordCreateArgs['data'] => {
      return {
        word: word.word,
        gradeLevel: word.gradeLevel,
        numSyllables: word.numSyllables,
        phonemes: word.phonemes,
        graphemes: word.graphemes,
        syllables: word.syllables,
        sentences: word.sentences,
        testedGraphemes: word.testedGraphemes,
        testedPhonemes: word.testedPhonemes,
      }
    }),
    skipDuplicates: true,
  })
}

export default async () => {
  try {
    const userRecord = await seedUsers()
    console.info(`Seeded: ${userRecord.count} user(s)`)
    const wordRecord = await seedWords()
    console.info(`Seeded: ${wordRecord.count} word(s)`)
  } catch (error) {
    console.warn('Please define seed data.')
    console.error(error)
  }
}
