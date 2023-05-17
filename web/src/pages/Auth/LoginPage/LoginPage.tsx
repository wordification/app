import {
  Form,
  Label,
  PasswordField,
  Submit,
  FieldError,
  EmailField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useEffect } from 'react'
import { useRef } from 'react'

import { useAuth } from 'src/auth'

const LoginPage = () => {
  const { isAuthenticated, logIn, loading } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await logIn({
      username: data.email,
      password: data.password,
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />

      <Form onSubmit={onSubmit} className="card-body">
        <h1 className="card-title">Login</h1>
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
        <div className="form-control">
          <Label name="password" className="label">
            <span className="label-text">Password</span>
          </Label>
          <PasswordField
            name="password"
            className="input-bordered input"
            errorClassName="input-bordered input input-error"
            autoComplete="current-password"
            placeholder="********"
            validation={{
              required: {
                value: true,
                message: 'Password is required.',
              },
            }}
          />

          <FieldError name="password" className="text-sm text-error" />
        </div>

        <Submit
          className={`btn-primary btn my-2 ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          Login
        </Submit>
        <Link to={routes.forgotPassword()} className="link-hover link text-sm">
          Forgot Password?
        </Link>
      </Form>
    </>
  )
}

export default LoginPage
