export const schema = gql`
  type Phoneme {
    id: Int!
    label: String!
  }

  type SortingGameFirstLevel {
    gameId: Int!
    phonemes: [Phoneme!]!
  }

  type SortingGameSecondLevel {
    gameId: Int!
    graphemes: [String!]!
  }

  type Query {
    sortingGameFirstLevel(gameId: Int!): SortingGameFirstLevel! @requireAuth
    sortingGameSecondLevel(gameId: Int!): SortingGameSecondLevel! @requireAuth
  }

  type Mutation {
    sortingGameGradeFirstLevel(gameId: Int!, phoneme: Int!): Boolean!
      @requireAuth
    sortingGameGradeSecondLevel(gameId: Int!, grapheme: String!): Boolean!
      @requireAuth
  }
`
