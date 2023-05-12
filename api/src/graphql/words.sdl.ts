export const schema = gql`
  type Word {
    id: Int!
    word: String!
    gradeLevel: Int!
    numSyllables: Int!
    phonemes: [Int!]!
    testedPhonemes: [Int!]!
    graphemes: [String!]!
    testedGraphemes: [String!]!
    syllables: [String!]!
    sentences: [String!]!
    currentGames: [Game!]
    allGames: [Game!]
    incompleteGames: [Game!]
  }

  type Query {
    words: [Word!]! @requireAuth
    word(id: Int!): Word @requireAuth
  }
`
