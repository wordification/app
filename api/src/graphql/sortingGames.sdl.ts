export const schema = gql`
  type Phoneme {
    id: Int!
    label: String!
  }

  type SortingGameFirstLevel {
    gameId: Int!
    phonemes: [Phoneme!]!
  }

  type Query {
    sortingGameFirstLevel(gameId: Int!): SortingGameFirstLevel! @requireAuth
  }

  type Mutation {
    sortingGameGradeFirstLevel(gameId: Int!, phoneme: Int!): Boolean!
      @requireAuth
  }
`
