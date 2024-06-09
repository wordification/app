import { GameType } from '@prisma/client'

import { db } from 'src/lib/db'

import {
  getMaribethSentence,
  getBuildingGamePhrase,
  getLetter,
  getPhoneme,
  getSentence,
  getSortingGamePhrase,
  getWord,
} from '../audio'

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

    // A list of onset indexes
    const currentOnsIdxList = (currentWord?.syllables || [])
      .map((syl, index) => (syl === 'ons' ? index : null))
      .filter((index) => index !== null) // Remove null values
      .map((index) => index as number)
    const currentOnsGraphemeList = currentOnsIdxList.map(
      (idx) => currentWord?.graphemes[idx]
    )
    const currentOnsGraphemeString = currentOnsGraphemeList.join('')
    const currentChoppedWord = currentWord?.word.substring(
      currentOnsGraphemeString.length
    )
    // Get current word phoneme for onset position
    const currentOnsPhonemeList = currentOnsIdxList.map(
      (idx) => currentWord?.phonemes[idx]
    )

    // if (!incompleteWords) {
    //   throw new Error('No words selected for building')
    // }

    // Choose list of onsets from all words in the game
    const allOnsList = game.allWords.map((word) => {
      const onsIdxList = (word.syllables || [])
        .map((syl, index) => (syl === 'ons' ? index : null))
        .filter((index) => index !== null) // Remove null values
        .map((index) => index as number)
      const onsGraphemeList = onsIdxList.map((idx) => word.graphemes[idx])
      return onsGraphemeList.join('')
    })

    // Filter out onsGrapheme from onsList
    const filteredList = allOnsList.filter(
      (grapheme) => grapheme !== currentOnsGraphemeString
    )

    const uniqueSet = new Set(filteredList)
    // Shuffle the filteredList randomly
    const uniqueArr = Array.from(uniqueSet)
    // Select three random elements from shuffledList
    const shuffledList = uniqueArr.sort(() => Math.random() - 0.5)
    const selectedGraphemes = shuffledList.slice(0, 3)
    // Concatenate onsGrapheme with the selectedGraphemes
    const gameOnsList = [currentOnsGraphemeString, ...selectedGraphemes].sort(
      () => Math.random() - 0.5
    )

    const onsPhonemeAudios = currentOnsPhonemeList.map((phoneme) =>
      getPhoneme(phoneme)
    )
    const audio: string[] = [
      // let's build the word
      getBuildingGamePhrase('build_intro'),
      // [WORD]
      getWord(currentWord.word),
      // a sentence that has
      getSortingGamePhrase('intro_sentence'),
      // [ WORD ]
      getWord(currentWord.word),
      // [ SENTENCE ]
      getSentence(currentWord.word),
      // also pronounced
      getSortingGamePhrase('also_pronounced'),
      // [ Maribeth SENTENCE ]
      getMaribethSentence(currentWord.word),
      // spell the
      getBuildingGamePhrase('spell_the'),
      // ons sound
      ...onsPhonemeAudios,
      // sound in
      getBuildingGamePhrase('sound_in'),
      // [WORD]
      getWord(currentWord.word),
    ]

    return {
      game,
      audio,
      choppedWord: currentChoppedWord,
      onsList: gameOnsList,
    }
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

    // A list of onset indexes
    const onsIdxList = (currentWord?.syllables || [])
      .map((syl, index) => (syl === 'ons' ? index : null))
      .filter((index) => index !== null) // Remove null values
      .map((index) => index as number)
    const onsGraphemeList = onsIdxList.map((idx) => currentWord?.graphemes[idx])
    const onsGraphemeString = onsGraphemeList.join('')
    const onsPhonemeList = onsIdxList.map((idx) => currentWord?.phonemes[idx])

    const correct = onsGraphemeString === ons
    const onsLetters = ons.split('')

    const onsLetterAudios = onsLetters.map((letter) => getLetter(letter))
    const onsPhonemeAudios = onsPhonemeList.map((phoneme) =>
      getPhoneme(phoneme)
    )

    const correctAudio: string[] = [
      // that's right, the
      getBuildingGamePhrase('thats_right_the'),
      // ons sound
      ...onsPhonemeAudios,
      // sound in
      getBuildingGamePhrase('sound_in'),
      // [WORD]
      getWord(currentWord.word),
      // is spelled with the letter
      getBuildingGamePhrase('is_spelled_with_letter'),
      // [LETTER](s)
      ...onsLetterAudios,
      getSortingGamePhrase('good_job'),
    ]
    const incorrectAudio: string[] = [
      // that's right, the
      getBuildingGamePhrase('thats_not_right_the'),
      // ons sound
      ...onsPhonemeAudios,
      // sound in
      getBuildingGamePhrase('sound_in'),
      // [WORD]
      getWord(currentWord.word),
      // is spelled with the letter
      getBuildingGamePhrase('not_spelled_with_letter'),
      // [LETTER](s)
      ...onsLetterAudios,
      getSortingGamePhrase('tryagain'),
    ]

    if (correct) {
      await selectNextWord(gameId)
      return { correct: true, audio: correctAudio }
    }

    return { correct: false, audio: incorrectAudio }
  }
