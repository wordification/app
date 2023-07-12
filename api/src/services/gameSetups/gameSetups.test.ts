import {
  gameSetups,
  gameSetup,
  createGameSetup,
  updateGameSetup,
  deleteGameSetup,
} from './gameSetups'

import type { StandardScenario } from './gameSetups.scenarios'
import type { GameSetup } from '@prisma/client'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('gameSetups', () => {
  scenario('returns all gameSetups', async (scenario: StandardScenario) => {
    const result = await gameSetups()

    expect(result.length).toEqual(Object.keys(scenario.gameSetup).length)
  })

  scenario('returns a single gameSetup', async (scenario: StandardScenario) => {
    const result = await gameSetup({ id: scenario.gameSetup.one.id })

    expect(result).toEqual(scenario.gameSetup.one)
  })

  scenario('creates a gameSetup', async (scenario: StandardScenario) => {
    const result = await createGameSetup({
      input: {
        wordsPerPhoneme: 1505167,
        phonemes: 6978638,
        userId: scenario.gameSetup.two.userId,
      },
    })

    expect(result.wordsPerPhoneme).toEqual(1505167)
    expect(result.phonemes).toEqual(6978638)
    expect(result.userId).toEqual(scenario.gameSetup.two.userId)
  })

  scenario('updates a gameSetup', async (scenario: StandardScenario) => {
    const original = (await gameSetup({
      id: scenario.gameSetup.one.id,
    })) as GameSetup
    const result = await updateGameSetup({
      id: original.id,
      input: { wordsPerPhoneme: 4444021 },
    })

    expect(result.wordsPerPhoneme).toEqual(4444021)
  })

  scenario('deletes a gameSetup', async (scenario: StandardScenario) => {
    const original = (await deleteGameSetup({
      id: scenario.gameSetup.one.id,
    })) as GameSetup
    const result = await gameSetup({ id: original.id })

    expect(result).toEqual(null)
  })
})
