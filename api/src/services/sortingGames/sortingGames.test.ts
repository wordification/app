import {
  sortingGameFirstLevel,
  sortingGameGradeFirstLevel,
} from './sortingGames'
import type { StandardScenario } from './sortingGames.scenarios'

describe('sortingGames', () => {
  scenario('returns the first level', async (scenario: StandardScenario) => {
    const result = await sortingGameFirstLevel({
      gameId: scenario.game.two.id,
    })

    expect(result.phonemes).toContainEqual({
      id: 49,
      label: 'Long I',
    })
    expect(result.phonemes).toContainEqual({
      id: 53,
      label: 'Long O',
    })
  })

  scenario('grades the first level', async (scenario: StandardScenario) => {
    const result1 = await sortingGameGradeFirstLevel({
      gameId: scenario.game.two.id,
      phoneme: 22,
    })

    expect(result1).toEqual(false)

    const result2 = await sortingGameGradeFirstLevel({
      gameId: scenario.game.two.id,
      phoneme: 53,
    })

    expect(result2).toEqual(true)
  })
})
