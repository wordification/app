import { validate } from '@redwoodjs/api'

import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

import { selectGameWords } from '../words/words'

import type { User, Word } from '@prisma/client'
import type { MakeRelationsOptional } from '@redwoodjs/api'
import type {
  QueryResolvers,
  MutationResolvers,
  GameRelationResolvers,
  AllMappedModels,
} from 'types/graphql'

export const games: QueryResolvers['games'] = ({ complete }) => {
  if (typeof complete !== 'boolean') {
    return db.game.findMany({
      where: { userId: context.currentUser?.id },
      orderBy: {
        updatedAt: 'desc',
      },
    })
  }
  return db.game.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
    where: {
      userId: context.currentUser?.id,
      complete: {
        // I don't know why this is inverted, but it works
        not: complete,
      },
    },
  })
}

export const game: QueryResolvers['game'] = ({ id }) => {
  return db.game.findFirst({
    where: { id, userId: context.currentUser?.id },
  })
}

export const userGames: QueryResolvers['userGames'] = ({ userId }) => {
  return db.game.findMany({
    where: { userId },
    orderBy: {
      updatedAt: 'desc',
    },
  })
}

export const createGame: MutationResolvers['createGame'] = async ({
  input,
}) => {
  if (!context.currentUser) {
    throw new Error('You must be logged in to create a game!')
  }

  const gameSetup = await db.gameSetup.findUnique({
    where: { userId: context.currentUser.id },
  })

  validate(gameSetup, {
    presence: {
      message:
        'There is no Game Setup for this user!\nYour teacher must add a Game Setup.',
    },
  })

  const phonemes = gameSetup?.phonemes ?? []
  const wordsPerPhoneme = gameSetup?.wordsPerPhoneme ?? 0

  const gameWords = await selectGameWords({
    count: wordsPerPhoneme,
    numSyllables: 1,
    phonemes: phonemes,
  })

  const [currentWord, ...incompleteWords] = gameWords
  return db.game.create({
    data: {
      ...input,
      wordsPerPhoneme,
      phonemes,
      userId: context.currentUser.id,
      allWords: {
        connect: gameWords.map((word) => ({ id: word.id })),
      },
      incompleteWords: {
        connect: incompleteWords.map((word) => ({ id: word.id })),
      },
      currentWordId: currentWord.id,
    },
    include: {
      allWords: true,
    },
  })
}

export const deleteGame: MutationResolvers['deleteGame'] = ({ id }) => {
  requireAuth({
    roles: 'TEACHER',
  })
  return db.game.delete({
    where: { id },
  })
}

export const Game: GameRelationResolvers = {
  user: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).user() as Promise<
      MakeRelationsOptional<User, AllMappedModels>
    >
  },
  currentWord: (_obj, { root }) => {
    return db.game.findUnique({ where: { id: root?.id } }).currentWord()
  },
  allWords: (_obj, { root }) => {
    return db.game
      .findUnique({ where: { id: root?.id } })
      .allWords() as Promise<Word[]>
  },
  incompleteWords: (_obj, { root }) => {
    return db.game
      .findUnique({ where: { id: root?.id } })
      .incompleteWords() as Promise<Word[]>
  },
}
