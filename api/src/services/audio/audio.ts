const STATIC_PATH = '/audio'

function cleanText(word: string | number): string {
  // Convert the input to a string and then to lowercase
  const lowercaseText = String(word).toLowerCase()

  // Remove special characters using a regular expression
  const cleanedText = lowercaseText.replace(/[^a-z0-9]+/g, '')

  return cleanedText
}

// Common files
export const getPhoneme = (phoneme: string | number) => {
  return `${STATIC_PATH}/common/phonemes/${cleanText(phoneme)}.mp3`
}

export const getGrapheme = (grapheme: string) => {
  return `${STATIC_PATH}/common/graphemes/${cleanText(grapheme)}.mp3`
}

export const getLetter = (letter: string) => {
  return `${STATIC_PATH}/common/letters/${cleanText(letter)}.mp3`
}

export const getWord = (word: string) => {
  return `${STATIC_PATH}/common/words/${cleanText(word)}.mp3`
}

// Sorting game specific files
export const getSortingGameSentence = (sentence: string) => {
  return `${STATIC_PATH}/sorting/sentences/${cleanText(sentence)}_sentence.mp3`
}

export const getSortingGamePhrase = (phrase: string) => {
  return `${STATIC_PATH}/sorting/phrases/${cleanText(phrase)}.mp3`
}

// Matching game specific files
export const getMatchingGamePhrase = (phrase: string) => {
  return `${STATIC_PATH}/matching/phrases/${cleanText(phrase)}.mp3`
}
