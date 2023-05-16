import { db } from 'api/src/lib/db'

import wordData from './words.json'

import type { Prisma } from '@prisma/client'

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

const seedDb = async () => {
  try {
    const wordRecord = await seedWords()
    console.info(`Seeded: ${wordRecord.count} word(s)`)
  } catch (error) {
    console.warn('Please define seed data.')
    console.error(error)
  }
}

export default seedDb
