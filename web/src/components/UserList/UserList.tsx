import { Form, Label, SelectField, Submit, TextField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
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

const EMAIL_USER_MUTATION = gql`
  mutation EmailUserMutation($id: Int!) {
    emailUser(id: $id) {
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

  const [emailUser] = useMutation(EMAIL_USER_MUTATION, {
    onCompleted: () => {
      toast.success('Email Sent')
    },
    onError: (error) => {
      toast.error(error.message)
    },
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

  const onEmailClick = (user: ExistingUser) => {
    if (user.roles === 'STUDENT') {
      navigate(
        routes.resetPasswordAdmin({
          id: user.id,
          name: user.lastName + ', ' + user.firstName,
        })
      )
    } else {
      if (confirm(`Send a password reset request to ${user.email}?`)) {
        emailUser({ variables: { id: user.id } })
      }
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
            user.roles.toString().toLowerCase().includes(data.searchString)
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
              user.email.toLowerCase().includes(data.searchString) ||
              user.firstName.toLowerCase().includes(data.searchString) ||
              user.lastName.toLowerCase().includes(data.searchString) ||
              user.roles.toString().toLowerCase().includes(data.searchString) ||
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
          <Submit className="btn-primary btn mt-6">Submit</Submit>
        </div>
      </Form>
      <div className="overflow-x-auto">
        <table className="table-zebra table-xs table w-full lg:table-md">
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
                  <div className="join-vertical join">
                    {user.roles !== 'SUPERUSER' && (
                      <button
                        type="button"
                        title={'Reset Password - User ' + user.id}
                        className="btn-accent btn-outline join-item btn-xs btn mb-1"
                        onClick={() => onEmailClick(user)}
                      >
                        Reset Password
                      </button>
                    )}
                    {user.roles !== 'SUPERUSER' && (
                      <Link
                        to={routes.updateUser({ id: user.id })}
                        title={'Update User ' + user.id}
                        className="btn-primary btn-outline join-item btn-xs btn mb-1"
                      >
                        Update
                      </Link>
                    )}
                    {user.roles !== 'SUPERUSER' && (
                      <button
                        type="button"
                        title={'Delete User ' + user.id}
                        className="btn-outline btn-error join-item btn-xs btn"
                        onClick={() => onDeleteClick(user)}
                      >
                        Delete
                      </button>
                    )}
                    {user.roles === 'SUPERUSER' && (
                      <h2 className="text-error">
                        Superusers cannot be modified!
                      </h2>
                    )}
                  </div>
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
