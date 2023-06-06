import StudentGamesInfoCell from 'src/components/StudentGamesInfoCell'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindStudentProfileById,
  FindStudentProfileByIdVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindStudentProfileById($id: Int!) {
    student: user(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No student found!</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStudentProfileByIdVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  student,
}: CellSuccessProps<
  FindStudentProfileById,
  FindStudentProfileByIdVariables
>) => {
  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">
        {student.firstName} {student.lastName}
      </h1>

      <div className="mb-2 overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>ID#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.email}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <StudentGamesInfoCell userId={student.id} />
    </>
  )
}
