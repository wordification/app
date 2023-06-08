export const schema = gql`
  """
  Game rules set for an individual student.
  """
  type GameRulesToUser {
    "The unique identifier of the game rules for a user."
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
    phonemes: [Int]!

    "The unique identifier of the user the game rules are associated with."
    userId: Int!

    "The user who is associated with the game rules set by a teacher."
    user: User!
  }

  """
  Queries for GameRulesToUser.
  """
  type Query {
    "Fetch all game rules to all users."
    gameRulesToUsers: [GameRulesToUser!]! @requireAuth

    "Fetch a set of game rules belonging to a provided user by ID."
    gameRulesToUser(id: Int!): GameRulesToUser
      @requireAuth(roles: ["TEACHER", "SUPERUSER"])
  }

  """
  Input for creating game rules.
  """
  input CreateGameRulesToUserInput {
    "The number of words per phoneme in a game."
    wordsPerPhoneme: Int!

    "The phonemes in a game."
    phonemes: [Int]!

    "The user the game rule is associated to."
    userId: Int!
  }

  """
  Input for updating game rules.
  """
  input UpdateGameRulesToUserInput {
    "The number of words per phoneme in a game."
    wordsPerPhoneme: Int

    "The phonemes in a game."
    phonemes: [Int]!

    "The user the game rule is associated to."
    userId: Int
  }

  """
  Mutations for game rules.
  """
  type Mutation {
    "Creates a game rule."
    createGameRulesToUser(input: CreateGameRulesToUserInput!): GameRulesToUser!
      @requireAuth

    "Updates a game rule."
    updateGameRulesToUser(
      id: Int!
      input: UpdateGameRulesToUserInput!
    ): GameRulesToUser! @requireAuth

    "Deletes a game rule."
    deleteGameRulesToUser(id: Int!): GameRulesToUser! @requireAuth
  }
`
