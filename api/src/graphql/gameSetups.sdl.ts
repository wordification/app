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
    The number of words played per phoneme.
    The actual number of words played will be this
    number times the number of phonemes, or less
    if there are not enough words.
    """
    wordsPerPhoneme: Int!

    "The phonemes to test the user on."
    phonemes: [Int!]!

    "The unique identifier of the user the game setups are associated with."
    userId: Int!

    "The user who is associated with the game setups set by a teacher."
    user: User!
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
    "The number of words per phoneme in a game."
    wordsPerPhoneme: Int!

    "The phonemes in a game."
    phonemes: [Int]!

    "The user the game setup is associated to."
    userId: Int!
  }

  """
  Input for updating game setups.
  """
  input UpdateGameSetupInput {
    "The number of words per phoneme in a game."
    wordsPerPhoneme: Int

    "The phonemes in a game."
    phonemes: [Int]!

    "The user the game setup is associated to."
    userId: Int
  }

  """
  Input for upserting game setups.
  """
  input UpsertGameSetupInput {
    "The number of words per phoneme in a game."
    wordsPerPhoneme: Int

    "The phonemes in a game."
    phonemes: [Int]
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
