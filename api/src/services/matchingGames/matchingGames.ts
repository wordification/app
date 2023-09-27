import { GameType } from '@prisma/client'

import { db } from 'src/lib/db'

import { getMatchingGamePhrase, getWord } from '../audio'

import type { Phoneme } from '@prisma/client'
import type {
  MutationResolvers,
  QueryResolvers,
  ResolverTypeWrapper,
  Word,
} from 'types/graphql'
/**
 * Finds a matching game by ID and validates that it exists and is a matching
 * game.
 *
 * @param gameId The ID of the game to find
 * @returns The game if it exists and is a matching game, and its current word
 * @throws An error if the game is not found
 * @throws An error if the game is not a matching game
 */
const findMatchingGame = async (gameId: number) => {
  const game = await db.game.findUnique({
    where: { id: gameId },
    include: {
      incompleteWords: true,
      allWords: true,
    },
  })

  if (!game) {
    throw new Error('Game not found')
  }

  if (game.type !== GameType.MATCHING) {
    throw new Error('Game is not a matching game')
  }

  return game
}

/**
 * Advances to the next level of a matching game. These are the levels:
 *
 * 0. Initial level (not currently used)
 * 1. In progress (try to match words)
 * 2. Complete (game is over)
 *
 * @param gameId The ID of the game to advance
 * @returns The updated game or the current game if the game is already complete
 */
export const completeWords = async (
  gameId: number,
  firstWord: Word,
  secondWord?: Word
) => {
  if (secondWord) {
    /// updated game for MEMORY matching game
    const updatedGame = await db.game.update({
      where: { id: gameId },
      data: {
        incompleteWords: {
          disconnect: [{ id: firstWord.id }, { id: secondWord.id }],
        },
      },
      include: {
        incompleteWords: true,
      },
    })

    if (updatedGame.incompleteWords.length !== 0) {
      return updatedGame
    }

    return db.game.update({
      where: { id: gameId },
      data: {
        level: 2,
        complete: true,
      },
      include: {
        incompleteWords: true,
      },
    })
  } else {
    const game = await findMatchingGame(gameId)

    const testedSpeechSounds =
      game.phonemes.length !== 0 ? game.phonemes : game.graphemes

    /// Updated game for GROUPING matching game
    //  Stays on same phoneme/grapheme here
    const updatedGame = await db.game.update({
      where: { id: gameId },
      data: {
        incompleteWords: {
          disconnect: [{ id: firstWord.id }],
        },
      },
      include: {
        incompleteWords: true,
      },
    })

    // Check if there exists a word that has a phoneme
    //  that is the current phoneme being tested
    if (
      updatedGame.incompleteWords.some(
        (incompleteWord) =>
          incompleteWord.phonemes.some(
            (p) => p === testedSpeechSounds[game.currentUnitIndex ?? -1]
          ) ||
          incompleteWord.graphemes.some(
            (g) => g === testedSpeechSounds[game.currentUnitIndex ?? -1]
          )
      )
    ) {
      return updatedGame
    }

    // Check if the game is complete
    if (
      game.currentUnitIndex !== null &&
      game.currentUnitIndex < testedSpeechSounds.length - 1
    ) {
      return db.game.update({
        where: { id: gameId },
        data: {
          level: 1,
          currentUnitIndex: game.currentUnitIndex + 1,
          incompleteWords: {
            set: game.allWords.map((word) => ({ id: word.id })),
          },
        },
        include: {
          incompleteWords: true,
        },
      })
    }
    return db.game.update({
      where: { id: gameId },
      data: {
        level: 2,
        complete: true,
        currentUnitIndex: null,
      },
      include: {
        incompleteWords: true,
      },
    })
  }
}

export const matchingGamePlayLevel: QueryResolvers['matchingGamePlayLevel'] =
  async ({ gameId }) => {
    const game = await findMatchingGame(gameId)

    const incompleteWords = game?.incompleteWords

    if (!incompleteWords) {
      throw new Error('No words selected for matching')
    }

    const audio = [getMatchingGamePhrase('instructions')]

    const phonemes = await Promise.all(
      game.phonemes.map(async (p) => {
        const phoneme = await db.phoneme.findUnique({
          where: { id: p },
        })
        return phoneme as ResolverTypeWrapper<Phoneme>
      })
    )

    return {
      game,
      audio,
      incompleteWords,
      phonemes,
    }
  }

export const readWord: QueryResolvers['readWord'] = async ({ word }) => {
  const audio = [getWord(word)]
  return audio
}

export const groupingMatchingGameGrade: MutationResolvers['groupingMatchingGameGrade'] =
  async ({ gameId, wordId }) => {
    const game = await findMatchingGame(gameId)

    const word = game.incompleteWords.find((word) => word.id === wordId)

    if (!word) {
      throw new Error('Word not found')
    }

    if (game.currentUnitIndex === undefined) {
      throw new Error('Current phoneme/grapheme not specified!')
    }

    const testedSpeechSounds =
      game.phonemes.length !== 0 ? game.phonemes : game.graphemes
    const wordSpeechSounds =
      game.phonemes.length !== 0 ? word.phonemes : word.graphemes

    const correct = wordSpeechSounds.some(
      (s) => s === testedSpeechSounds[game.currentUnitIndex ?? 0]
    )

    const correctAudio = [getMatchingGamePhrase('correct')]
    const incorrectAudio = [getMatchingGamePhrase('incorrect')]

    if (correct) {
      await completeWords(gameId, word)
      return { correct: true, audio: correctAudio }
    }

    return { correct: false, audio: incorrectAudio }
  }

export const matchingGameGrade: MutationResolvers['matchingGameGrade'] =
  async ({ gameId, firstWordId, secondWordId }) => {
    const game = await findMatchingGame(gameId)

    if (firstWordId === secondWordId) {
      throw new Error('Cannot select the same word twice')
    }

    const firstWord = game.incompleteWords.find(
      (word) => word.id === firstWordId
    )

    const secondWord = game.incompleteWords.find(
      (word) => word.id === secondWordId
    )

    if (!firstWord || !secondWord) {
      throw new Error('Word not found')
    }

    const testedSpeechSounds =
      game.phonemes.length !== 0 ? game.phonemes : game.graphemes
    const firstWordSpeechSounds =
      game.phonemes.length !== 0 ? firstWord.phonemes : firstWord.graphemes
    const secondWordSpeechSounds =
      game.phonemes.length !== 0 ? secondWord.phonemes : secondWord.graphemes

    // Returns true if the first word has some sound that is also found
    //  in the second word that is found in the tested sounds.
    const correct = firstWordSpeechSounds.some((fWs) =>
      secondWordSpeechSounds.some(
        (sWs) => fWs === sWs && testedSpeechSounds.some((tSs) => sWs === tSs)
      )
    )

    const correctAudio = [getMatchingGamePhrase('correct')]
    const incorrectAudio = [getMatchingGamePhrase('incorrect')]

    if (correct) {
      await completeWords(gameId, firstWord, secondWord)
      return { correct: true, audio: correctAudio }
    }

    return { correct: false, audio: incorrectAudio }
  }
