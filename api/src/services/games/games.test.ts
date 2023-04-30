import type { Game } from '@prisma/client'
import { GameType } from 'types/graphql'

import { games, game, createGame, updateGame, deleteGame } from './games'
import type { StandardScenario } from './games.scenarios'

describe('games', () => {
  scenario('returns all games', async (scenario: StandardScenario) => {
    const result = await games()

    expect(result.length).toEqual(Object.keys(scenario.game).length)
  })

  scenario('returns a single game', async (scenario: StandardScenario) => {
    const result = await game({ id: scenario.game.one.id })

    expect(result).toEqual(scenario.game.one)
  })

  scenario('creates a game', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)
    const result = await createGame({
      input: {
        type: 'SORTING',
        wordsPerPhoneme: 1,
        phonemeOne: 49,
        phonemeTwo: 53,
      },
    })

    expect(result.userId).toEqual(scenario.user.one.id)
    expect(result.wordsPerPhoneme).toEqual(1)
    expect(result.phonemeOne).toEqual(49)
    expect(result.phonemeTwo).toEqual(53)
    expect(result.level).toEqual(1)

    const gameWords = result.allWords

    expect(result.allWords.length).toEqual(2)
    expect(gameWords[0].phonemes).toContain(49)
    expect(gameWords[1].phonemes).toContain(53)
    expect(result.currentWordId).toEqual(gameWords[0].id)
  })

  scenario('rejects incorrect data', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)
    await expect(
      createGame({
        input: {
          type: 'SORTING',
          wordsPerPhoneme: 1,
          phonemeOne: 49,
          phonemeTwo: 50,
        },
      })
    ).rejects.toThrowError()
    await expect(
      createGame({
        input: {
          type: 'SORTING',
          wordsPerPhoneme: 100,
          phonemeOne: 49,
          phonemeTwo: 53,
        },
      })
    ).rejects.toThrowError()
    await expect(
      createGame({
        input: {
          type: 'abc' as GameType,
          wordsPerPhoneme: 1,
          phonemeOne: 49,
          phonemeTwo: 53,
        },
      })
    ).rejects.toThrowError()
  })

  scenario('updates a game', async (scenario: StandardScenario) => {
    const original = (await game({ id: scenario.game.one.id })) as Game
    const result = await updateGame({
      id: original.id,
      input: { wordsPerPhoneme: 2 },
    })

    expect(result.wordsPerPhoneme).toEqual(2)
  })

  scenario('deletes a game', async (scenario: StandardScenario) => {
    const original = (await deleteGame({ id: scenario.game.one.id })) as Game
    const result = await game({ id: original.id })

    expect(result).toEqual(null)
  })
})
