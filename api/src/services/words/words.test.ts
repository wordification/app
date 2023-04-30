import { words, word, filterWords, selectGameWords } from './words'
import type { StandardScenario } from './words.scenarios'

describe('words', () => {
  scenario('returns all words', async (scenario: StandardScenario) => {
    const result = await words()

    expect(result.length).toEqual(Object.keys(scenario.word).length)
  })

  scenario('returns a single word', async (scenario: StandardScenario) => {
    const result = await word({ id: scenario.word.sight.id })

    expect(result).toEqual(scenario.word.sight)
  })

  scenario(
    'filters words by phonemes and syllables',
    async (_scenario: StandardScenario) => {
      const phonemes = [49, 53]
      const numSyllables = 1

      const result = await filterWords({ phonemes, numSyllables })

      expect(result.length).toEqual(4)
    }
  )

  scenario('throws an error when not enough words are found', async () => {
    const phonemes = [49, 53]
    const numSyllables = 1
    const count = 100

    await expect(
      selectGameWords({ phonemes, numSyllables, count })
    ).rejects.toThrowError()
  })

  scenario('selects words for a game', async (_scenario: StandardScenario) => {
    const phonemes = [49, 53]
    const numSyllables = 1
    const count = 2

    const result = await selectGameWords({
      phonemes,
      numSyllables,
      count,
    })
    expect(result.length).toEqual(4)
    expect(result[0].phonemes).toContain(49)
    expect(result[1].phonemes).toContain(49)
    expect(result[2].phonemes).toContain(53)
    expect(result[3].phonemes).toContain(53)
  })
})
