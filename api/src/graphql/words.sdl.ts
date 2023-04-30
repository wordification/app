export const schema = gql`
  type Word {
    id: Int!
    word: String!
    numSyllables: Int!
    gradeLevel: Int!
    phonemes: [Int]!
    graphemes: [String]!
    syllables: [String]!
    sentences: [String]!
    sortingGameWords: [SortingGameWord]!
  }

  type Query {
    words: [Word!]! @requireAuth
    word(id: Int!): Word @requireAuth
  }

  input CreateWordInput {
    word: String!
    numSyllables: Int!
    gradeLevel: Int!
    phonemes: [Int]!
    graphemes: [String]!
    syllables: [String]!
    sentences: [String]!
  }

  input UpdateWordInput {
    word: String
    numSyllables: Int
    gradeLevel: Int
    phonemes: [Int]!
    graphemes: [String]!
    syllables: [String]!
    sentences: [String]!
  }
`
