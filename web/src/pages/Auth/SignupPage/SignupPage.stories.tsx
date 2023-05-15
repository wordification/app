import type { ComponentMeta } from '@storybook/react'

import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

import SignupPage from './SignupPage'

export const isolated = () => {
  return <SignupPage />
}

export const inLayout = () => {
  return (
    <AuthLayout>
      <SignupPage />
    </AuthLayout>
  )
}

export default {
  title: 'Pages/Auth/SignupPage',
  component: SignupPage,
} as ComponentMeta<typeof SignupPage>
