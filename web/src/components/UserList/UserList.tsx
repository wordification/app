import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { truncate } from 'src/lib/formatters'

import { QUERY } from '../UsersCell/UsersCell'

import type { FindExistingUsers, Role } from 'types/graphql'

type ExistingUser = {
  id: number
  email: string
  firstName: string
  lastName: string
  roles: Role
}

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UserList = ({ users }: FindExistingUsers) => {
  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    onCompleted: () => {
      toast.success('User Deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (user: ExistingUser) => {
    if (
      confirm(
        'Are you sure you want to delete user\nID: ' +
          user.id +
          '\nEmail: ' +
          user.email +
          '\nName: ' +
          user.lastName +
          ', ' +
          user.firstName
      )
    ) {
      deleteUser({ variables: { id: user.id } })
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>&nbsp;</th>
            <th>ID</th>
            <th>Email</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <button
                  type="button"
                  title={'Delete user ' + user.id}
                  className="btn-outline btn-error btn-xs btn"
                  onClick={() => onDeleteClick(user)}
                >
                  Delete
                </button>
              </td>
              <td>{truncate(user.id)}</td>
              <td>{truncate(user.email)}</td>
              <td>{truncate(user.lastName)}</td>
              <td>{truncate(user.firstName)}</td>
              <td>{truncate(user.roles)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
