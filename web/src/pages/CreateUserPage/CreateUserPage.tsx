import {
  EmailField,
  FieldError,
  Form,
  FormError,
  Label,
  NumberField,
  PasswordField,
  SelectField,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import type { BaseUserInput, CreateUserMutation } from 'types/graphql'

const CREATE_USER_MUTATION = gql`
  mutation CreateUserMutation($input: BaseUserInput!) {
    createUser(input: $input) {
      id
      firstName
      lastName
      email
    }
  }
`

const CreateUserPage = () => {
  const formMethods = useForm<BaseUserInput>()

  const [createUser, { loading, error }] = useMutation<CreateUserMutation>(
    CREATE_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('User Created')
        formMethods.reset()
      },
      onError: (error) => {
        toast.error(error?.message ?? '')
      },
    }
  )

  const [role, setRole] = useState('')

  const onSubmit = (data: BaseUserInput) => {
    createUser({ variables: { input: data } })
  }

  return (
    <>
      <MetaTags title="CreateUser" description="CreateUser page" />
      <h1 className="text-2xl font-bold">Create New User</h1>

      <div className="w-full max-w-md">
        <Form<BaseUserInput>
          className="mt-10"
          onSubmit={onSubmit}
          error={error}
          formMethods={formMethods}
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
            <Label name="password" className="text-sm font-bold">
              Password
            </Label>
            <PasswordField
              name="password"
              className="input-bordered input w-full max-w-xs"
              autoComplete="new-password"
              validation={{
                required: {
                  value: true,
                  message: 'Password is required.',
                },
              }}
            />
            <FieldError name="password" className="text-error" />
          </div>
          <div className="mb-4 flex flex-col">
            <Label name="roles" className="text-sm font-bold">
              Role
            </Label>
            <SelectField
              name="roles"
              className="select-bordered select w-full max-w-xs"
              validation={{
                required: {
                  value: true,
                  message: 'A role is required.',
                },
                validate: {
                  matchesInitialValue: (value) => {
                    return value !== '--Select a role--'
                  },
                },
              }}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setRole(e.target.value)
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
    </>
  )
}

export default CreateUserPage
