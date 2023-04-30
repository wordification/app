import type {
  QueryResolvers,
  MutationResolvers,
  SortingGameWordRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { filterWords, TESTED_WORD_GRAPHEMES } from '../words/words'

export const sortingGameWords: QueryResolvers['sortingGameWords'] = () => {
  return db.sortingGameWord.findMany()
}

export const sortingGameWord: QueryResolvers['sortingGameWord'] = ({ id }) => {
  return db.sortingGameWord.findUnique({
    where: { id },
  })
}

export const createSortingGameWords = async ({
  gameId,
  count,
  syllables,
  phoneme,
}: {
  gameId: number
  count: number
  syllables: number
  phoneme: number
}) => {
  const words = await filterWords({
    phoneme: phoneme,
    numSyllables: syllables,
  })

  const data: {
    wordId: number
    gameId: number
    completed: boolean
    current: boolean
    testedGrapheme: string
  }[] = []
  if (words.length < count) {
    throw new Error(
      `Not enough words for phoneme ${phoneme} and syllables ${syllables}`
    )
  }

  for (let i = 0; i < count; i++) {
    const randomWord = words[Math.floor(Math.random() * words.length)]

    data.push({
      wordId: randomWord.id,
      gameId: gameId,
      completed: false,
      current: false,
      testedGrapheme: TESTED_WORD_GRAPHEMES[randomWord.word],
    })
  }

  return db.sortingGameWord.createMany({
    data,
  })
}

export const selectRandomTestWord = async ({ gameId }) => {
  const incompleteWords = await db.sortingGameWord.findMany({
    where: {
      gameId: gameId,
      completed: false,
    },
  })

  if (incompleteWords.length === 0) {
    return null
  }

  const randomWord =
    incompleteWords[Math.floor(Math.random() * incompleteWords.length)]

  return db.sortingGameWord.update({
    data: {
      current: true,
    },
    where: {
      id: randomWord.id,
    },
  })
}

export const updateSortingGameWord: MutationResolvers['updateSortingGameWord'] =
  ({ id, input }) => {
    return db.sortingGameWord.update({
      data: input,
      where: { id },
    })
  }

export const deleteSortingGameWord: MutationResolvers['deleteSortingGameWord'] =
  ({ id }) => {
    return db.sortingGameWord.delete({
      where: { id },
    })
  }

export const SortingGameWord: SortingGameWordRelationResolvers = {
  word: (_obj, { root }) => {
    return db.sortingGameWord.findUnique({ where: { id: root?.id } }).word()
  },
  game: (_obj, { root }) => {
    return db.sortingGameWord.findUnique({ where: { id: root?.id } }).game()
  },
}
