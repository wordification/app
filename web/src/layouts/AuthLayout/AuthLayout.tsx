import { Toaster } from '@redwoodjs/web/toast'
import { useRef } from 'react'
import { useEffect } from 'react'

const AuthLayout = ({ children }: { children?: React.ReactNode }) => {
  const emailRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  return (
    <>
      <Toaster toastOptions={{ duration: 6000 }} />

      <div className="hero h-screen bg-gradient-to-bl from-secondary from-25% via-primary to-accent shadow-inner">
        <div className="card w-full max-w-xl bg-base-100 text-base-content">
          {children}
        </div>
      </div>
    </>
  )
}

export default AuthLayout
