import { MetaTags } from '@redwoodjs/web'

import UsersCell from 'src/components/UsersCell'

const DeleteUserPage = () => {
  return (
    <>
      <MetaTags title="DeleteUser" description="DeleteUser page" />

      <h1 className="mb-2 text-2xl font-bold">Delete Existing User</h1>

      <UsersCell />
    </>
  )
}

export default DeleteUserPage
