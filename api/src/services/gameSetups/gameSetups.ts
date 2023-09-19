import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import type { MakeRelationsOptional } from '@redwoodjs/api'
import type {
  QueryResolvers,
  MutationResolvers,
  GameSetupRelationResolvers,
  AllMappedModels,
  User,
  MatchingGameType,
} from 'types/graphql'

export const gameSetups: QueryResolvers['gameSetups'] = () => {
  return db.gameSetup.findMany()
}

export const gameSetup: QueryResolvers['gameSetup'] = ({ id }) => {
  return db.gameSetup.findUnique({
    where: { id },
  })
}

export const createGameSetup: MutationResolvers['createGameSetup'] = ({
  input,
}) => {
  return db.gameSetup.create({ data: input })
}

export const updateGameSetup: MutationResolvers['updateGameSetup'] = ({
  id,
  input,
}) => {
  return db.gameSetup.update({
    data: input,
    where: { id },
  })
}

export const upsertGameSetup: MutationResolvers['upsertGameSetup'] = async ({
  input,
  studentId,
}) => {
  if (!context.currentUser) {
    throw new Error('You must be logged in to create a game!')
  }

  const matchingGameType = input.matchingGameType as MatchingGameType
  validate(matchingGameType, 'matching game type', {
    inclusion: {
      in: [matchingGameType],
    },
  })

  const matchingBoardSize = input.matchingBoardSize as number
  validate(matchingBoardSize, 'matching game board size', {
    numericality: {
      integer: true,
      message: 'You must select one of the given options!',
    },
  })

  const wordsPerUnit = input.wordsPerUnit as number
  validate(wordsPerUnit, 'words per phoneme', {
    numericality: {
      lessThanOrEqual: 10,
      positive: true,
      integer: true,
      message: 'Must be a positive number less than or equal to 10!',
    },
  })

  const phonemes = input.phonemes?.filter((phoneme) => !!phoneme) as number[]
  validate(phonemes, 'phonemes', {
    custom: {
      with: () => {
        if (phonemes.length !== 2) {
          throw new Error('You must select exactly two phonemes!')
        }
        const allowedPhonemes = [49, 53, 45, 44, 47]
        phonemes.forEach((phoneme) => {
          if (!allowedPhonemes.includes(phoneme)) {
            throw new Error(
              'Invalid phonemes selected! Allowed Phonemes: Long I, Long O, Long E, Long A, Long U'
            )
          }
        })
      },
    },
  })

  if (studentId) {
    return [
      db.gameSetup.upsert({
        where: { userId: studentId },
        create: {
          wordsPerUnit,
          matchingBoardSize,
          matchingGameType,
          phonemes,
          userId: studentId,
        },
        update: {
          wordsPerUnit,
          matchingBoardSize,
          matchingGameType,
          phonemes,
        },
      }),
    ]
  } else {
    const teacher = await db.user.findUnique({
      where: {
        id: context.currentUser?.id,
      },
      include: {
        students: true,
      },
    })

    const upsertPromises = (teacher?.students ?? []).map((student) => {
      const { id: userId } = student

      return db.gameSetup.upsert({
        create: {
          wordsPerUnit,
          matchingBoardSize,
          matchingGameType,
          phonemes,
          userId,
        },
        update: {
          wordsPerUnit,
          matchingBoardSize,
          matchingGameType,
          phonemes,
        },
        where: { userId },
      })
    })

    const upsertResults = await Promise.all(upsertPromises)
    return upsertResults
  }
}

export const deleteGameSetup: MutationResolvers['deleteGameSetup'] = ({
  id,
}) => {
  return db.gameSetup.delete({
    where: { id },
  })
}

export const GameSetup: GameSetupRelationResolvers = {
  user: (_obj, { root }) => {
    return db.gameSetup
      .findUnique({ where: { id: root?.id } })
      .user() as Promise<MakeRelationsOptional<User, AllMappedModels>>
  },
}
