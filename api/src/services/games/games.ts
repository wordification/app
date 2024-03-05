import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import { gameWordsByRime, selectGameWords } from '../words/words'

import type { User, Word } from '@prisma/client'
import type { MakeRelationsOptional } from '@redwoodjs/api'
import type {
  QueryResolvers,
  MutationResolvers,
  GameRelationResolvers,
  AllMappedModels,
} from 'types/graphql'

export const games: QueryResolvers['games'] = ({ complete, type }) => {
  if (typeof complete !== 'boolean') {
    return db.game.findMany({
      where: {
        userId: context.currentUser?.id,
        type: type ?? { in: ['SORTING', 'MATCHING', 'BUILDING'] },
      },
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
      complete,
      type: type ?? { in: ['SORTING', 'MATCHING', 'BUILDING'] },
    },
  })
}

export const game: QueryResolvers['game'] = ({ id }) => {
  console.log(id)
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

  const phonemes = gameSetup?.phonemes
  const graphemes = gameSetup?.graphemes

  const pg = phonemes?.length !== 0 ? phonemes : graphemes
  let wordsPerUnit = gameSetup?.wordsPerUnit ?? 0
  if (input.type === 'MATCHING') {
    wordsPerUnit =
      gameSetup?.matchingBoardSize === 0
        ? 12 / (pg?.length ?? 0) // A 3x4 is currently the only option for graphemes. No need for this elsewhere.
        : gameSetup?.matchingBoardSize === 1
        ? 8
        : gameSetup?.matchingBoardSize === 2
        ? 10
        : 12
  }

  // SORTING or MATCHING  -- else BUILDING
  const gameWords =
    input.type === 'SORTING' || input.type === 'MATCHING'
      ? await selectGameWords({
          count: wordsPerUnit,
          numSyllables: 1,
          phonemes: phonemes,
          graphemes: graphemes,
        })
      : await gameWordsByRime({ numSyllables: 1, rime: 'ake' })

  // gameWords?.forEach((wrd) => console.log(wrd.word))

  if (input.type === 'SORTING') {
    const [currentWord, ...incompleteWords] = gameWords ?? []
    return db.game.create({
      data: {
        ...input,
        wordsPerUnit,
        phonemes,
        graphemes,
        score: 0,
        level: phonemes === undefined || phonemes.length === 0 ? 2 : 1,
        userId: context.currentUser.id,
        allWords: {
          connect: gameWords?.map((word) => ({ id: word.id })),
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
  } else if (input.type === 'MATCHING') {
    return db.game.create({
      data: {
        ...input,
        wordsPerUnit,
        matchingGameType: gameSetup?.matchingGameType,
        phonemes,
        graphemes,
        currentUnitIndex:
          gameSetup?.matchingGameType === 'GROUPING' ? 0 : undefined,
        userId: context.currentUser.id,
        allWords: {
          connect: gameWords?.map((word) => ({ id: word.id })),
        },
        incompleteWords: {
          connect: gameWords?.map((word) => ({ id: word.id })),
        },
      },
      include: {
        allWords: true,
      },
    })
  } else {
    // input.type === 'BUILDING'
    const [currentWord, ...incompleteWords] = gameWords ?? []
    return db.game.create({
      data: {
        ...input,
        wordsPerUnit,
        phonemes: [],
        graphemes: [],
        userId: context.currentUser.id,
        allWords: {
          connect: gameWords?.map((word) => ({ id: word.id })),
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
}

export const deleteGame: MutationResolvers['deleteGame'] = ({ id }) => {
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
