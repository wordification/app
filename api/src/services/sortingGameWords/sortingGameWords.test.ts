import {
  sortingGameWords,
  sortingGameWord,
  selectRandomTestWord,
  createSortingGameWords,
} from './sortingGameWords'
import type { StandardScenario } from './sortingGameWords.scenarios'

describe('sortingGameWords', () => {
  scenario(
    'returns all sortingGameWords',
    async (scenario: StandardScenario) => {
      const result = await sortingGameWords()

      expect(result.length).toEqual(
        Object.keys(scenario.sortingGameWord).length
      )
    }
  )

  scenario(
    'returns a single sortingGameWord',
    async (scenario: StandardScenario) => {
      const result = await sortingGameWord({
        id: scenario.sortingGameWord.america.id,
      })

      expect(result).toEqual(scenario.sortingGameWord.america)
    }
  )

  scenario(
    'creates multiple sortingGameWords',
    async (scenario: StandardScenario) => {
      const result = await createSortingGameWords({
        gameId: scenario.sortingGameWord.friday.gameId,
        count: 2,
        syllables: 1,
        phoneme: 49,
      })

      expect(result.count).toEqual(2)
    }
  )

  scenario('selects a random test word', async (scenario: StandardScenario) => {
    const result = await selectRandomTestWord({
      gameId: scenario.sortingGameWord.friday.gameId,
    })

    expect(result).toEqual({
      ...scenario.sortingGameWord.friday,
      current: true,
    })
  })
})
