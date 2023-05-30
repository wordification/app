import { MetaTags } from '@redwoodjs/web'

import UpdateUserForm from 'src/components/UpdateUserForm/UpdateUserForm'

type UpdateUserPageProps = {
  id: number
}

const UpdateUserPage = ({ id }: UpdateUserPageProps) => {
  return (
    <>
      <MetaTags title="UpdateUser" description="UpdateUser page" />
      <h1 className="text-2xl font-bold">Modify Existing User</h1>

      <UpdateUserForm id={id} />
    </>
  )
}

export default UpdateUserPage
