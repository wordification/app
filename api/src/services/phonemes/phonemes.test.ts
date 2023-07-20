import type { Phoneme } from '@prisma/client'

import {
  phonemes,
  phoneme,
  createPhoneme,
  updatePhoneme,
  deletePhoneme,
} from './phonemes'
import type { StandardScenario } from './phonemes.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('phonemes', () => {
  scenario('returns all phonemes', async (scenario: StandardScenario) => {
    const result = await phonemes()

    expect(result.length).toEqual(Object.keys(scenario.phoneme).length)
  })

  scenario('returns a single phoneme', async (scenario: StandardScenario) => {
    const result = await phoneme({ id: scenario.phoneme.one.id })

    expect(result).toEqual(scenario.phoneme.one)
  })

  scenario('creates a phoneme', async () => {
    const result = await createPhoneme({
      input: { id: 3340791, name: 'String' },
    })

    expect(result.id).toEqual(3340791)
    expect(result.name).toEqual('String')
  })

  scenario('updates a phoneme', async (scenario: StandardScenario) => {
    const original = (await phoneme({ id: scenario.phoneme.one.id })) as Phoneme
    const result = await updatePhoneme({
      id: original.id,
      input: { id: 5207818 },
    })

    expect(result.id).toEqual(5207818)
  })

  scenario('deletes a phoneme', async (scenario: StandardScenario) => {
    const original = (await deletePhoneme({
      id: scenario.phoneme.one.id,
    })) as Phoneme
    const result = await phoneme({ id: original.id })

    expect(result).toEqual(null)
  })
})
