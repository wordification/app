import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const SuperuserDashboardPage = () => {
  return (
    <>
      <MetaTags
        title="SuperuserDashboard"
        description="SuperuserDashboard page"
      />

      <h1>SuperuserDashboardPage</h1>
      <p>
        Find me in{' '}
        <code>
          ./web/src/pages/SuperuserDashboardPage/SuperuserDashboardPage.tsx
        </code>
      </p>
      <p>
        My default route is named <code>superuserDashboard</code>, link to me
        with `<Link to={routes.superuserDashboard()}>SuperuserDashboard</Link>`
      </p>
    </>
  )
}

export default SuperuserDashboardPage
