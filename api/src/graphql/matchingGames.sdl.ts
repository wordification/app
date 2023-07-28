export const schema = gql`
  """
  Audio interface for a matching game.
  """
  interface Audio {
    "An array of audio file paths."
    audio: [String!]
  }

  """
  The intro to the first level of the matching game.
  Play first is matching the correct phonemes.
  """
  type MatchingGamePlayLevel implements Audio {
    "The game that this intro is for."
    game: Game!
    "The phonemes that are being tested in this game."
    incompleteWords: [Word!]!
    "An array of audio file paths."
    audio: [String!]
    "An array of phonemes being used in this game."
    phonemes: [Phoneme!]!
  }

  """
  Queries for matching games.
  """
  type Query {
    """
    Fetch the intro to the first level of the matching game.
    First level is matching the correct phonemes.
    """
    matchingGamePlayLevel(gameId: Int!): MatchingGamePlayLevel! @requireAuth

    """
    Fetch the audio file of a given word.
    """
    readWord(word: String!): [String!] @requireAuth
  }

  """
  The response after grading the matching game.
  """
  type MatchingGameGradeResponse implements Audio {
    "If the answer was correct."
    correct: Boolean!
    "An array of audio file paths."
    audio: [String!]
  }

  """
  Mutations for matching games.
  """
  type Mutation {
    """
    Grade the matching game.
    """
    matchingGameGrade(
      "The game that is being graded."
      gameId: Int!
      "The first word that was selected."
      firstWordId: Int!
      "The second word that was selected."
      secondWordId: Int!
    ): MatchingGameGradeResponse! @requireAuth

    """
    Grade the grouping matching game.
    """
    groupingMatchingGameGrade(
      "The game that is being graded."
      gameId: Int!
      "The first word that was selected."
      wordId: Int!
    ): MatchingGameGradeResponse! @requireAuth
  }
`
