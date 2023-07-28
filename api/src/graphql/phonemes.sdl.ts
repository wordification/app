export const schema = gql`
  """
  A phoneme.
  """
  type Phoneme {
    "The unique identifier of a word."
    id: Int!

    "The name of the phoneme that corresponds to an ID."
    name: String!

    "The graphemes to be tested on for that phoneme."
    graphemes: [String!]!

    "The time at which the word was created."
    createdAt: DateTime!

    "The time at which the word was last updated."
    updatedAt: DateTime!
  }

  "Queries for phonemes."
  type Query {
    "Fetch all phonemes."
    phonemes: [Phoneme!]! @requireAuth

    "Fetch a phoneme by ID."
    phoneme(id: Int!): Phoneme @requireAuth
  }
`
