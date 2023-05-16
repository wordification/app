import AuthLayout from 'src/layouts/AuthLayout/AuthLayout'

import ResetPasswordPage from './ResetPasswordPage'

import type { ComponentMeta } from '@storybook/react'
export const isolated = () => {
  return <ResetPasswordPage resetToken="" />
}

export const inLayout = () => {
  return (
    <AuthLayout>
      <ResetPasswordPage resetToken="" />
    </AuthLayout>
  )
}
export default {
  title: 'Pages/Auth/ResetPasswordPage',
  component: ResetPasswordPage,
} as ComponentMeta<typeof ResetPasswordPage>
