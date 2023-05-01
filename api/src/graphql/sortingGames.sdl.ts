export const schema = gql`
  type Phoneme {
    id: Int!
    label: String!
  }

  type SortingGameFirstLevel {
    phonemes: [Phoneme!]!
  }

  type Query {
    sortingGameFirstLevel(gameId: Int!): SortingGameFirstLevel! @requireAuth
  }

  input SortingGameGradeFirstLevelInput {
    phoneme: Int!
  }

  type Mutation {
    sortingGameGradeFirstLevel(
      id: Int!
      input: SortingGameGradeFirstLevelInput!
    ): Boolean! @requireAuth
  }
`
