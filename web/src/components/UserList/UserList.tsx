import { Form, Label, SelectField, Submit, TextField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { truncate } from 'src/lib/formatters'

import { QUERY } from '../UsersCell/UsersCell'

import type { FindExistingUsers, Role } from 'types/graphql'

export type ExistingUser = {
  id: number
  email: string
  firstName: string
  lastName: string
  roles: Role
  teacherId?: number | null
}

type SearchUserListInput = {
  searchString: string
  searchField: string
}

const DELETE_USER_MUTATION = gql`
  mutation DeleteUserMutation($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`

const UserList = ({ users }: FindExistingUsers) => {
  const formMethods = useForm<SearchUserListInput>()

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

  const [displayUsers, setDisplayUsers] = useState(users)

  useEffect(() => {
    setDisplayUsers(displayUsers)
  }, [displayUsers])

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

  const onSearch = (data: SearchUserListInput) => {
    data.searchString = data.searchString.toLowerCase()
    switch (data.searchField) {
      case 'ID':
        setDisplayUsers(
          users.filter((user) => user.id.toString().includes(data.searchString))
        )
        break
      case 'Email':
        setDisplayUsers(
          users.filter((user) =>
            user.email.toLowerCase().includes(data.searchString)
          )
        )
        break
      case 'Last Name':
        setDisplayUsers(
          users.filter((user) =>
            user.lastName.toLowerCase().includes(data.searchString)
          )
        )
        break
      case 'First Name':
        setDisplayUsers(
          users.filter((user) =>
            user.firstName.toLowerCase().includes(data.searchString)
          )
        )
        break
      case 'Role':
        setDisplayUsers(
          users.filter((user) =>
            user.roles.toLowerCase().includes(data.searchString)
          )
        )
        break
      case 'Teacher ID':
        setDisplayUsers(
          users.filter((user) =>
            user.teacherId?.toString().includes(data.searchString)
          )
        )
        break
      default:
        setDisplayUsers(
          users.filter(
            (user) =>
              user.id.toString().includes(data.searchString) ||
              user.email.includes(data.searchString) ||
              user.firstName.includes(data.searchString) ||
              user.lastName.includes(data.searchString) ||
              user.roles.includes(data.searchString) ||
              user.teacherId?.toString().includes(data.searchString)
          )
        )
    }
  }

  const resetFilters = () => {
    setDisplayUsers(users)
    formMethods.reset()
  }

  return (
    <>
      <Form<SearchUserListInput> onSubmit={onSearch} formMethods={formMethods}>
        <div className="mb-2 mt-2 flex flex-row">
          <button className="btn-primary btn mr-4 mt-6" onClick={resetFilters}>
            Reset
          </button>
          <div className="form-control mr-1 w-full max-w-xs">
            <Label className="mb-1 text-sm font-bold" name="searchString">
              Search for:
            </Label>
            <TextField
              name="searchString"
              placeholder="Type here"
              className="input-bordered input-secondary input w-full max-w-xs"
            />
          </div>
          <div className="form-control mr-2 w-full max-w-xs">
            <Label className="mb-1 text-sm font-bold" name="searchField">
              On field:
            </Label>
            <SelectField
              className="select-secondary select w-full max-w-xs"
              defaultChecked
              name="searchField"
            >
              <option>All fields</option>
              <option>ID</option>
              <option>Email</option>
              <option>Last Name</option>
              <option>First Name</option>
              <option>Role</option>
              <option>Teacher ID</option>
            </SelectField>
          </div>
          <Submit className="btn-primary btn mt-6">Sumbit</Submit>
        </div>
      </Form>
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
              <th>Teacher ID</th>
            </tr>
          </thead>
          <tbody>
            {displayUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <nav className="btn-group">
                    {user.roles !== 'SUPERUSER' && (
                      <Link
                        to={routes.updateUser({ id: user.id })}
                        title={'Update User ' + user.id}
                        className="btn-outline btn-primary btn-xs btn mr-1"
                      >
                        Update
                      </Link>
                    )}
                    {user.roles !== 'SUPERUSER' && (
                      <button
                        type="button"
                        title={'Delete User ' + user.id}
                        className="btn-outline btn-error btn-xs btn"
                        onClick={() => onDeleteClick(user)}
                      >
                        Delete
                      </button>
                    )}
                  </nav>
                </td>
                <td>{truncate(user.id)}</td>
                <td>{truncate(user.email)}</td>
                <td>{truncate(user.lastName)}</td>
                <td>{truncate(user.firstName)}</td>
                <td>{truncate(user.roles)}</td>
                <td>{truncate(user.teacherId ?? 'n/a')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default UserList