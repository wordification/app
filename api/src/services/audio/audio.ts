const STATIC_PATH = '/audio'

function cleanText(word: string): string {
  // Convert the input to a string and then to lowercase
  const lowercaseText = word.toLowerCase()

  // Remove special characters (excluding underscores) using a regular expression
  const cleanedText = lowercaseText.replace(/[^a-z0-9_]+/g, '')

  return cleanedText
}

// SWE Example Words
export const getSWEWord = (word: string) => {
  return `${STATIC_PATH}/common/SWE_words/${cleanText(word)}.mp3`
}
// Default sentence 0 -- replace with fix for choosing 1/4 sentence as in sorting game sentence
//  Only sentence 0 exists right now. Will generate rest later
export const getSWESentence = (sentence: string) => {
  return `${STATIC_PATH}/common/SWE_sentences/${cleanText(
    sentence
  )}_sentence_0.mp3`
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
