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

export const createSortingGameWord: MutationResolvers['createSortingGameWord'] =
  ({ input }) => {
    return db.sortingGameWord.create({
      data: input,
    })
  }

export const createSortingGameWords: MutationResolvers['createSortingGameWords'] =
  async ({ input }) => {
    const words = await filterWords({
      phoneme: input.phoneme,
      numSyllables: input.syllables,
    })

    const data = []
    if (words.length < input.count) {
      throw new Error(
        `Not enough words for phoneme ${input.phoneme} and syllables ${input.syllables}: ${words.length} < ${input.count}`
      )
    }

    for (let i = 0; i < input.count; i++) {
      const randomWord = words[Math.floor(Math.random() * words.length)]

      data.push(
        db.sortingGameWord.create({
          data: {
            wordId: randomWord.id,
            gameId: input.gameId,
            completed: false,
            current: false,
            testedGrapheme: TESTED_WORD_GRAPHEMES[randomWord.word],
          },
        })
      )
    }

    return Promise.all(data)
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
