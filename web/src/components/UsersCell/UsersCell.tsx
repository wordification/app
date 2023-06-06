import UserList from '../UserList/UserList'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { FindExistingUsers } from 'types/graphql'

export const QUERY = gql`
  query FindExistingUsers {
    users {
      id
      email
      firstName
      lastName
      roles
      teacherId
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ users }: CellSuccessProps<FindExistingUsers>) => {
  return <UserList users={users} />
}
