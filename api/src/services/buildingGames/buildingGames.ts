import { GameType } from '@prisma/client'

import { db } from 'src/lib/db'

import { getBuildingGamePhrase, getLetter, getWord } from '../audio'

import type { MutationResolvers, QueryResolvers } from 'types/graphql'

/**
 * Finds a building game by ID and validates that it exists and is a building
 * game.
 *
 * @param gameId The ID of the game to find
 * @returns The game if it exists and is a building game, and its current word
 * @throws An error if the game is not found
 * @throws An error if the game is not a building game
 */
const findBuildingGame = async (gameId: number) => {
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: {
      incompleteWords: true,
      allWords: true,
      currentWord: true,
    },
  })

  if (!game) {
    throw new Error('Game not found')
  }

  if (game.type !== GameType.BUILDING) {
    throw new Error('Game is not a building game')
  }

  return game
}

export const buildingGamePlayLevel: QueryResolvers['buildingGamePlayLevel'] =
  async ({ gameId }) => {
    const game = await findBuildingGame(gameId)

    if (game?.complete) {
      return { game, audio: undefined, choppedWord: 'Complete!', onsList: [] }
    }

    const currentWord = game?.currentWord
    if (!currentWord) {
      throw new Error('Current word not selected')
    }

    const onsIdx = currentWord?.syllables.findIndex((syl) => syl === 'ons') ?? 0
    const onsGrapheme = currentWord?.graphemes.at(onsIdx) ?? ''
    const choppedWord = currentWord?.word.substring(onsGrapheme.length)

    // if (!incompleteWords) {
    //   throw new Error('No words selected for building')
    // }

    const onsList = game.allWords.map((word) => {
      const onsIdx = word.syllables.findIndex((syl) => syl === 'ons')
      return word.graphemes.at(onsIdx) ?? ''
    })

    const audio: string[] = [
      // let's build the word
      getBuildingGamePhrase('build_intro'),
      // [WORD]
      getWord(currentWord.word),
      // spell the
      getBuildingGamePhrase('spell_the'),
      // ons sound
      /// ADD ONSET SOUNDS
      // sound in
      getBuildingGamePhrase('sound_in'),
      // [WORD]
      getWord(currentWord.word),
    ]

    return { game, audio, choppedWord, onsList }
  }

export const selectNextWord = async (gameId: number) => {
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: {
      incompleteWords: true,
    },
  })

  if (game === null) {
    throw new Error('Game not found')
  }

  const { incompleteWords } = game

  if (incompleteWords.length === 0) {
    return db.game.update({
      data: {
        level: 2,
        complete: true,
        currentWordId: null,
      },
      where: { id: gameId },
    })
  }

  const newWord = incompleteWords[0]
  return db.game.update({
    data: {
      level: 1,
      currentWordId: newWord.id,
      incompleteWords: {
        disconnect: [{ id: newWord.id }],
      },
    },
    where: { id: gameId },
  })
}

export const buildingGameGrade: MutationResolvers['buildingGameGrade'] =
  async ({ gameId, ons }) => {
    const game = await findBuildingGame(gameId)

    const currentWord = game?.currentWord
    if (!currentWord) {
      throw new Error('Current word not selected')
    }

    const onsIdx =
      game.currentWord?.syllables.findIndex((syl) => syl === 'ons') ?? 0
    const onsGrapheme = game.currentWord?.graphemes.at(onsIdx) ?? ''

    const correct = onsGrapheme === ons
    const onsLetters = ons.split('')

    const onsLetterAudios = onsLetters.map((letter) => getLetter(letter))

    const correctAudio: string[] = [
      // that's right, the
      getBuildingGamePhrase('thats_right_the'),
      // ons sound
      // ADD ONSET SOUNDS
      // sound in
      getBuildingGamePhrase('sound_in'),
      // [WORD]
      getWord(currentWord.word),
      // is spelled with the letter
      getBuildingGamePhrase('is_spelled_with_letter'),
      // [LETTER](s)
      ...onsLetterAudios,
    ]
    const incorrectAudio: string[] = [
      // that's right, the
      getBuildingGamePhrase('thats_not_right_the'),
      // ons sound
      // ADD ONSET SOUNDS
      // sound in
      getBuildingGamePhrase('sound_in'),
      // [WORD]
      getWord(currentWord.word),
      // is spelled with the letter
      getBuildingGamePhrase('not_spelled_with_letter'),
      // [LETTER](s)
      ...onsLetterAudios,
    ]

    if (correct) {
      await selectNextWord(gameId)
      return { correct: true, audio: correctAudio }
    }

    return { correct: false, audio: incorrectAudio }
  }
