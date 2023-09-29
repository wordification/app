const STATIC_PATH = '/audio'

function cleanText(word: string): string {
  // Convert the input to a string and then to lowercase
  const lowercaseText = word.toLowerCase()

  // Remove special characters (excluding underscores) using a regular expression
  const cleanedText = lowercaseText.replace(/[^a-z0-9_]+/g, '')

  return cleanedText
}

// Common files
export const getPhoneme = (phoneme: string | number) => {
  return `${STATIC_PATH}/common/phonemes/${phoneme}.mp3`
}

export const getGrapheme = (grapheme: string) => {
  return `${STATIC_PATH}/common/graphemes/${grapheme}.mp3`
}

export const getLetter = (letter: string) => {
  return `${STATIC_PATH}/common/letters/${letter}.mp3`
}

export const getWord = (word: string) => {
  return `${STATIC_PATH}/common/words/${cleanText(word)}.mp3`
}

// Sorting game specific files
export const getSortingGameSentence = (sentence: string) => {
  return `${STATIC_PATH}/sorting/sentences/${cleanText(sentence)}_sentence.mp3`
}

export const getSortingGamePhrase = (phrase: string) => {
  return `${STATIC_PATH}/sorting/phrases/${phrase}.mp3`
}

// Matching game specific files
export const getMatchingGamePhrase = (phrase: string) => {
  return `${STATIC_PATH}/matching/phrases/${phrase}.mp3`
}
