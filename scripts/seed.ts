import type { Prisma } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

import wordData from './word_data.json'

const seedUsers = () => {
  const users = [
    { name: 'john', email: 'john@example.com', password: 'secret1' },
    { name: 'jane', email: 'jane@example.com', password: 'secret2' },
  ]

  const data = users.map(
    ({ email, password }): Prisma.UserCreateArgs['data'] => {
      const [hashedPassword, salt] = hashPassword(password)
      return {
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
        phonemes: word.phonemes,
        graphemes: word.graphemes,
        syllables: word.syllables,
        sentences: word.sentences,
      }
    }),
    skipDuplicates: true,
  })
}

export default async () => {
  try {
    const userRecord = await seedUsers()
    console.log(`Seeded: ${userRecord.count} user(s)`)
    const wordRecord = await seedWords()
    console.log(`Seeded: ${wordRecord.count} word(s)`)
  } catch (error) {
    console.warn('Please define your seed data.')
    console.error(error)
  }
}
