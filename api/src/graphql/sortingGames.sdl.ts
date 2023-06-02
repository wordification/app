export const schema = gql`
  """
  Audio interface for a sorting game.
  """
  interface Audio {
    "An array of audio file paths."
    audio: [String!]
  }

  """
  A sorting game phoneme.
  """
  type Phoneme {
    "The numeric representation of the phoneme (e.g. 49)."
    id: Int!
    "A label for the phoneme (e.g. 'Long I')."
    label: String!
  }

  """
  The intro to the first level of the sorting game.
  First level is identifying the correct phoneme.
  """
  type SortingGameFirstLevel implements Audio {
    "The game that this intro is for."
    game: Game!
    "The phonemes that are being tested in this game."
    phonemes: [Phoneme!]!
    "An array of audio file paths."
    audio: [String!]
  }

  """
  The intro to the second level of the sorting game.
  Second level is identifying the correct grapheme.
  """
  type SortingGameSecondLevel implements Audio {
    "The game that this intro is for."
    game: Game!
    "The graphemes that are being tested in this game."
    graphemes: [String!]!
    "An array of audio file paths."
    audio: [String!]
  }

  """
  The intro to the third level of the sorting game.
  Third level is spelling the word.
  """
  type SortingGameThirdLevel implements Audio {
    "The game that this intro is for."
    game: Game!
    "The word that is being tested in this game."
    audio: [String!]
  }

  """
  Queries for sorting games.
  """
  type Query {
    """
    Fetch the intro to the first level of the sorting game.
    First level is identifying the correct phoneme.
    """
    sortingGameFirstLevel(gameId: Int!): SortingGameFirstLevel! @requireAuth
    """
    Fetch the intro to the second level of the sorting game.
    Second level is identifying the correct grapheme.
    """
    sortingGameSecondLevel(gameId: Int!): SortingGameSecondLevel! @requireAuth
    """
    Fetch the intro to the third level of the sorting game.
    Third level is spelling the word.
    """
    sortingGameThirdLevel(gameId: Int!): SortingGameThirdLevel! @requireAuth
  }

  """
  The status of the answer submitted.
  """
  enum SortingGameGradeStatus {
    "The answer was correct."
    CORRECT
    "The answer was incorrect."
    INCORRECT
    "Too many incorrect guesses were made."
    TOO_MANY_INCORRECT_GUESSES
  }

  """
  The response after grading the sorting game.
  """
  type SortingGameGradeResponse implements Audio {
    "The status of the answer submitted."
    status: SortingGameGradeStatus!
    "A prompt if the answer was incorrect."
    audio: [String!]
  }

  """
  Mutations for sorting games.
  """
  type Mutation {
    """
    Grade the first level of the sorting game.
    """
    sortingGameGradeFirstLevel(
      gameId: Int!
      "The phoneme that was selected."
      phoneme: Int!
    ): SortingGameGradeResponse! @requireAuth
    """
    Grade the second level of the sorting game.
    """
    sortingGameGradeSecondLevel(
      gameId: Int!
      "The grapheme that was selected."
      grapheme: String!
    ): SortingGameGradeResponse! @requireAuth
    """
    Grade the third level of the sorting game.
    """
    sortingGameGradeThirdLevel(
      gameId: Int!
      "The word that was typed."
      entry: String!
    ): SortingGameGradeResponse! @requireAuth
  }
`
