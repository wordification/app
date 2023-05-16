import type { ComponentMeta } from '@storybook/react'

import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

import LoginPage from './LoginPage'

export const isolated = () => {
  return <LoginPage />
}

export const inLayout = () => {
  return (
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  )
}

export default {
  title: 'Pages/Auth/LoginPage',
  component: LoginPage,
} as ComponentMeta<typeof LoginPage>
