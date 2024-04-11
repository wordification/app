import { MetaTags } from '@redwoodjs/web'

import CreateUserForm from 'src/components/CreateUserForm/CreateUserForm'

const AdminCreateUserPage = () => {
  return (
    <>
      <MetaTags title="CreateUser" description="CreateUser page" />
      <h1 className="text-5xl font-bold">Create New User</h1>
      <CreateUserForm />
    </>
  )
}

export default AdminCreateUserPage
