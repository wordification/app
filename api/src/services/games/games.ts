import type {
  QueryResolvers,
  MutationResolvers,
  GameRelationResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

import { selectGameWords } from '../words/words'

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
  const gameWords = await selectGameWords({
    count: input.wordsPerPhoneme,
    syllables: 1,
    phoneme: [input.phonemeOne, input.phonemeTwo],
  })

  const game = await db.game.create({
    data: {
      ...input,
      userId: context.currentUser.id,
      allWords: {
        connect: gameWords.map((word) => ({ id: word.id })),
      },
      currentWordId: gameWords[0].id,
    },
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
  currentWord: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).currentWord()
  },
  allWords: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).allWords()
  },
  completeWords: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).completeWords()
  },
}
