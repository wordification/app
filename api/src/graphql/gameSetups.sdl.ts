export const schema = gql`
  """
  Game setups set for an individual student.
  """
  type GameSetup {
    "The unique identifier of the game setups for a user."
    id: Int!

    "The time at which the game was created."
    createdAt: DateTime!

    "The time at which the game was last updated."
    updatedAt: DateTime!

    """
    The number of words played per phoneme or grapheme.
    The actual number of words played will be this
    number times the number of phonemes or graphemes, or less
    if there are not enough words.
    """
    wordsPerUnit: Int!

    "The phonemes to test the user on."
    phonemes: [Int!]!

    "The graphemes to test the user on."
    graphemes: [String!]!

    "The size and configuration of the cards for a matching game."
    matchingBoardSize: Int!

    "The style of matching game."
    matchingGameType: MatchingGameType!

    "The unique identifier of the user the game setups are associated with."
    userId: Int!

    "The user who is associated with the game setups set by a teacher."
    user: User!
  }

  """
  Possible matching game types.
  """
  enum MatchingGameType {
    """
    A game where a user must match two words with the same phoneme.
    """
    MEMORY

    """
    A game where a user must select all words with a given phoneme.
    """
    GROUPING
  }

  """
  Queries for GameSetup.
  """
  type Query {
    "Fetch all game setups to all users."
    gameSetups: [GameSetup!]! @requireAuth

    "Fetch a set of game setups belonging to a provided user by ID."
    gameSetup(id: Int!): GameSetup @requireAuth
  }

  """
  Input for creating game setups.
  """
  input CreateGameSetupInput {
    "The number of words per phoneme or grapheme in a game."
    wordsPerUnit: Int!

    "The size of a board for matching game."
    matchingBoardSize: Int!

    "The phonemes in a game."
    phonemes: [Int!]!

    "The graphemes in a game."
    graphemes: [String!]!

    "The style of matching game."
    matchingGameType: MatchingGameType!

    "The user the game setup is associated to."
    userId: Int!
  }

  """
  Input for updating game setups.
  """
  input UpdateGameSetupInput {
    "The number of words per phoneme or grapheme in a game."
    wordsPerUnit: Int!

    "The size of a board for matching game."
    matchingBoardSize: Int!

    "The style of matching game."
    matchingGameType: MatchingGameType!

    "The phonemes in a game."
    phonemes: [Int!]!

    "The graphemes in a game."
    graphemes: [String!]!

    "The user the game setup is associated to."
    userId: Int!
  }

  """
  Input for upserting game setups.
  """
  input UpsertGameSetupInput {
    "The number of words per phoneme or grapheme in a game."
    wordsPerUnit: Int

    "The size of a board for matching game."
    matchingBoardSize: Int

    "The style of matching game."
    matchingGameType: MatchingGameType

    "The phonemes in a game."
    phonemes: [Int]

    "The graphemes in a game."
    graphemes: [String]
  }

  """
  Mutations for game setups.
  """
  type Mutation {
    "Creates a game setup."
    createGameSetup(input: CreateGameSetupInput!): GameSetup!
      @requireAuth(roles: ["TEACHER", "SUPERUSER"])

    "Updates a game setup."
    updateGameSetup(id: Int!, input: UpdateGameSetupInput!): GameSetup!
      @requireAuth(roles: ["TEACHER", "SUPERUSER"])

    "Upserts a game setup."
    upsertGameSetup(
      input: UpsertGameSetupInput!
      studentId: Int
    ): [GameSetup!]! @requireAuth(roles: ["TEACHER", "SUPERUSER"])

    "Deletes a game setup."
    deleteGameSetup(id: Int!): GameSetup!
      @requireAuth(roles: ["TEACHER", "SUPERUSER"])
  }
`
