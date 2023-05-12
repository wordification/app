import type { Game } from '@prisma/client'
import type { QueryResolvers, WordRelationResolvers } from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const filterWords = async ({
  phonemes,
  numSyllables,
}: {
  phonemes: number[]
  numSyllables: number
}) => {
  validate(numSyllables, 'numSyllables', {
    numericality: { onlyInteger: true, positive: true },
  })
  return db.word.findMany({
    where: {
      numSyllables,
      testedPhonemes: {
        hasSome: phonemes,
      },
    },
  })
}

export const selectGameWords = async ({
  count,
  numSyllables,
  phonemes,
}: {
  count: number
  numSyllables: number
  phonemes: number[]
}) => {
  validate(count, 'count', {
    numericality: { onlyInteger: true, positive: true },
  })
  validate(numSyllables, 'syllables', {
    numericality: { onlyInteger: true, positive: true },
  })

  const words = await filterWords({
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
