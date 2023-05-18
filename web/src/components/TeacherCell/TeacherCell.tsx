import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { GetTeacher } from 'types/graphql'

export const QUERY = gql`
  query GetTeacher {
    teacher {
      students {
        id
        firstName
        lastName
        email
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No students found!</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ teacher }: CellSuccessProps<GetTeacher>) => {
  return (
    <>
      {teacher.students?.map((student, index) => (
        <tr key={index}>
          <th>{index + 1}</th>
          <td>{student.id}</td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.email}</td>
        </tr>
      ))}
    </>
  )
}
