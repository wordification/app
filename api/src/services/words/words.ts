import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import type { Game } from '@prisma/client'
import type { QueryResolvers, WordRelationResolvers } from 'types/graphql'

// select all words ending with (eg. -ake)
export const gameWordsByRime = async ({
  rime,
  numSyllables,
}: {
  rime: string
  numSyllables: number
}) => {
  validate(numSyllables, 'numSyllables', {
    numericality: { onlyInteger: true, positive: true },
  })
  const oneSyllWords = await db.word.findMany({
    where: {
      numSyllables,
    },
  })

  return oneSyllWords.filter((word) => word.word.endsWith(rime))
}

export const filterWordsByPhoneme = async ({
  phonemes,
  numSyllables,
}: {
  phonemes: number[]
  numSyllables: number
}) => {
  validate(numSyllables, 'numSyllables', {
    numericality: { onlyInteger: true, positive: true },
  })
  const phonemeMatchWords = await db.word.findMany({
    where: {
      numSyllables,
      phonemes: {
        hasSome: phonemes,
      },
    },
  })

  const phonemesData = await db.phoneme.findMany()

  return phonemeMatchWords.filter((word) => {
    const phonemeIndex = word.phonemes.findIndex((p) =>
      phonemes.some((id) => id === p)
    )
    const targetPhoneme = word.phonemes[phonemeIndex] ?? -1

    if (phonemeIndex > -1 && targetPhoneme !== -1) {
      const possibleGraphemes = phonemesData
        .filter((p) => p.id === targetPhoneme)
        .flatMap((p) => p.graphemes)

      return possibleGraphemes.some((g) => g === word.graphemes[phonemeIndex])
    }
  })
}

export const filterWordsByGrapheme = async ({
  graphemes,
  numSyllables,
}: {
  graphemes: string[]
  numSyllables: number
}) => {
  validate(numSyllables, 'numSyllables', {
    numericality: { onlyInteger: true, positive: true },
  })
  const graphemeMatchWords = await db.word.findMany({
    where: {
      numSyllables,
      graphemes: {
        hasSome: graphemes,
      },
    },
  })

  // Case for initial consonants, checks first grapheme
  //  Only current cases are 'w' and 'wh'
  if (graphemes.includes('w') && graphemes.includes('wh')) {
    return graphemeMatchWords.filter((matchingGrapheme) =>
      graphemes.some((grapheme) => grapheme === matchingGrapheme.graphemes[0])
    )
  } else {
    return graphemeMatchWords
  }
}

export type Word = {
  id: number
  word: string
  createdAt: Date
  updatedAt: Date
  gradeLevel: number
  numSyllables: number
  phonemes: number[]
  testedPhonemes: number[]
  graphemes: string[]
  testedGraphemes: string[]
  syllables: string[]
  sentences: string[]
}

export const selectGameWords = async ({
  count,
  numSyllables,
  phonemes,
  graphemes,
}: {
  count: number
  numSyllables: number
  phonemes: number[] | undefined
  graphemes: string[] | undefined
}) => {
  validate(count, 'count', {
    numericality: { onlyInteger: true, positive: true },
  })
  validate(numSyllables, 'syllables', {
    numericality: { onlyInteger: true, positive: true },
  })

  if (
    (phonemes === undefined || phonemes.length === 0) &&
    (graphemes === undefined || graphemes.length === 0)
  ) {
    throw new Error('No Phonemes nor Graphemes chosen to create a game!')
  }

  let words: Word[]

  if (phonemes !== undefined && phonemes.length !== 0) {
    words = await filterWordsByPhoneme({
      phonemes: phonemes,
      numSyllables: numSyllables,
    })

    if (words.length < count * phonemes.length) {
      throw new Error('Not enough words found!')
    }
    return phonemes.flatMap((phoneme) => {
      const possibleWords = words.filter((word) =>
        word.phonemes.includes(phoneme)
      )

      if (possibleWords.length < count) {
        throw new Error('Not enough words found!')
      }

      const data: Word[] = []
      const wordIndices: Set<number> = new Set<number>()
      for (let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * possibleWords.length)
        while (wordIndices.has(index)) {
          index = Math.floor(Math.random() * possibleWords.length)
        }
        wordIndices.add(index)
        const newWord = possibleWords[index]
        data.push(newWord)
      }
      return data
    })
  } else if (graphemes !== undefined && graphemes.length !== 0) {
    words = await filterWordsByGrapheme({
      graphemes: graphemes,
      numSyllables: numSyllables,
    })

    console.log(words)

    if (words.length < count * graphemes.length) {
      throw new Error('Not enough words found!')
    }

    return graphemes.flatMap((grapheme) => {
      const possibleWords = words.filter((word) =>
        word.graphemes.includes(grapheme)
      )

      if (possibleWords.length < count) {
        throw new Error('Not enough words found!')
      }

      const data: Word[] = []
      const wordIndices: Set<number> = new Set<number>()
      for (let i = 0; i < count; i++) {
        let index = Math.floor(Math.random() * possibleWords.length)
        while (wordIndices.has(index)) {
          index = Math.floor(Math.random() * possibleWords.length)
        }
        wordIndices.add(index)
        const newWord = possibleWords[index]
        data.push(newWord)
      }
      return data
    })
  }
}

export const words: QueryResolvers['words'] = () => {
  return db.word.findMany()
}

export const word: QueryResolvers['word'] = ({ id }) => {
  return db.word.findUnique({
    where: { id: id },
  })
}

export const Word: WordRelationResolvers = {
  allGames: (_obj, { root }) => {
    return db.word
      .findUnique({ where: { id: root?.id } })
      .allGames() as Promise<Game[]>
  },
  currentGames: (_obj, { root }) => {
    return db.word
      .findUnique({ where: { id: root?.id } })
      .currentGames() as Promise<Game[]>
  },
  incompleteGames: (_obj, { root }) => {
    return db.word
      .findUnique({ where: { id: root?.id } })
      .incompleteGames() as Promise<Game[]>
  },
}
