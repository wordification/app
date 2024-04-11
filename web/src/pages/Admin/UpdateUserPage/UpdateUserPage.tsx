import { MetaTags } from '@redwoodjs/web'

import UpdateUserForm from 'src/components/UpdateUserForm/UpdateUserForm'

type UpdateUserPageProps = {
  id: number
}

const AdminUpdateUserPage = ({ id }: UpdateUserPageProps) => {
  return (
    <>
      <MetaTags title="UpdateUser" description="UpdateUser page" />
      <h1 className="text-5xl font-bold pb-3">Modify Existing User</h1>

      <UpdateUserForm id={id} />
    </>
  )
}

export default AdminUpdateUserPage
