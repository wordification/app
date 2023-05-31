import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { FindUserById, FindUserByIdVariables } from 'types/graphql'

export const QUERY = gql`
  query FindUserById($id: Int!) {
    user: user(id: $id) {
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

export const Empty = () => <div>This user does not exist!</div>

export const Failure = ({ error }: CellFailureProps<FindUserByIdVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  user,
}: CellSuccessProps<FindUserById, FindUserByIdVariables>) => {
  return <div>{JSON.stringify(user)}</div>
}
