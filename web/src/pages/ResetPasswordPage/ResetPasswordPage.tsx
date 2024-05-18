import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import DirectPasswordReset from 'src/components/DirectPasswordReset/DirectPasswordReset'

type ResetPasswordPageProps = {
  id?: string
  name?: string
}

const ResetPasswordPage = ({ id, name }: ResetPasswordPageProps) => {
  const { currentUser } = useAuth()
  const userId = id ? id : (currentUser?.id as string)
  const userName = name
    ? name
    : ((currentUser?.lastName + ', ' + currentUser?.firstName) as string)

  return (
    <>
      <MetaTags title="ResetPassword" description="ResetPassword page" />
      <h1 className="pb-2 text-5xl font-bold">
        Reset Password
        <h2 className="pb-2 text-2xl">
          for {userName} — ID# {userId}
        </h2>
      </h1>

      {userId ? <DirectPasswordReset id={userId} /> : null}
    </>
  )
}

export default ResetPasswordPage
