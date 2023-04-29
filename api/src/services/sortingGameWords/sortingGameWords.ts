import type {
  QueryResolvers,
  MutationResolvers,
  SortingGameWordRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

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
