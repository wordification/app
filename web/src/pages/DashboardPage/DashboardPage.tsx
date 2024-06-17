import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const DASHBOARD_ITEMS = [
  // {
  //   title: 'My Class',
  //   content: 'View my students and information',
  //   to: routes.students(),
  // },
  {
    title: 'Class Game Setup',
    content: 'Set game rules/specifications for your entire class',
    to: routes.classGameSetup(),
  },
  // {
  //   title: 'Change Password',
  //   content: 'Change your current password.',
  //   to: routes.resetPasswordTeacher(),
  // },
] as const

const DashboardPage = () => {
  return (
    <>
      <MetaTags title="Dashboard" description="Dashboard page" />

      <h1 className="pb-3 text-5xl font-bold">Teacher Dashboard</h1>
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

export default DashboardPage
