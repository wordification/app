import {
  FieldError,
  Form,
  FormError,
  Label,
  PasswordField,
  Submit,
  TextField,
  useForm,
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import type { UpdateUserInput, UpdateUserMutation } from 'types/graphql'

type DirectPasswordResetProps = {
  id: string
}

type FormPassword = UpdateUserInput & {
  /** Re-type password to confirm */
  confirmPassword?: string
}

const UPDATE_USER_MUTATION = gql`
  mutation UpdateUserMutation($id: Int!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`

const DirectPasswordReset = ({ id }: DirectPasswordResetProps) => {
  const formMethods = useForm<FormPassword>()

  const [updateUser, { loading, error }] = useMutation<UpdateUserMutation>(
    UPDATE_USER_MUTATION,
    {
      onCompleted: () => {
        toast.success('Password Updated')
        formMethods.reset()
      },
      onError: (error) => {
        toast.error(error?.message ?? '')
      },
    }
  )

  const onSubmit = (data: FormPassword) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Passwords must match.')
      return
    }

    const { password } = data
    updateUser({ variables: { id: parseInt(id), input: { password } } })
  }

  return (
    <div className="w-full max-w-md">
      <Form<FormPassword>
        className="mt-10"
        formMethods={formMethods}
        onSubmit={onSubmit}
        error={error}
      >
        <FormError
          error={error}
          wrapperClassName="card card-body bg-base-300"
          titleClassName="font-bold text-error"
          listClassName="list-disc list-inside text-sm"
        />
        <div className="flex flex-col">
          <div className="hidden">
            <Label name="username" className="mb-2 text-sm font-bold">
              Username
            </Label>
            <TextField
              name="username"
              aria-hidden="true"
              className="input-bordered input w-full max-w-xs"
              autoComplete="username"
              tabIndex={-1}
            />
          </div>
          <div className="mb-4 flex flex-col">
            <Label name="password" className="mb-2 text-sm font-bold">
              New Password
            </Label>
            <PasswordField
              name="password"
              className="input-bordered input w-full max-w-xs"
              autoComplete="new-password"
              validation={{
                required: {
                  value: true,
                  message: 'Please enter a new password.',
                },
              }}
            />
            <FieldError name="password" className="text-error" />
          </div>
          <div className="mb-4 flex flex-col">
            <Label name="confirmPassword" className="text-sm font-bold">
              Re-Enter Password
            </Label>
            <PasswordField
              name="confirmPassword"
              className="input-bordered input w-full max-w-xs"
              autoComplete="new-password"
              validation={{
                required: {
                  value: true,
                  message: 'Please re-enter your new password.',
                },
              }}
            />
            <FieldError name="confirmPassword" className="text-error" />
          </div>
        </div>

        <Submit className="btn-primary btn" disabled={loading}>
          Sumbit
        </Submit>
      </Form>
    </div>
  )
}

export default DirectPasswordReset
