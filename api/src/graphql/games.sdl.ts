export const schema = gql`
  """
  A base game. Can be used for any game type.
  """
  type Game {
    "The unique identifier of a game."
    id: Int!

    "The ID of the user who is playing the game."
    userId: Int!

    "The time at which the game was created."
    createdAt: DateTime!

    "The time at which the game was last updated."
    updatedAt: DateTime!

    "The type of game."
    type: GameType!

    "The style of matching game."
    matchingGameType: MatchingGameType

    """
    The number of words played per phoneme.
    The actual number of words played will be this
    number times the number of phonemes, or less
    if there are not enough words.
    """
    wordsPerPhoneme: Int!

    "The phonemes to test the user on."
    phonemes: [Int!]!

    """
    The current level of the game. Levels are unique
    to each game type, but all start at 1.
    """
    level: Int!

    "If the game is complete."
    complete: Boolean!

    "The current word being played."
    currentWordId: Int

    "The current phoneme for a grouping matching game"
    currentPhonemeId: Int

    "The number of incorrect guesses the user has made."
    incorrectGuesses: Int!

    "The user who is playing the game."
    user: User!

    "The current word being played. Can be null if the game is complete."
    currentWord: Word

    "All of the words played in the game."
    allWords: [Word!]!

    "All of the words that have not been played in the game."
    incompleteWords: [Word!]!
  }

  """
  Possible game types.
  """
  enum GameType {
    """
    A game where a user is given a word and must select the correct category.
    """
    SORTING
    """
    A game where a user must match two words with the same phoneme.
    """
    MATCHING
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
  Queries for games.
  """
  type Query {
    "Fetch all games belonging to the current user."
    games(
      """
      Fetch only complete or only incomplete games.
      If complete is not defined, fetch all games.
      """
      complete: Boolean

      """
      Fetch only a given type of game.
      """
      type: GameType
    ): [Game!]! @requireAuth

    "Fetch a game by ID. Can return null if the game doesn't exist."
    game(id: Int!): Game @requireAuth

    "Fetch games for a user by userId."
    userGames(userId: Int!): [Game!]! @requireAuth
  }

  """
  Input for creating a new game.
  """
  input CreateGameInput {
    "The type of game."
    type: GameType!

    "The number of words played per phoneme. The actual number of words played will be this number times the number of phonemes, or less if there are not enough words."
    wordsPerPhoneme: Int

    "The phonemes to test the user on."
    phonemes: [Int!]

    "The current word being played."
    currentWordId: Int

    "The current phoneme for a grouping matching game"
    currentPhonemeId: Int

    "The style of matching game."
    matchingGameType: MatchingGameType
  }

  """
  Mutations for games.
  """
  type Mutation {
    "Creates a new game."
    createGame(input: CreateGameInput!): Game! @requireAuth

    "Deletes an existing game."
    deleteGame(id: Int!): Game! @requireAuth(roles: ["TEACHER", "SUPERUSER"])
  }
`
