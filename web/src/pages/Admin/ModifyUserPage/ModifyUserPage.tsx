import { MetaTags } from '@redwoodjs/web'

import UsersCell from 'src/components/UsersCell'

const AdminModifyUserPage = () => {
  return (
    <>
      <MetaTags title="ModifyUser" description="ModifyUser page" />

      <h1 className="mb-2 text-2xl font-bold">Modify Existing User</h1>

      <UsersCell />
    </>
  )
}

export default AdminModifyUserPage
