import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const DASHBOARD_ITEMS = [
  {
    title: 'Add User',
    content: "Fill out a 'create new user' form.",
    to: routes.createUser(),
  },
  {
    title: 'Modify User',
    content: 'Delete or update information for an existing user.',
    to: routes.modifyUser(),
  },
  {
    title: 'Change Password',
    content: 'Change your current password.',
    to: routes.resetPasswordAdmin(),
  },
] as const

const AdminDashboardPage = () => {
  return (
    <>
      <MetaTags title="AdminDashboard" description="AdminDashboard page" />

      <h1 className="pb-3 text-5xl font-bold">Administrator Dashboard</h1>
      <ul className="grid gap-4 sm:grid-cols-3">
        {DASHBOARD_ITEMS.map((item) => (
          <Link
            to={item.to}
            key={item.to}
            className="bg-off-black card shadow-lg hover:shadow-xl"
          >
            <li className="card-body">
              <h3 className="card-title text-5xl text-white">{item.title}</h3>
              <p className="text-gray text-2xl">{item.content}</p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}

export default AdminDashboardPage
