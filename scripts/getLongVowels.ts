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
const wordsWithLongI = words.filter(
  (word) => word.phonemes.includes(49) && word.numSyllables === 1
)
const wordsWithLongO = words.filter(
  (word) =>
    (word.phonemes.includes(53) || word.phonemes.includes(46)) &&
    word.numSyllables === 1
)
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

// Display number of each ow, oCe, oa, igh, iCe, y words
const oneSyllWords = words.filter((word) => word.numSyllables === 1)

const owWords = oneSyllWords.filter((word) => word.graphemes.includes('ow'))
const oCeWords = oneSyllWords.filter((word) => word.graphemes.includes('oCe'))
const oaWords = oneSyllWords.filter((word) => word.graphemes.includes('oa'))
const ighWords = oneSyllWords.filter((word) => word.graphemes.includes('igh'))
const iCeWords = oneSyllWords.filter((word) => word.graphemes.includes('iCe'))
const yWords = oneSyllWords.filter((word) => word.graphemes.includes('y'))

// Print the filtered words
console.log('ow Words')
owWords.forEach((word) => {
  console.log(word.word)
})
console.log('# of ow Words: ', owWords.length)

console.log('oCe Words')
oCeWords.forEach((word) => {
  console.log(word.word)
})
console.log('# of oCe Words: ', oCeWords.length)

console.log('oa Words')
oaWords.forEach((word) => {
  console.log(word.word)
})
console.log('# of oa Words: ', oaWords.length)

console.log('igh Words')
ighWords.forEach((word) => {
  console.log(word.word)
})
console.log('# of igh Words: ', ighWords.length)

console.log('iCe Words')
iCeWords.forEach((word) => {
  console.log(word.word)
})
console.log('# of iCe Words: ', iCeWords.length)

console.log('y Words')
yWords.forEach((word) => {
  console.log(word.word)
})
console.log('# of y Words: ', yWords.length)

// Print the filtered words
console.log('Long I')
wordsWithLongI.forEach((word) => {
  console.log(word.word)
})
// Display the count
console.log(`Count: ${wordsWithLongI.length}`)

// Print the filtered words
console.log('Long O')
wordsWithLongO.forEach((word) => {
  console.log(word.word)
})
// Display the count
console.log(`Count: ${wordsWithLongI.length}`)

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
