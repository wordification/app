export const schema = gql`
  """
  The response after grading the matching game.
  """
  type MatchingGameGradeResponse {
    "The game associated with the response."
    game: Game!
    "If the answer was correct."
    correct: Boolean!
    "The first word selected."
    firstWord: Word!
    "The second word selected."
    secondWord: Word!
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
  }
`
