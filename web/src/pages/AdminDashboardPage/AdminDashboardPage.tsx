import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const AdminDashboardPage = () => {
  return (
    <>
      <MetaTags title="AdminDashboard" description="AdminDashboard page" />

      <h1>AdminDashboardPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/AdminDashboardPage/AdminDashboardPage.tsx</code>
      </p>
      <p>
        My default route is named <code>adminDashboard</code>, link to me with `
        <Link to={routes.adminDashboard()}>AdminDashboard</Link>`
      </p>
    </>
  )
}

export default AdminDashboardPage
