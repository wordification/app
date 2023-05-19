import { Link, routes } from '@redwoodjs/router'

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
      {teacher.students?.map((student) => (
        <tr key={student.id}>
          <td>
            <Link
              to={routes.studentProfile({ id: student.id })}
              title={'Student Profile ' + student.id}
              className="btn-outline btn-primary btn-xs btn"
            >
              View Student
            </Link>
          </td>
          <td>{student.id}</td>
          <td>{student.firstName}</td>
          <td>{student.lastName}</td>
          <td>{student.email}</td>
          <td>
            {/* <Link
              to={routes.sortingGameIndividual({ id: student.id })}
              title={'View games ' + student.id}
              className="btn-outline btn-primary btn-xs btn"
            >
              View Games
            </Link> */}
          </td>
        </tr>
      ))}
    </>
  )
}
