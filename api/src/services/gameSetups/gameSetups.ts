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

  const wordsPerUnitSorting = input.wordsPerUnitSorting as number
  validate(wordsPerUnitSorting, 'words per phoneme for sorting game', {
    numericality: {
      greaterThanOrEqual: 2,
      lessThan: 6,
      positive: true,
      integer: true,
      message: 'Words per Phoneme must be greater than 1 and less than 6',
    },
  })

  const wordsPerUnitBuilding = input.wordsPerUnitBuilding as number
  validate(wordsPerUnitBuilding, 'words per phoneme for building game', {
    numericality: {
      equal: 5,
      positive: true,
      integer: true,
      message: 'Words per game must be equal to 5',
    },
  })


  const phonemes = input.phonemes?.filter((phoneme) => !!phoneme) as number[]
  const graphemes = input.graphemes?.filter(
    (grapheme) => !!grapheme
  ) as string[]
  const selected = phonemes.length > 0 || graphemes.length > 0
  validate(selected, {
    acceptance: {
      in: [true],
      message: 'You must select exactly two phonemes or some graphemes!',
    },
  })
  if (phonemes.length > 0) {
    validate(phonemes.length, 'phoneme length', {
      numericality: {
        equal: 2,
        message: 'You must select exactly two phonemes!',
      },
    })
    validate(phonemes, 'phonemes', {
      custom: {
        with: async () => {
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

  if (graphemes.length !== 0) {
    validate(graphemes, 'graphemes', {
      custom: {
        with: async () => {
          const allowedGraphemes = ['w', 'wh', 'iCe', 'oCe', 'aCe']
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

  if (studentId && studentId > 0) {
    return [
      db.gameSetup.upsert({
        where: { userId: studentId },
        create: {
          wordsPerUnitSorting,
          wordsPerUnitBuilding,
          matchingBoardSize,
          matchingGameType,
          phonemes,
          graphemes,
          userId: studentId,
        },
        update: {
          wordsPerUnitSorting,
          wordsPerUnitBuilding,
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
      const shouldUpsert = determineShouldUpsert(
        studentId ?? 0,
        student.gpa ?? -1
      )

      if (shouldUpsert) {
        return db.gameSetup.upsert({
          create: {
            wordsPerUnitSorting,
            wordsPerUnitBuilding,
            matchingBoardSize,
            matchingGameType,
            phonemes,
            graphemes,
            userId,
          },
          update: {
            wordsPerUnitSorting,
            wordsPerUnitBuilding,
            matchingBoardSize,
            matchingGameType,
            phonemes,
            graphemes,
          },
          where: { userId },
        })
      }
      return null
    })

    const upsertResults = await Promise.all(upsertPromises)
    const filterResults = upsertResults.filter((res) => res !== null) as {
      id: number
      createdAt: Date
      updatedAt: Date
      wordsPerUnitSorting:number,
      wordsPerUnitBuilding:number,
      phonemes: number[]
      graphemes: string[]
      matchingBoardSize: number
      matchingGameType: MatchingGameType
      userId: number
    }[]
    return filterResults
  }
}

function determineShouldUpsert(studentId: number, studentGpa: number) {
  if (studentId === -1 && studentGpa >= 0 && studentGpa < 1) {
    return true
  } else if (studentId === -2 && studentGpa >= 1 && studentGpa < 2) {
    return true
  } else if (studentId === -3 && studentGpa >= 2) {
    return true
  } else if (studentId === 0) {
    return true
  }
  return false
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
