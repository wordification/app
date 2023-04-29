import type { SortingGameWord } from '@prisma/client'

import {
  sortingGameWords,
  sortingGameWord,
  createSortingGameWord,
  updateSortingGameWord,
  deleteSortingGameWord,
} from './sortingGameWords'
import type { StandardScenario } from './sortingGameWords.scenarios'

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

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
        id: scenario.sortingGameWord.one.id,
      })

      expect(result).toEqual(scenario.sortingGameWord.one)
    }
  )

  scenario('creates a sortingGameWord', async (scenario: StandardScenario) => {
    const result = await createSortingGameWord({
      input: {
        wordId: scenario.sortingGameWord.two.wordId,
        gameId: scenario.sortingGameWord.two.gameId,
        testedGrapheme: 'String',
      },
    })

    expect(result.wordId).toEqual(scenario.sortingGameWord.two.wordId)
    expect(result.gameId).toEqual(scenario.sortingGameWord.two.gameId)
    expect(result.testedGrapheme).toEqual('String')
  })

  scenario('updates a sortingGameWord', async (scenario: StandardScenario) => {
    const original = (await sortingGameWord({
      id: scenario.sortingGameWord.one.id,
    })) as SortingGameWord
    const result = await updateSortingGameWord({
      id: original.id,
      input: { testedGrapheme: 'String2' },
    })

    expect(result.testedGrapheme).toEqual('String2')
  })

  scenario('deletes a sortingGameWord', async (scenario: StandardScenario) => {
    const original = (await deleteSortingGameWord({
      id: scenario.sortingGameWord.one.id,
    })) as SortingGameWord
    const result = await sortingGameWord({ id: original.id })

    expect(result).toEqual(null)
  })
})
