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

// Filter words based on phonemes with one syllable
const wordsWithLongE = words.filter(
  (word) => word.phonemes.includes(45) && word.numSyllables === 1
)
const wordsWithLongA = words.filter(
  (word) =>
    (word.phonemes.includes(44) || word.phonemes.includes(51)) &&
    word.numSyllables === 1
)
const wordsWithLongU = words.filter(
  (word) => word.phonemes.includes(47) && word.numSyllables === 1
)

// Print the filtered words
console.log('Long E')
wordsWithLongE.forEach((word) => {
  console.log(word.word)
})
// Display the count
console.log(`Count: ${wordsWithLongE.length}`)

// Print the filtered words
console.log('Long A')
wordsWithLongA.forEach((word) => {
  console.log(word.word)
})
// Display the count
console.log(`Count: ${wordsWithLongA.length}`)

// Print the filtered words
console.log('Long U')
wordsWithLongU.forEach((word) => {
  console.log(word.word)
})
// Display the count
console.log(`Count: ${wordsWithLongU.length}`)
