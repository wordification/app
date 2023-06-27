import { completeWords, matchingGameGrade } from './matchingGames'

import type { StandardScenario } from './matchingGames.scenarios'

describe('matchingGames', () => {
  describe('completeWords()', () => {
    scenario(
      'removes the selected words from the game and returns the updated game',
      async (scenario: StandardScenario) => {
        const updatedGame = await completeWords(
          scenario.game.notLastWords.id,
          scenario.word.show,
          scenario.word.snow
        )

        expect(updatedGame.level).toEqual(1)

        expect(updatedGame.incompleteWords).toHaveLength(2)
        expect(updatedGame.incompleteWords).not.toContainEqual(
          scenario.word.show
        )
        expect(updatedGame.incompleteWords).not.toContainEqual(
          scenario.word.snow
        )
      }
    )
    scenario(
      'marks the game as complete if there are no more words',
      async (scenario: StandardScenario) => {
        const updatedGame = await completeWords(
          scenario.game.lastWords.id,
          scenario.word.show,
          scenario.word.snow
        )

        expect(updatedGame.level).toEqual(2)
        expect(updatedGame.complete).toEqual(true)

        expect(updatedGame.incompleteWords).toHaveLength(0)
      }
    )
  })

  describe('matchingGameGrade()', () => {
    scenario('returns the game', async (scenario: StandardScenario) => {
      const response = await matchingGameGrade({
        gameId: scenario.game.notLastWords.id,
        firstWordId: scenario.word.show.id,
        secondWordId: scenario.word.snow.id,
      })

      expect(response.game).toEqual(scenario.game.notLastWords)
    })

    scenario(
      'returns correct if the answer is correct',
      async (scenario: StandardScenario) => {
        const response = await matchingGameGrade({
          gameId: scenario.game.notLastWords.id,
          firstWordId: scenario.word.show.id,
          secondWordId: scenario.word.snow.id,
        })

        expect(response.correct).toEqual(true)
        expect(response.firstWord).toEqual(scenario.word.show)
        expect(response.secondWord).toEqual(scenario.word.snow)
      }
    )

    scenario(
      'returns incorrect if the answer is incorrect',
      async (scenario: StandardScenario) => {
        const response = await matchingGameGrade({
          gameId: scenario.game.notLastWords.id,
          firstWordId: scenario.word.show.id,
          secondWordId: scenario.word.sight.id,
        })

        expect(response.correct).toEqual(false)
        expect(response.firstWord).toEqual(scenario.word.show)
        expect(response.secondWord).toEqual(scenario.word.sight)
      }
    )
  })
})
