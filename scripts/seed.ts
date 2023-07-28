import { db } from 'api/src/lib/db'

import phonemeData from './phonemes.json'
import wordData from './words.json'

import type { Word, Phoneme } from '@prisma/client'

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
  deleted: number
}

const isWordEqual = (existingWord: Word, word: Word): boolean => {
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

const isPhonemeEqual = (
  existingPhoneme: Phoneme,
  phoneme: Phoneme
): boolean => {
  return (
    existingPhoneme.name === phoneme.name &&
    existingPhoneme.graphemes.every((g) => phoneme.graphemes.includes(g))
  )
}

const seedWords = async (): Promise<UpsertResult> => {
  let createdCount = 0
  let updatedCount = 0
  let deletedCount = 0

  const existingWords = await db.word.findMany()
  const wordDataSet = new Set(wordData.map((word) => word.word))

  // Delete words that exist in the database but not in the word data
  for (const existingWord of existingWords) {
    if (!wordDataSet.has(existingWord.word)) {
      await db.word.delete({
        where: { word: existingWord.word },
      })
      deletedCount++
    }
  }

  for (let i = 0; i < wordData.length; i++) {
    const word = wordData[i] as Word
    const existingWord = await db.word.findUnique({
      where: { word: word.word },
    })

    if (existingWord) {
      // Compare the existing data with the data to be updated
      if (
        !isWordEqual(existingWord, word) ||
        !isWordEqual(word, existingWord)
      ) {
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

  return { created: createdCount, updated: updatedCount, deleted: deletedCount }
}

const seedPhonemes = async (): Promise<UpsertResult> => {
  let createdCount = 0
  let updatedCount = 0
  let deletedCount = 0

  const existingPhonemes = await db.phoneme.findMany()
  const phonemeDataSet = new Set(phonemeData.map((phoneme) => phoneme.id))

  // Delete phonemes that exist in the database but not in the phoneme data
  for (const existingPhoneme of existingPhonemes) {
    if (!phonemeDataSet.has(existingPhoneme.id)) {
      await db.phoneme.delete({
        where: { id: existingPhoneme.id },
      })
      deletedCount++
    }
  }

  for (let i = 0; i < phonemeData.length; i++) {
    const phoneme = phonemeData[i] as Phoneme
    const existingPhoneme = await db.phoneme.findUnique({
      where: { id: phoneme.id },
    })

    if (existingPhoneme) {
      // Compare the existing data with the data to be updated
      if (
        !isPhonemeEqual(existingPhoneme, phoneme) ||
        !isPhonemeEqual(phoneme, existingPhoneme)
      ) {
        await db.phoneme.update({
          where: { id: phoneme.id },
          data: {
            name: phoneme.name,
            graphemes: phoneme.graphemes,
          },
        })
        updatedCount++
      }
    } else {
      await db.phoneme.create({
        data: {
          id: phoneme.id,
          name: phoneme.name,
          graphemes: phoneme.graphemes,
        },
      })
      createdCount++
    }
  }

  return { created: createdCount, updated: updatedCount, deleted: deletedCount }
}

const seedDb = async () => {
  try {
    const wordRecord = await seedWords()
    console.info(
      `Words Seeded: ${wordRecord.created + wordRecord.updated} word(s)`
    )
    console.info(`==============================`)
    console.info(`Words Created: ${wordRecord.created} word(s)`)
    console.info(`Words Updated: ${wordRecord.updated} word(s)`)
    console.info(`Words Deleted: ${wordRecord.deleted} word(s)`)

    console.info(`------------------------------`)

    const phonemeRecord = await seedPhonemes()
    console.info(
      `Phonemes Seeded: ${
        phonemeRecord.created + phonemeRecord.updated
      } phoneme(s)`
    )
    console.info(`==============================`)
    console.info(`Phonemes Created: ${phonemeRecord.created} phoneme(s)`)
    console.info(`Phonemes Updated: ${phonemeRecord.updated} phoneme(s)`)
    console.info(`Phonemes Deleted: ${phonemeRecord.deleted} phoneme(s)`)
  } catch (error) {
    console.warn('Please define seed data.')
    console.error(error)
  }
}

export default seedDb
