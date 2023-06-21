import {
  Form,
  FormError,
  Label,
  TextField,
  FieldError,
  EmailField,
  SelectField,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useState } from 'react'

import { QUERY } from '../UserCell/UserCell'

import type {
  Role,
  UpdateUserInput,
  UpdateUserMutation,
  FindUserById,
} from 'types/graphql'

type UpdateUserFormProps = {
  id: number
}

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const UpdateUserForm = ({ id }: UpdateUserFormProps) => {
  const { data } = useQuery<FindUserById>(QUERY, {
    variables: { id },
  })

  const [updateUser, { loading, error }] = useMutation<UpdateUserMutation>(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('User Updated')
        navigate(routes.modifyUser())
      },
      onError: (error) => {
        toast.error(error?.message ?? '')
      },
    }
  )

  const user = data?.user

  const [role, setRole] = useState<Role | undefined>()
  useEffect(() => {
    if (user?.roles) {
      setRole(user.roles)
    }
  }, [user])

  if (!user) {
    return null
  }

  const onSubmit = (data: UpdateUserInput) => {
    updateUser({ variables: { id: user.id, input: data } })
  }

  return (
    <div className="w-full max-w-md">
      <Form<UpdateUserInput>
        className="mt-10"
        onSubmit={onSubmit}
        error={error}
        config={{ mode: 'onBlur' }}
      >
        <FormError
          error={error}
          wrapperClassName="card card-body bg-base-300"
          titleClassName="font-bold text-error"
          listClassName="list-disc list-inside text-sm"
        />
        <div className="flex flex-row space-x-2">
          <div className="mb-4">
            <Label name="firstName" className="mb-2 text-sm font-bold">
              First Name
            </Label>
            <TextField
              name="firstName"
              defaultValue={user.firstName}
              className="input-bordered input w-full max-w-xs"
              validation={{
                required: {
                  value: true,
                  message: 'First name is required.',
                },
              }}
            />
            <FieldError name="firstName" className="text-error" />
          </div>
          <div className="mb-4">
            <Label name="lastName" className="text-sm font-bold">
              Last Name
            </Label>
            <TextField
              name="lastName"
              defaultValue={user.lastName}
              className="input-bordered input w-full max-w-xs"
              validation={{
                required: {
                  value: true,
                  message: 'Last name is required.',
                },
              }}
            />
            <FieldError name="lastName" className="text-error" />
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <Label name="email" className="text-sm font-bold">
            Email
          </Label>
          <EmailField
            name="email"
            defaultValue={user.email}
            className="input-bordered input w-full max-w-xs"
            autoComplete="off"
            validation={{
              required: {
                value: true,
                message: 'Email is required.',
              },
              pattern: {
                value: /^[^@]+@[^.]+\..+$/,
                message: 'Please enter a valid email address',
              },
            }}
          />
          <FieldError name="email" className="text-error" />
        </div>
        <div className="mb-4 flex flex-col">
          <Label name="roles" className="text-sm font-bold">
            Role
          </Label>
          <SelectField
            name="roles"
            defaultValue={user.roles}
            className="select-bordered select w-full max-w-xs"
            validation={{
              required: {
                value: true,
                message: 'A role is required.',
              },
              validate: {
                matchesInitialValue: (value: string) => {
                  return value !== '--Select a role--'
                },
              },
            }}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setRole(e.target.value as Role)
            }}
            defaultChecked
          >
            <option>--Select a role--</option>
            <option>STUDENT</option>
            <option>TEACHER</option>
            <option>ADMINISTRATOR</option>
          </SelectField>
          <FieldError name="roles" className="text-error" />
        </div>
        {role === 'STUDENT' && (
          <div className="mb-4 flex flex-col">
            <Label name="teacherId" className="text-sm font-bold">
              Teacher ID
            </Label>
            <NumberField
              name="teacherId"
              defaultValue={user.teacherId ?? ''}
              className="input-bordered input w-full max-w-xs"
              validation={
                role === 'STUDENT'
                  ? {
                      valueAsNumber: true,
                      required: {
                        value: true,
                        message: 'Teacher ID is required.',
                      },
                    }
                  : {}
              }
            />
            <FieldError name="teacherId" className="text-error" />
          </div>
        )}

        <Submit className="btn-primary btn" disabled={loading}>
          Sumbit
        </Submit>
      </Form>
    </div>
  )
}

export default UpdateUserForm
