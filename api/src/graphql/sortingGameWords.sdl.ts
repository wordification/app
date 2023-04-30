export const schema = gql`
  type SortingGameWord {
    id: Int!
    wordId: Int!
    word: Word!
    gameId: Int!
    game: Game!
    completed: Boolean!
    current: Boolean!
    testedGrapheme: String!
  }

  type Query {
    sortingGameWords: [SortingGameWord!]! @requireAuth
    sortingGameWord(id: Int!): SortingGameWord @requireAuth
  }

  input CreateSortingGameWordInput {
    wordId: Int!
    gameId: Int!
    completed: Boolean
    current: Boolean
    testedGrapheme: String!
  }

  input UpdateSortingGameWordInput {
    wordId: Int
    gameId: Int
    completed: Boolean
    current: Boolean
    testedGrapheme: String
  }

  type Mutation {
    createSortingGameWord(input: CreateSortingGameWordInput!): SortingGameWord!
      @requireAuth
    updateSortingGameWord(
      id: Int!
      input: UpdateSortingGameWordInput!
    ): SortingGameWord! @requireAuth
    deleteSortingGameWord(id: Int!): SortingGameWord! @requireAuth
  }
`
