import StudentList from '../StudentList/StudentList'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { GetCurrentStudents } from 'types/graphql'

export const QUERY = gql`
  query GetCurrentStudents {
    currentStudents {
      id
      firstName
      lastName
      email
      gpa
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No students found!</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  currentStudents,
}: CellSuccessProps<GetCurrentStudents>) => {
  return <StudentList currentStudents={currentStudents} />
}
