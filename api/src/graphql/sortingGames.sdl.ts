export const schema = gql`
  interface Audio {
    audio: [String!]
  }
  type Phoneme {
    id: Int!
    label: String!
  }

  type SortingGameFirstLevel implements Audio {
    gameId: Int!
    phonemes: [Phoneme!]!
    audio: [String!]
  }

  type SortingGameSecondLevel implements Audio {
    gameId: Int!
    graphemes: [String!]!
    audio: [String!]
  }

  type SortingGameThirdLevel implements Audio {
    gameId: Int!
    audio: [String!]
  }

  type Query {
    sortingGameFirstLevel(gameId: Int!): SortingGameFirstLevel! @requireAuth
    sortingGameSecondLevel(gameId: Int!): SortingGameSecondLevel! @requireAuth
    sortingGameThirdLevel(gameId: Int!): SortingGameThirdLevel! @requireAuth
  }

  type SortingGameGradeResponse implements Audio {
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
