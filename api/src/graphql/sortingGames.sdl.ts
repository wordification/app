export const schema = gql`
  type Phoneme {
    id: Int!
    label: String!
  }

  type SortingGameFirstLevel {
    gameId: Int!
    phonemes: [Phoneme!]!
    audio: [String!]
  }

  type SortingGameSecondLevel {
    gameId: Int!
    graphemes: [String!]!
    audio: [String!]
  }

  type Query {
    sortingGameFirstLevel(gameId: Int!): SortingGameFirstLevel! @requireAuth
    sortingGameSecondLevel(gameId: Int!): SortingGameSecondLevel! @requireAuth
  }

  type SortingGameGradeResponse {
    correct: Boolean!
    audio: [String!]
  }

  type Mutation {
    sortingGameGradeFirstLevel(
      gameId: Int!
      phoneme: Int!
    ): SortingGameGradeResponse! @requireAuth
    sortingGameGradeSecondLevel(
      gameId: Int!
      grapheme: String!
    ): SortingGameGradeResponse! @requireAuth
    sortingGameGradeThirdLevel(
      gameId: Int!
      entry: String!
    ): SortingGameGradeResponse! @requireAuth
  }
`
