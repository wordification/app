import type { Game } from '@prisma/client'
import { Role } from '@prisma/client'
import type { GameType } from 'types/graphql'

import { ForbiddenError } from '@redwoodjs/graphql-server'

import { games, game, createGame, deleteGame } from './games'
import type { StandardScenario } from './games.scenarios'

describe('games', () => {
  scenario('returns all games', async (scenario: StandardScenario) => {
    const result = await games({})

    expect(result.length).toEqual(Object.keys(scenario.game).length)
  })

  scenario('returns a single game', async (scenario: StandardScenario) => {
    const result = await game({ id: scenario.game.one.id })

    expect(result).toEqual(scenario.game.one)
  })

  scenario('creates a game', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)
    const phonemes = [49, 53]
    const result = await createGame({
      input: {
        type: 'SORTING',
        wordsPerPhoneme: 1,
        phonemes,
      },
    })

    expect(result.userId).toEqual(scenario.user.one.id)
    expect(result.wordsPerPhoneme).toEqual(1)
    expect(result.phonemes[0]).toEqual(phonemes[0])
    expect(result.phonemes[1]).toEqual(phonemes[1])
    expect(result.level).toEqual(1)

    const { allWords } = result
    if (!allWords) {
      throw new Error('No game words')
    }
    expect(allWords.length).toEqual(2)
    const calculateIntersection = (gamePhonemes?: number[]) =>
      gamePhonemes?.filter((value) => phonemes.includes(value))

    expect(calculateIntersection(allWords[0]?.phonemes)).not.toBe(0)
    expect(calculateIntersection(allWords[1]?.phonemes)).not.toBe(0)
    expect(result.currentWordId).toEqual(allWords[0]?.id)
  })

  scenario('rejects incorrect data', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)
    await expect(
      createGame({
        input: {
          type: 'SORTING',
          wordsPerPhoneme: 1,
          phonemes: [49, 50],
        },
      })
    ).rejects.toThrowError()
    await expect(
      createGame({
        input: {
          type: 'SORTING',
          wordsPerPhoneme: 100,
          phonemes: [49, 53],
        },
      })
    ).rejects.toThrowError()
    await expect(
      createGame({
        input: {
          type: 'abc' as GameType,
          wordsPerPhoneme: 1,
          phonemes: [49, 53],
        },
      })
    ).rejects.toThrowError()
  })

  scenario(
    'allows a teacher to delete a game',
    async (scenario: StandardScenario) => {
      mockCurrentUser({
        roles: Role.TEACHER,
        id: 1,
        email: 'teacher@teacher.com',
        firstName: 'teacher',
        lastName: 'teacher',
      })
      const original = (await deleteGame({ id: scenario.game.one.id })) as Game
      const result = await game({ id: original.id })

      expect(result).toEqual(null)
    }
  )

  scenario(
    'does not allow a student to delete a game',
    async (scenario: StandardScenario) => {
      mockCurrentUser({
        roles: Role.STUDENT,
        id: 1,
        email: 'student@student.com',
        firstName: 'student',
        lastName: 'student',
      })
      expect(() => deleteGame({ id: scenario.game.one.id })).toThrow(
        ForbiddenError
      )
    }
  )
})
