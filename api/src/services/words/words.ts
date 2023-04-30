import type { QueryResolvers, WordRelationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

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
  phoneme,
  numSyllables,
}: {
  phoneme: number
  numSyllables: number
}) => {
  const words = await db.word.findMany()
  return words.filter((word) => {
    return (
      word.numSyllables === numSyllables &&
      word.phonemes.includes(phoneme) &&
      word.word in TESTED_WORD_GRAPHEMES
    )
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
  sortingGameWords: (_obj, { root }) => {
    return db.word.findUnique({ where: { id: root?.id } }).sortingGameWords()
  },
}