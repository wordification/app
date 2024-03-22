export const schema = gql`
  """
  Audio interface for a building game.
  """
  interface Audio {
    "An array of audio file paths."
    audio: [String!]
  }

  """
  The intro to the first level of the building game.
  Play first is building the correct phonemes.
  """
  type BuildingGamePlayLevel implements Audio {
    "The game that this intro is for."
    game: Game!
    "An array of audio file paths."
    audio: [String!]
    "Current word being tested without the onset."
    choppedWord: String!
    "An array of all onsets in this game."
    onsList: [String!]!
  }

  """
  Queries for building games.
  """
  type Query {
    """
    Fetch the intro to the play level of the building game.
    """
    buildingGamePlayLevel(gameId: Int!): BuildingGamePlayLevel! @requireAuth
  }

  """
  The response after grading the building game.
  """
  type BuildingGameGradeResponse implements Audio {
    "If the answer was correct."
    correct: Boolean!
    "An array of audio file paths."
    audio: [String!]
  }

  """
  Mutations for building games. !!! EDIT / ADD
  """
  type Mutation {
    """
    Grade the building game.
    """
    buildingGameGrade(
      "The game that is being graded."
      gameId: Int!
      "Entry that was selected"
      ons: String!
    ): BuildingGameGradeResponse! @requireAuth
  }
`
