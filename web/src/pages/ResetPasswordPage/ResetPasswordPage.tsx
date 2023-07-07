import { MetaTags } from '@redwoodjs/web'

import DirectPasswordReset from 'src/components/DirectPasswordReset/DirectPasswordReset'

type ResetPasswordPageProps = {
  id?: string
  name?: string
}

const ResetPasswordPage = ({ id, name }: ResetPasswordPageProps) => {
  return (
    <>
      <MetaTags title="ResetPassword" description="ResetPassword page" />
      <h1 className="text-2xl font-bold">
        Reset Password —— {name} — ID# {id}
      </h1>

      {id ? <DirectPasswordReset id={id} /> : null}
    </>
  )
}

export default ResetPasswordPage
