export const schema = gql`
  type Game {
    id: Int!
    user: User!
    userId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    type: GameType!
    wordsPerPhoneme: Int!
    phonemeOne: Int!
    phonemeTwo: Int!
    level: Int!
    sortingGameWords: [SortingGameWord]!
  }

  enum GameType {
    SORTING
    MATCHING
  }

  type Query {
    games: [Game!]! @requireAuth
    game(id: Int!): Game @requireAuth
  }

  input CreateGameInput {
    userId: Int!
    type: GameType!
    wordsPerPhoneme: Int!
    phonemeOne: Int!
    phonemeTwo: Int!
    level: Int!
  }

  input UpdateGameInput {
    userId: Int
    type: GameType
    wordsPerPhoneme: Int
    phonemeOne: Int
    phonemeTwo: Int
    level: Int
  }

  type Mutation {
    createGame(input: CreateGameInput!): Game! @requireAuth
    updateGame(id: Int!, input: UpdateGameInput!): Game! @requireAuth
    deleteGame(id: Int!): Game! @requireAuth
  }
`
