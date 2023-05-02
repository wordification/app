export const schema = gql`
  type Game {
    id: Int!
    user: User!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    type: GameType!
    wordsPerPhoneme: Int!
    phonemes: [Int]!
    level: Int!
    complete: Boolean!
    currentWordId: Int
    currentWord: Word
    allWords: [Word]!
    incompleteWords: [Word]!
  }

  enum GameType {
    SORTING
    MATCHING
  }

  type Query {
    games: [Game!]! @requireAuth
    games(complete: Boolean): [Game!]! @requireAuth
    game(id: Int!): Game @requireAuth
  }

  input CreateGameInput {
    type: GameType!
    wordsPerPhoneme: Int!
    phonemes: [Int]!
  }

  input UpdateGameInput {
    userId: Int
    type: GameType
    wordsPerPhoneme: Int
    phonemes: [Int]
    level: Int
    currentWordId: Int
  }

  type Mutation {
    createGame(input: CreateGameInput!): Game! @requireAuth
    updateGame(id: Int!, input: UpdateGameInput!): Game! @requireAuth
    deleteGame(id: Int!): Game! @requireAuth
  }
`
