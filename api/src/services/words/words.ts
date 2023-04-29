import type { QueryResolvers, WordRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const words: QueryResolvers['words'] = () => {
  return db.word.findMany()
}

export const word: QueryResolvers['word'] = ({ id }) => {
  return db.word.findUnique({
    where: { id },
  })
}

export const Word: WordRelationResolvers = {
  sortingGameWords: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).sortingGameWords()
  },
}
