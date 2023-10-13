export const schema = gql`
  """
  Possible roles for a user.
  """
  enum Role {
    "A user who can only view their own data."
    STUDENT
    "A user who can manage students' data."
    TEACHER
    "A user who can create users and manage users' data."
    ADMINISTRATOR
    "A user who can access student, teacher, and administrator role views."
    SUPERUSER
  }

  """
  A user.
  """
  type User {
    "The unique identifier of a user."
    id: Int!

    "The user's email address (must be unique)."
    email: String!

    "The user's role."
    roles: Role!

    "The ID of the user's teacher if they are a student."
    teacherId: Int

    "The user's first name."
    firstName: String!

    "The user's last name."
    lastName: String!

    "All of the user's games."
    games: [Game!]!

    "The user's teacher if they are a student."
    teacher: User

    "The grade point average of the user if they are a student. This value will range 0-3."
    gpa: Float

    "All of the user's students if they are a teacher."
    students: [User!]

    # Avoid exposing sensitive information like passwords or tokens.

    # "The time at which the user was created."
    # createdAt: DateTime!

    # "The time at which the user was last updated."
    # updatedAt: DateTime!

    # "The user's hashed password."
    # hashedPassword: String!

    # "The salt used to hash the user's password."
    # salt: String!

    # "A reset token for the user's password if generated."
    # resetToken: String

    # "The time at which the reset token expires."
    # resetTokenExpiresAt: DateTime
  }

  """
  Queries for users.
  """
  type Query {
    "Fetch all users."
    users: [User!]! @requireAuth

    "Fetch a user by ID. Can return null if the user doesn't exist."
    user(id: Int!): User @requireAuth

    "Fetch the currently logged in teacher's students."
    currentStudents: [User!] @requireAuth(roles: ["TEACHER", "SUPERUSER"])
  }

  """
  Input for creating a new user.
  """
  input CreateUserInput {
    "The user's first name."
    firstName: String!

    "The user's last name."
    lastName: String!

    "The user's role."
    roles: Role!

    "The ID of the user's teacher if they are a student."
    teacherId: Int

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
  Base input for creating a new user.
  """
  input BaseUserInput {
    "The user's first name."
    firstName: String!

    "The user's last name."
    lastName: String!

    "The user's role."
    roles: Role!

    "The ID of the user's teacher if they are a student."
    teacherId: Int

    "The user's email address (must be unique)."
    email: String!

    "The user's password."
    password: String!
  }

  """
  Input for updating a user.
  """
  input UpdateUserInput {
    "The user's first name."
    firstName: String

    "The user's last name."
    lastName: String

    "The user's role."
    roles: Role

    "The ID of the user's teacher if they are a student."
    teacherId: Int

    "The user's email address (must be unique)."
    email: String

    "The user's new password."
    password: String
  }

  """
  Mutations for users.
  """
  type Mutation {
    "Creates a new user."
    createUser(input: BaseUserInput!): User!
      @requireAuth(roles: ["ADMINISTRATOR", "SUPERUSER"])

    "Deletes an existing user."
    deleteUser(id: Int!): User!
      @requireAuth(roles: ["ADMINISTRATOR", "SUPERUSER"])

    "Updates an existing user."
    updateUser(id: Int!, input: UpdateUserInput!): User!
      @requireAuth(roles: ["TEACHER", "ADMINISTRATOR", "SUPERUSER"])

    "Sends an email to a user."
    emailUser(id: Int!): User!
      @requireAuth(roles: ["ADMINISTRATOR", "SUPERUSER"])
  }
`
