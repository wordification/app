import type {
  QueryResolvers,
  MutationResolvers,
  GameRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { createSortingGameWords } from '../sortingGameWords/sortingGameWords'

export const games: QueryResolvers['games'] = () => {
  return db.game.findMany()
}

export const game: QueryResolvers['game'] = ({ id }) => {
  return db.game.findUnique({
    where: { id },
  })
}

export const createGame: MutationResolvers['createGame'] = async ({
  input,
}) => {
  const game = await db.game.create({
    data: {
      ...input,
      userId: context.currentUser.id,
    },
  })

  await createSortingGameWords({
    gameId: game.id,
    phoneme: game.phonemeOne,
    count: game.wordsPerPhoneme,
    syllables: 1,
  })

  await createSortingGameWords({
    gameId: game.id,
    phoneme: game.phonemeTwo,
    count: game.wordsPerPhoneme,
    syllables: 1,
  })

  return game
}

export const updateGame: MutationResolvers['updateGame'] = ({ id, input }) => {
  return db.game.update({
    data: input,
    where: { id },
  })
}

export const deleteGame: MutationResolvers['deleteGame'] = ({ id }) => {
  return db.game.delete({
    where: { id },
  })
}

export const Game: GameRelationResolvers = {
  user: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).user()
  },
  sortingGameWords: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).sortingGameWords()
  },
}
