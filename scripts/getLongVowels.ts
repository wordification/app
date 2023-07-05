import * as fs from 'fs'
import * as path from 'path'

type Word = {
  word: string
  gradeLevel: number
  phonemes: number[]
  graphemes: string[]
  syllables: string[]
  numSyllables: number
  sentences: string[]
  testedGraphemes: string[]
  testedPhonemes: number[]
}

const filePath = path.join(__dirname, 'word_data.json') // Construct the absolute file path

// Read the JSON file
const fileData = fs.readFileSync(filePath, 'utf8')
const words: Word[] = JSON.parse(fileData)

// Filter words based on phonemes
const wordsWithPhoneme45 = words.filter((word) => word.phonemes.includes(45))
const wordsWithPhoneme44 = words.filter((word) => word.phonemes.includes(44))
const wordsWithPhoneme47 = words.filter((word) => word.phonemes.includes(47))

// Print the filtered words
wordsWithPhoneme45.forEach((word) => {
  console.log('Long E: ', word.word)
})

// Print the filtered words
wordsWithPhoneme44.forEach((word) => {
  console.log('Long E: ', word.word)
})

// Print the filtered words
wordsWithPhoneme47.forEach((word) => {
  console.log('Long E: ', word.word)
})
