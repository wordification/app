import { useRef } from 'react'
import { useEffect } from 'react'

import {
  Form,
  Label,
  PasswordField,
  FieldError,
  Submit,
  EmailField,
} from '@redwoodjs/forms'
import { Link, navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { useAuth } from 'src/auth'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  const onSubmit = async (data: Record<string, string>) => {
    const response = await signUp({
      username: data.email,
      password: data['new-password'],
    })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <Form onSubmit={onSubmit} className="card-body">
        <h1 className="card-title">Sign Up</h1>
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
          <Label name="new-password" className="label">
            <span className="label-text">Password</span>
          </Label>
          <PasswordField
            name="new-password"
            className="input-bordered input"
            errorClassName="input-bordered input input-error"
            autoComplete="new-password"
            placeholder="********"
            validation={{
              required: {
                value: true,
                message: 'Password is required.',
              },
            }}
          />

          <FieldError name="new-password" className="text-sm text-error" />
        </div>

        <Submit className="btn-primary btn my-2 block">Sign Up</Submit>
        <p className="text-sm">
          Already have an account?{' '}
          <Link to={routes.login()} className="link-hover link">
            Click here to login!
          </Link>
        </p>
      </Form>
    </>
  )
}

export default SignupPage
