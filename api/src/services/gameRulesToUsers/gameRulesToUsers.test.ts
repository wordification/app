import type { GameRulesToUser } from '@prisma/client'

import {
  gameRulesToUsers,
  gameRulesToUser,
  createGameRulesToUser,
  updateGameRulesToUser,
  deleteGameRulesToUser,
} from './gameRulesToUsers'
import type { StandardScenario } from './gameRulesToUsers.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('gameRulesToUsers', () => {
  scenario(
    'returns all gameRulesToUsers',
    async (scenario: StandardScenario) => {
      const result = await gameRulesToUsers()

      expect(result.length).toEqual(
        Object.keys(scenario.gameRulesToUser).length
      )
    }
  )

  scenario(
    'returns a single gameRulesToUser',
    async (scenario: StandardScenario) => {
      const result = await gameRulesToUser({
        id: scenario.gameRulesToUser.one.id,
      })

      expect(result).toEqual(scenario.gameRulesToUser.one)
    }
  )

  scenario('creates a gameRulesToUser', async (scenario: StandardScenario) => {
    const result = await createGameRulesToUser({
      input: {
        wordsPerPhoneme: 3312771,
        phonemes: 2958933,
        userId: scenario.gameRulesToUser.two.userId,
      },
    })

    expect(result.wordsPerPhoneme).toEqual(3312771)
    expect(result.phonemes).toEqual(2958933)
    expect(result.userId).toEqual(scenario.gameRulesToUser.two.userId)
  })

  scenario('updates a gameRulesToUser', async (scenario: StandardScenario) => {
    const original = (await gameRulesToUser({
      id: scenario.gameRulesToUser.one.id,
    })) as GameRulesToUser
    const result = await updateGameRulesToUser({
      id: original.id,
      input: { wordsPerPhoneme: 1792529 },
    })

    expect(result.wordsPerPhoneme).toEqual(1792529)
  })

  scenario('deletes a gameRulesToUser', async (scenario: StandardScenario) => {
    const original = (await deleteGameRulesToUser({
      id: scenario.gameRulesToUser.one.id,
    })) as GameRulesToUser
    const result = await gameRulesToUser({ id: original.id })

    expect(result).toEqual(null)
  })
})
