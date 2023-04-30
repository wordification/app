import type { SortingGameWord } from '@prisma/client'

import {
  sortingGameWords,
  sortingGameWord,
  createSortingGameWords,
  updateSortingGameWord,
  deleteSortingGameWord,
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

  scenario('updates a sortingGameWord', async (scenario: StandardScenario) => {
    const original = (await sortingGameWord({
      id: scenario.sortingGameWord.america.id,
    })) as SortingGameWord
    const result = await updateSortingGameWord({
      id: original.id,
      input: { testedGrapheme: 'String2' },
    })

    expect(result.testedGrapheme).toEqual('String2')
  })

  scenario('deletes a sortingGameWord', async (scenario: StandardScenario) => {
    const original = (await deleteSortingGameWord({
      id: scenario.sortingGameWord.america.id,
    })) as SortingGameWord
    const result = await sortingGameWord({ id: original.id })

    expect(result).toEqual(null)
  })
})
