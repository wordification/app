import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'
import StudentProfileCell from 'src/components/StudentProfileCell'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const currentUserId = currentUser?.id as number
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <StudentProfileCell id={currentUserId} />
    </>
  )
}

export default ProfilePage
