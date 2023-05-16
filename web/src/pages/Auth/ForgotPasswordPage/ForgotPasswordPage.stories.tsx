import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

import ForgotPasswordPage from './ForgotPasswordPage'

import type { ComponentMeta } from '@storybook/react'

export const isolated = () => {
  return <ForgotPasswordPage />
}

export const inLayout = () => {
  return (
    <AuthLayout>
      <ForgotPasswordPage />
    </AuthLayout>
  )
}

export default {
  title: 'Pages/Auth/ForgotPasswordPage',
  component: ForgotPasswordPage,
} as ComponentMeta<typeof ForgotPasswordPage>
