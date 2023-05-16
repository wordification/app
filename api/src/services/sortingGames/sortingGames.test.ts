import { game as getGame } from '../games/games'

import {
  sortingGameFirstLevel,
  sortingGameGradeFirstLevel,
  sortingGameSecondLevel,
  sortingGameGradeSecondLevel,
  sortingGameGradeThirdLevel,
  advanceLevel,
  selectNextWord,
} from './sortingGames'

import type { StandardScenario } from './sortingGames.scenarios'

describe('sortingGames', () => {
  scenario('returns the first level', async (scenario: StandardScenario) => {
    const result = await sortingGameFirstLevel({
      gameId: scenario.game.lastWord.id,
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
      gameId: scenario.game.lastWord.id,
      phoneme: 22,
    })

    expect(result1).toEqual({ correct: false })

    const result2 = await sortingGameGradeFirstLevel({
      gameId: scenario.game.lastWord.id,
      phoneme: 53,
    })

    expect(result2).toEqual({ correct: true })
  })

  scenario('returns the second level', async (scenario: StandardScenario) => {
    const result = await sortingGameSecondLevel({
      gameId: scenario.game.lastWord.id,
    })

    expect(result.graphemes).toEqual(['iCe', 'igh', 'y', 'ow', 'oa', 'oCe'])
  })

  scenario('grades the second level', async (scenario: StandardScenario) => {
    const result1 = await sortingGameGradeSecondLevel({
      gameId: scenario.game.lastWord.id,
      grapheme: 's',
    })

    expect(result1).toEqual({ correct: false })

    const result2 = await sortingGameGradeSecondLevel({
      gameId: scenario.game.lastWord.id,
      grapheme: 'ow',
    })

    expect(result2).toEqual({ correct: true })
  })

  scenario('grades the third level', async (scenario: StandardScenario) => {
    const result1 = await sortingGameGradeThirdLevel({
      gameId: scenario.game.lastWord.id,
      entry: 's',
    })

    expect(result1).toEqual({ correct: false })

    const result2 = await sortingGameGradeThirdLevel({
      gameId: scenario.game.lastWord.id,
      entry: 'snow',
    })

    expect(result2).toEqual({ correct: true })
  })

  scenario('advances the level', async (scenario: StandardScenario) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let game = (await getGame({ id: scenario.game.lastWord.id }))!

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    game = (await advanceLevel(game.id, game.level))!
    expect(game.level).toEqual(2)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    game = (await advanceLevel(game.id, game.level))!
    expect(game.level).toEqual(3)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    game = (await advanceLevel(game.id, game.level))!
    expect(game.level).toEqual(4)
  })

  scenario(
    'does not advance the level past 4',
    async (scenario: StandardScenario) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const game = (await advanceLevel(
        scenario.game.lastLevel.id,
        scenario.game.lastLevel.level
      ))!

      expect(game.level).toEqual(4)
    }
  )

  describe('selectNextWord()', () => {
    scenario(
      'selects the next available word to test',
      async (scenario: StandardScenario) => {
        const previousWordId = scenario.game.notLastWord.currentWordId
        const words = scenario.game.notLastWord.incompleteWords
        const newGame = await selectNextWord(scenario.game.notLastWord.id)

        expect(newGame.currentWordId).not.toEqual(previousWordId)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        expect(words[0]!.id).toEqual(newGame.currentWordId)
      }
    )

    scenario(
      'clears the selected word when the game finishes',
      async (scenario: StandardScenario) => {
        const previousWordId = scenario.game.lastWord.currentWordId
        const newGame = await selectNextWord(scenario.game.lastWord.id)
        expect(newGame.currentWordId).toEqual(null)
        expect(newGame.currentWordId).not.toEqual(previousWordId)
      }
    )
  })
})
