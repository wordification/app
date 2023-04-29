import { MetaTags } from '@redwoodjs/web'

import { useAuth } from 'src/auth'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />

      <h1 className="text-2xl font-bold">Profile Page</h1>
      <p>Here is some basic info about you:</p>
      <pre>
        <code>{JSON.stringify(currentUser, null, 2)}</code>
      </pre>
    </>
  )
}

export default ProfilePage
