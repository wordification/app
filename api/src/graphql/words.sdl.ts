export const schema = gql`
  type Word {
    id: Int!
    word: String!
    gradeLevel: Int!
    numSyllables: Int!
    phonemes: [Int]!
    graphemes: [String]!
    syllables: [String]!
    sentences: [String]!
    games: [Game]!
    currentGames: [Game]!
    completeGames: [Game]!
  }

  type Query {
    words: [Word!]! @requireAuth
    word(id: Int!): Word @requireAuth
  }
`
