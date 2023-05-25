import { Link, routes } from '@redwoodjs/router'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { GetCurrentStudents } from 'types/graphql'

export const QUERY = gql`
  query GetCurrentStudents {
    currentStudents {
      id
      firstName
      lastName
      email
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
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>ID#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents?.map((student) => (
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
