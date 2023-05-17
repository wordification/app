import { Form, Label, Submit, FieldError, EmailField } from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect, useRef } from 'react'

import { useAuth } from 'src/auth'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword, loading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef?.current?.focus()
  }, [])

  const onSubmit = async (data: { email: string }) => {
    const response = await forgotPassword(data.email)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />

      <Form onSubmit={onSubmit} className="card-body">
        <h1 className="card-title">Forgot Password</h1>
        <div className="form-control">
          <Label className="label" name="email">
            <span className="label-text">Email</span>
          </Label>
          <EmailField
            name="email"
            className="input-bordered input"
            errorClassName="input-bordered input input-error"
            placeholder="email@email.com"
            ref={emailRef}
            validation={{
              required: {
                value: true,
                message: 'Email is required.',
              },
            }}
          />
          <FieldError name="email" className="text-sm text-error" />
        </div>

        <Submit className={`btn-primary btn my-2 ${loading ? 'loading' : ''}`}>
          Submit
        </Submit>
        <Link to={routes.login()} className="link-hover link text-sm">
          Back to login
        </Link>
      </Form>
    </>
  )
}

export default ForgotPasswordPage
