const STATIC_PATH = '/audio'

// Common files
export const getPhoneme = (phoneme: string) => {
  return `${STATIC_PATH}/common/phonemes/${phoneme}.mp3`
}

export const getGrapheme = (grapheme: string) => {
  return `${STATIC_PATH}/common/graphemes/${grapheme}.mp3`
}

export const getLetter = (letter: string) => {
  return `${STATIC_PATH}/common/letters/${letter}.mp3`
}

// Sorting game specific files
export const getSortingGameWord = (word: string) => {
  return `${STATIC_PATH}/sorting/words/${word}.mp3`
}

export const getSortingGameSentence = (sentence: string) => {
  return `${STATIC_PATH}/sorting/sentences/${sentence}.mp3`
}

export const getSortingGamePhrase = (phrase: string) => {
  return `${STATIC_PATH}/sorting/phrases/${phrase}.mp3`
}
