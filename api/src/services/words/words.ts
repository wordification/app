import type { QueryResolvers, WordRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

// TODO: Move this to a database
export const TESTED_WORD_GRAPHEMES = {
  boat: 'oa',
  coal: 'oa',
  coat: 'oa',
  goat: 'oa',
  road: 'oa',
  soap: 'oa',
  float: 'oa',
  goal: 'oa',
  soak: 'oa',
  toast: 'oa',
  coast: 'oa',
  loaf: 'oa',
  coach: 'oa',
  loan: 'oa',
  foam: 'oa',
  roam: 'oa',
  know: 'ow',
  show: 'ow',
  snow: 'ow',
  throw: 'ow',
  bow: 'ow',
  low: 'ow',
  mow: 'ow',
  slow: 'ow',
  crow: 'ow',
  sow: 'ow',
  tow: 'ow',
  row: 'ow',
  glow: 'ow',
  own: 'ow',
  known: 'ow',
  shown: 'ow',
  bone: 'oCe',
  close: 'oCe',
  hole: 'oCe',
  home: 'oCe',
  rode: 'oCe',
  stove: 'oCe',
  those: 'oCe',
  rose: 'oCe',
  nose: 'oCe',
  joke: 'oCe',
  robe: 'oCe',
  poke: 'oCe',
  smoke: 'oCe',
  note: 'oCe',
  wrote: 'oCe',
  rope: 'oCe',
  night: 'igh',
  light: 'igh',
  fight: 'igh',
  high: 'igh',
  right: 'igh',
  sigh: 'igh',
  thigh: 'igh',
  sight: 'igh',
  might: 'igh',
  tight: 'igh',
  fright: 'igh',
  bright: 'igh',
  flight: 'igh',
  knight: 'igh',
  lights: 'igh',
  knights: 'igh',
  hike: 'iCe',
  ride: 'iCe',
  white: 'iCe',
  dime: 'iCe',
  lime: 'iCe',
  wife: 'iCe',
  hive: 'iCe',
  hide: 'iCe',
  shine: 'iCe',
  line: 'iCe',
  price: 'iCe',
  spine: 'iCe',
  kite: 'iCe',
  bride: 'iCe',
  write: 'iCe',
  mice: 'iCe',
  try: 'y',
  fly: 'y',
  sky: 'y',
  dry: 'y',
  my: 'y',
  by: 'y',
  shy: 'y',
  why: 'y',
  cry: 'y',
  spy: 'y',
  fry: 'y',
  sly: 'y',
  pry: 'y',
  wry: 'y',
  sty: 'y',
  ply: 'y',
} as const

export const filterWords = async ({
  phonemes,
  numSyllables,
}: {
  phonemes: number[]
  numSyllables: number
}) => {
  const words = await db.word.findMany({
    where: {
      numSyllables,
      phonemes: {
        hasSome: phonemes,
      },
    },
  })
  return words.filter((word) => word.word in TESTED_WORD_GRAPHEMES)
}

export const selectGameWords = async ({
  count,
  syllables,
  phonemes,
}: {
  count: number
  syllables: number
  phonemes: number[]
}) => {
  const words = await filterWords({
    phonemes: phonemes,
    numSyllables: syllables,
  })

  if (words.length < count * phonemes.length) {
    throw new Error('Not enough words found!')
  }

  return phonemes.flatMap((phoneme) => {
    const possibleWords = words.filter((word) =>
      word.phonemes.includes(phoneme)
    )

    if (possibleWords.length < count) {
      throw new Error('Not enough words found!')
    }

    const data: typeof possibleWords = []
    for (let i = 0; i < count; i++) {
      const newWord =
        possibleWords[Math.floor(Math.random() * possibleWords.length)]

      // TODO: This is a hack to prevent duplicate words
      // and is horribly inefficient.
      if (data.includes(newWord)) {
        i--
        continue
      }

      data.push(newWord)
    }
    return data
  })
}

export const words: QueryResolvers['words'] = () => {
  return db.word.findMany()
}

export const word: QueryResolvers['word'] = ({ id }) => {
  return db.word.findUnique({
    where: { id },
  })
}

export const Word: WordRelationResolvers = {
  games: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).games()
  },
  currentGames: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).currentGames()
  },
  completeGames: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).completeGames()
  },
}
