import type { Prisma } from '@prisma/client'
import { Role } from '@prisma/client'
import { db } from 'api/src/lib/db'

import { hashPassword } from '@redwoodjs/auth-dbauth-api'

import wordData from './words.json'

const seedTeacher = () => {
  const teacher = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
    password: 'secret2',
    roles: Role.TEACHER,
  }

  const [hashedPassword, salt] = hashPassword(teacher.password)

  const teacherData: Prisma.UserCreateInput = {
    firstName: teacher.firstName,
    lastName: teacher.lastName,
    email: teacher.email,
    hashedPassword,
    salt,
    roles: teacher.roles,
  }

  return db.user.upsert({
    where: { email: teacherData.email },
    create: teacherData,
    update: {},
  })
}

const seedStudent = (teacherId: number) => {
  const student = {
    firstName: 'John',
    lastName: 'Smith',
    email: 'john@example.com',
    password: 'secret1',
    roles: Role.STUDENT,
  }

  const [hashedPassword, salt] = hashPassword(student.password)

  const studentData: Prisma.UserCreateInput = {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    hashedPassword,
    salt,
    roles: student.roles,
    teacher: {
      connect: { id: teacherId },
    },
  }

  return db.user.upsert({
    where: { email: studentData.email },
    create: studentData,
    update: {},
  })
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
    const teacher = await seedTeacher()
    console.info(`Seeded: 1 teacher`)
    await seedStudent(teacher.id)
    console.info(`Seeded: 1 student`)
    const wordRecord = await seedWords()
    console.info(`Seeded: ${wordRecord.count} word(s)`)
  } catch (error) {
    console.warn('Please define seed data.')
    console.error(error)
  }
}
