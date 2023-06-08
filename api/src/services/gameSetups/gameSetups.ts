import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

import type {
  QueryResolvers,
  MutationResolvers,
  GameSetupRelationResolvers,
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

  const wordsPerPhoneme = input.wordsPerPhoneme as number
  validate(wordsPerPhoneme, 'words per phoneme', {
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
        const allowedPhonemes = [49, 53]
        phonemes.forEach((phoneme) => {
          if (!allowedPhonemes.includes(phoneme)) {
            throw new Error(
              'Invalid phonemes selected! Please only select Long I and Long O.'
            )
          }
        })
      },
    },
  })

  if (studentId) {
    return db.gameSetup.upsert({
      where: { userId: studentId },
      create: {
        wordsPerPhoneme,
        phonemes,
        userId: studentId,
      },
      update: {
        wordsPerPhoneme,
        phonemes,
      },
    })
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
          wordsPerPhoneme,
          phonemes,
          userId,
        },
        update: {
          wordsPerPhoneme,
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
    return db.gameSetup.findUnique({ where: { id: root?.id } }).user()
  },
}
