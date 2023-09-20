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
  if (phonemes.length !== 0) {
    validate(phonemes, 'phonemes', {
      custom: {
        with: async () => {
          if (phonemes.length !== 2) {
            throw new Error('You must select exactly two phonemes!')
          }
          const dbPhonemes = await db.phoneme.findMany()
          const allowedPhonemes = dbPhonemes.flatMap((p) => p.id)
          phonemes.forEach((phoneme) => {
            if (!allowedPhonemes.includes(phoneme)) {
              const allowedPhonemeNames = dbPhonemes.flatMap((p) => p.name)
              throw new Error(
                `Invalid phonemes selected! Allowed Phonemes: ${allowedPhonemeNames.join(
                  ', '
                )}`
              )
            }
          })
        },
      },
    })
  }

  const graphemes = input.graphemes?.filter(
    (grapheme) => !!grapheme
  ) as string[]
  if (graphemes.length !== 0) {
    validate(graphemes, 'graphemes', {
      custom: {
        with: async () => {
          if (graphemes.length !== 2) {
            throw new Error('You must select exactly two graphemes!')
          }
          const dbPhonemes = await db.phoneme.findMany()
          const allowedGraphemes = dbPhonemes.flatMap((p) =>
            p.graphemes.flatMap((g) => g)
          )
          graphemes.forEach((grapheme) => {
            if (!allowedGraphemes.includes(grapheme)) {
              throw new Error(
                `Invalid graphemes selected! Allowed Graphemes: ${allowedGraphemes.join(
                  ', '
                )}`
              )
            }
          })
        },
      },
    })
  }

  if (studentId) {
    return [
      db.gameSetup.upsert({
        where: { userId: studentId },
        create: {
          wordsPerUnit,
          matchingBoardSize,
          matchingGameType,
          phonemes,
          graphemes,
          userId: studentId,
        },
        update: {
          wordsPerUnit,
          matchingBoardSize,
          matchingGameType,
          phonemes,
          graphemes,
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
          graphemes,
          userId,
        },
        update: {
          wordsPerUnit,
          matchingBoardSize,
          matchingGameType,
          phonemes,
          graphemes,
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
