import { db } from 'api/src/lib/db'

import wordData from './words.json'

import type { Word } from '@prisma/client'

// const seedWords = () => {
//   return db.word.createMany({
//     data: wordData.map((word): Prisma.WordCreateArgs['data'] => {
//       return {
//         word: word.word,
//         gradeLevel: word.gradeLevel,
//         numSyllables: word.numSyllables,
//         phonemes: word.phonemes,
//         graphemes: word.graphemes,
//         syllables: word.syllables,
//         sentences: word.sentences,
//         testedGraphemes: word.testedGraphemes,
//         testedPhonemes: word.testedPhonemes,
//       }
//     }),
//     skipDuplicates: true,
//   })
// }

type UpsertResult = {
  created: number
  updated: number
}

const isEqual = (existingWord: Word, word: Word): boolean => {
  return (
    existingWord.gradeLevel === word.gradeLevel &&
    existingWord.numSyllables === word.numSyllables &&
    existingWord.phonemes.every((p) => word.phonemes.includes(p)) &&
    existingWord.graphemes.every((g) => word.graphemes.includes(g)) &&
    existingWord.syllables.every((s) => word.syllables.includes(s)) &&
    existingWord.sentences.every((s) => word.sentences.includes(s)) &&
    existingWord.testedGraphemes.every((g) =>
      word.testedGraphemes.includes(g)
    ) &&
    existingWord.testedPhonemes.every((p) => word.testedPhonemes.includes(p))
  )
}

const seedWords = async (): Promise<UpsertResult> => {
  let createdCount = 0
  let updatedCount = 0

  for (let i = 0; i < wordData.length; i++) {
    const word = wordData[i] as Word
    const existingWord = await db.word.findUnique({
      where: { word: word.word },
    })

    if (existingWord) {
      // Compare the existing data with the data to be updated
      if (!isEqual(existingWord, word)) {
        await db.word.update({
          where: { word: word.word },
          data: {
            gradeLevel: word.gradeLevel,
            numSyllables: word.numSyllables,
            phonemes: word.phonemes,
            graphemes: word.graphemes,
            syllables: word.syllables,
            sentences: word.sentences,
            testedGraphemes: word.testedGraphemes,
            testedPhonemes: word.testedPhonemes,
          },
        })
        updatedCount++
      }
    } else {
      await db.word.create({
        data: {
          word: word.word,
          gradeLevel: word.gradeLevel,
          numSyllables: word.numSyllables,
          phonemes: word.phonemes,
          graphemes: word.graphemes,
          syllables: word.syllables,
          sentences: word.sentences,
          testedGraphemes: word.testedGraphemes,
          testedPhonemes: word.testedPhonemes,
        },
      })
      createdCount++
    }
  }

  return { created: createdCount, updated: updatedCount }
}

const seedDb = async () => {
  try {
    const wordRecord = await seedWords()
    console.info(`Seeded: ${wordRecord.created + wordRecord.updated} word(s)`)
    console.info(`------------------`)
    console.info(`Created: ${wordRecord.created} word(s)`)
    console.info(`Updated: ${wordRecord.updated} word(s)`)
  } catch (error) {
    console.warn('Please define seed data.')
    console.error(error)
  }
}

export default seedDb
