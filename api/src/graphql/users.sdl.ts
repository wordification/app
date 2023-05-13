export const schema = gql`
  """
  A user.
  """
  type User {
    "The unique identifier of a user."
    id: Int!

    "The user's email address (must be unique)."
    email: String!

    "The user's first name."
    firstName: String!

    "The user's last name."
    lastName: String!

    "The user's hashed password."
    hashedPassword: String!

    "The salt used to hash the user's password."
    salt: String!

    "A reset token for the user's password if generated."
    resetToken: String

    "The time at which the reset token expires."
    resetTokenExpiresAt: DateTime

    "All of the user's games."
    games: [Game!]!
  }

  """
  Queries for users.
  """
  type Query {
    "Fetch all users."
    users: [User!]! @requireAuth

    "Fetch a user by ID. Can return null if the user doesn't exist."
    user(id: Int!): User @requireAuth
  }

  """
  Input for creating a new user.
  """
  input CreateUserInput {
    "The user's email address (must be unique)."
    email: String!

    "The user's hashed password."
    hashedPassword: String!

    "The salt used to hash the user's password."
    salt: String!

    "A reset token for the user's password (if generated)."
    resetToken: String

    "The time at which the reset token expires."
    resetTokenExpiresAt: DateTime
  }

  """
  Input for updating a user.
  """
  input UpdateUserInput {
    "The user's email address (must be unique)."
    email: String

    "The user's hashed password."
    hashedPassword: String

    "The salt used to hash the user's password."
    salt: String

    "A reset token for the user's password if generated."
    resetToken: String

    "The time at which the reset token expires."
    resetTokenExpiresAt: DateTime
  }
`
