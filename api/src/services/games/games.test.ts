import type { Game } from '@prisma/client'

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
    const result = await createGame({
      input: {
        userId: scenario.game.two.userId,
        wordsPerPhoneme: 7432704,
        phonemeOne: 2756443,
        phonemeTwo: 7908734,
        level: 3786922,
      },
    })

    expect(result.userId).toEqual(scenario.game.two.userId)
    expect(result.wordsPerPhoneme).toEqual(7432704)
    expect(result.phonemeOne).toEqual(2756443)
    expect(result.phonemeTwo).toEqual(7908734)
    expect(result.level).toEqual(3786922)
  })

  scenario('updates a game', async (scenario: StandardScenario) => {
    const original = (await game({ id: scenario.game.one.id })) as Game
    const result = await updateGame({
      id: original.id,
      input: { wordsPerPhoneme: 5683524 },
    })

    expect(result.wordsPerPhoneme).toEqual(5683524)
  })

  scenario('deletes a game', async (scenario: StandardScenario) => {
    const original = (await deleteGame({ id: scenario.game.one.id })) as Game
    const result = await game({ id: original.id })

    expect(result).toEqual(null)
  })
})
