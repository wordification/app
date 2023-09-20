import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import { getWord } from '../audio'

import type { Game } from '@prisma/client'
import type { QueryResolvers, WordRelationResolvers } from 'types/graphql'

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

  /**
   * CORRECT CODE:
   *
   * return phonemeMatchWords.filter((word) => {
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
   */

  /**
   * TODO: Add audio for missing words.
   *  This is a TEMPORARY FIX to not include valid words with no audio for the time being.
   *  Checking if audio exists for the word. NOT THE BEST WAY TO DO THIS EITHER BUT NEEDED FOR THE MOMENT.
   *  Correct code is above. Delete this section and replace with correct code.
   */
  return phonemeMatchWords
    .filter((word) => {
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
    .filter((word) => getWord(word.word))
  //////
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

  const phonemesData = await db.phoneme.findMany()

  /**
   * CORRECT CODE:
   *
   * return graphemeMatchWords
    .filter((word) => {
      const graphemeIndex = word.graphemes.findIndex((g) =>
        graphemes.some((id) => id === g)
      )
      const targetGrapheme = word.graphemes[graphemeIndex] ?? ''

      if (graphemeIndex > -1 && targetGrapheme !== '') {
        const targetPhoneme = phonemesData.find((p) =>
          p.graphemes.includes(targetGrapheme)
        )

        return targetPhoneme?.id === word.phonemes[graphemeIndex]
      }
    })
   */

  /**
   * TODO: Add audio for missing words.
   *  This is a TEMPORARY FIX to not include valid words with no audio for the time being.
   *  Checking if audio exists for the word. NOT THE BEST WAY TO DO THIS EITHER BUT NEEDED FOR THE MOMENT.
   *  Correct code is above. Delete this section and replace with correct code.
   */
  return graphemeMatchWords
    .filter((word) => {
      const graphemeIndex = word.graphemes.findIndex((g) =>
        graphemes.some((id) => id === g)
      )
      const targetGrapheme = word.graphemes[graphemeIndex] ?? ''

      if (graphemeIndex > -1 && targetGrapheme !== '') {
        const targetPhoneme = phonemesData.find((p) =>
          p.graphemes.includes(targetGrapheme)
        )

        return targetPhoneme?.id === word.phonemes[graphemeIndex]
      }
    })
    .filter((word) => getWord(word.word))
  //////
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

      const data: typeof possibleWords = []
      for (let i = 0; i < count; i++) {
        const newWord =
          possibleWords[Math.floor(Math.random() * possibleWords.length)]

        // TODO: This is a hack to prevent duplicate words
        // and is horribly inefficient.
        if (data.includes(newWord)) {
          i--
          continue
        }

        data.push(newWord)
      }
      return data
    })
  } else if (graphemes !== undefined && graphemes.length !== 0) {
    words = await filterWordsByGrapheme({
      graphemes: graphemes,
      numSyllables: numSyllables,
    })

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

      const data: typeof possibleWords = []
      for (let i = 0; i < count; i++) {
        const newWord =
          possibleWords[Math.floor(Math.random() * possibleWords.length)]

        // TODO: This is a hack to prevent duplicate words
        // and is horribly inefficient.
        if (data.includes(newWord)) {
          i--
          continue
        }

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
