import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useRef, useState } from 'react'

import { useAuth } from 'src/auth'

const ResetPasswordPage = ({ resetToken }: { resetToken: string }) => {
  const {
    isAuthenticated,
    reauthenticate,
    validateResetToken,
    resetPassword,
    loading,
  } = useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [resetToken, validateResetToken])

  const passwordRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    passwordRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Password" />

      <Form onSubmit={onSubmit} className="card-body">
        <h1 className="card-title">Reset Password</h1>
        <div className="form-control">
          <Label name="password" className="label">
            <span className="label-text">New Password</span>
          </Label>
          <PasswordField
            name="password"
            className="input-bordered input"
            errorClassName="input-bordered input input-error"
            autoComplete="new-password"
            placeholder="********"
            disabled={!enabled}
            ref={passwordRef}
            validation={{
              required: {
                value: true,
                message: 'New Password is required',
              },
            }}
          />

          <FieldError name="password" className="text-sm text-error" />
        </div>

        <Submit className={`btn-primary btn my-2 ${loading ? 'loading' : ''}`}>
          Submit
        </Submit>
      </Form>
    </>
  )
}

export default ResetPasswordPage
