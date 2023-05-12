import type { Game } from '@prisma/client'
import { GameType } from 'types/graphql'

import { games, game, createGame, updateGame, deleteGame } from './games'
import type { StandardScenario } from './games.scenarios'

describe('games', () => {
  scenario('returns all games', async (scenario: StandardScenario) => {
    const result = await games({})

    expect(result.length).toEqual(Object.keys(scenario.game).length)
  })

  scenario('returns a single game', async (scenario: StandardScenario) => {
    const result = await game({ id: scenario.game.one.id })

    expect(result).toEqual(scenario.game.one)
  })

  scenario('creates a game', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)
    const phonemes = [49, 53]
    const result = await createGame({
      input: {
        type: 'SORTING',
        wordsPerPhoneme: 1,
        phonemes,
      },
    })

    expect(result.userId).toEqual(scenario.user.one.id)
    expect(result.wordsPerPhoneme).toEqual(1)
    expect(result.phonemes[0]).toEqual(phonemes[0])
    expect(result.phonemes[1]).toEqual(phonemes[1])
    expect(result.level).toEqual(1)

    const { allWords } = result
    if (!allWords) {
      throw new Error('No game words')
    }
    expect(allWords.length).toEqual(2)
    const calculateIntersection = (gamePhonemes?: number[]) =>
      gamePhonemes?.filter((value) => phonemes.includes(value))

    expect(calculateIntersection(allWords[0]?.phonemes)).not.toBe(0)
    expect(calculateIntersection(allWords[1]?.phonemes)).not.toBe(0)
    expect(result.currentWordId).toEqual(allWords[0]?.id)
  })

  scenario('rejects incorrect data', async (scenario: StandardScenario) => {
    mockCurrentUser(scenario.user.one)
    await expect(
      createGame({
        input: {
          type: 'SORTING',
          wordsPerPhoneme: 1,
          phonemes: [49, 50],
        },
      })
    ).rejects.toThrowError()
    await expect(
      createGame({
        input: {
          type: 'SORTING',
          wordsPerPhoneme: 100,
          phonemes: [49, 53],
        },
      })
    ).rejects.toThrowError()
    await expect(
      createGame({
        input: {
          type: 'abc' as GameType,
          wordsPerPhoneme: 1,
          phonemes: [49, 53],
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
