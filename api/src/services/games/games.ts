import type {
  QueryResolvers,
  MutationResolvers,
  GameRelationResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import { selectGameWords } from '../words/words'

export const games: QueryResolvers['games'] = ({ complete }) => {
  if (complete === undefined) {
    return db.game.findMany()
  }
  return db.game.findMany({
    where: {
      complete,
    },
  })
}

export const game: QueryResolvers['game'] = ({ id }) => {
  return db.game.findUnique({
    where: { id },
  })
}

export const createGame: MutationResolvers['createGame'] = async ({
  input,
}) => {
  validate(input.wordsPerPhoneme, 'words per phoneme', {
    numericality: {
      lessThanOrEqual: 10,
      positive: true,
      integer: true,
      message: 'Must be a positive number less than or equal to 10!',
    },
  })
  validate(input.type, 'game type', {
    inclusion: {
      in: ['SORTING', 'MATCHING'],
      message: 'Only sorting and matching games are currently supported!',
    },
  })
  validate(input.phonemes, 'phonemes', {
    custom: {
      with: () => {
        if (input.phonemes.length !== 2) {
          throw new Error('You must select exactly two phonemes!')
        }
        const allowedPhonemes = [49, 53]
        input.phonemes.forEach((phoneme) => {
          if (!allowedPhonemes.includes(phoneme)) {
            throw new Error(
              'Invalid phonemes selected! Please only select Long I and Long O.'
            )
          }
        })
      },
    },
  })

  const gameWords = await selectGameWords({
    count: input.wordsPerPhoneme,
    numSyllables: 1,
    phonemes: input.phonemes,
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
  completedWords: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).completedWords()
  },
}
