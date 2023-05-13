export const schema = gql`
  """
  A word.
  """
  type Word {
    "The unique identifier of a word."
    id: Int!

    "The word itself. Must be unique."
    word: String!

    "The grade level of the word."
    gradeLevel: Int!

    "The number of syllables in the word."
    numSyllables: Int!

    "The phonemes in the word, ordered in the way they are pronounced."
    phonemes: [Int!]!

    "The phonemes being tested in the word. Currently, only one phoneme can be tested at a time."
    testedPhonemes: [Int!]!

    "The graphemes in the word, ordered in the way they are pronounced."
    graphemes: [String!]!

    "The graphemes being tested in the word. Currently, only one grapheme can be tested at a time."
    testedGraphemes: [String!]!

    "The syllables in the word, ordered in the way they are pronounced. Broken down by nucleus, coda, etc."
    syllables: [String!]!

    "Example sentences for the word."
    sentences: [String!]!

    "Games that are currently playing this word."
    currentGames: [Game!]

    "All of the games that have played this word."
    allGames: [Game!]

    "All of the games that have played this word but have not completed it."
    incompleteGames: [Game!]
  }

  """
  Queries for words.
  """
  type Query {
    "Fetch all words."
    words: [Word!]! @requireAuth

    "Fetch a word by ID."
    word(id: Int!): Word @requireAuth
  }
`
