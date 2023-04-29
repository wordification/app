export const schema = gql`
  type Game {
    id: Int!
    user: User!
    userId: Int!
    date: DateTime!
    wordsPerPhoneme: Int!
    phonemeOne: Int!
    phonemeTwo: Int!
    level: Int!
    sortingGameWords: [SortingGameWord]!
  }

  type Query {
    games: [Game!]! @requireAuth
    game(id: Int!): Game @requireAuth
  }

  input CreateGameInput {
    userId: Int!
    date: DateTime
    wordsPerPhoneme: Int!
    phonemeOne: Int!
    phonemeTwo: Int!
    level: Int!
  }

  input UpdateGameInput {
    userId: Int
    date: DateTime
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
