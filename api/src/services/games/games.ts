import type {
  QueryResolvers,
  MutationResolvers,
  GameRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

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
  validate(input.wordsPerPhoneme, 'wordsPerPhoneme', {
    numericality: { lessThanOrEqual: 10, positive: true, integer: true },
  })
  validate(input.type, 'type', {
    inclusion: {
      in: ['SORTING', 'MATCHING'],
      message: 'must be either sorting or matching',
    },
  })
  validate(input.phonemeOne, 'phonemeOne', {
    inclusion: {
      in: [49, 53],
      message: 'must be either Long I or Long O',
    },
  })
  validate(input.phonemeTwo, 'phonemeTwo', {
    inclusion: {
      in: [49, 53],
      message: 'must be either Long I or Long O',
    },
  })

  const gameWords = await selectGameWords({
    count: input.wordsPerPhoneme,
    numSyllables: 1,
    phonemes: [input.phonemeOne, input.phonemeTwo],
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
    include: {
      allWords: true,
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
