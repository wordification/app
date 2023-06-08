import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const DashboardClassGameSetupPage = () => {
  return (
    <>
      <MetaTags title="ClassGameSetup" description="ClassGameSetup page" />

      <h1>ClassGameSetupPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/ClassGameSetupPage/ClassGameSetupPage.tsx</code>
      </p>
      <p>
        My default route is named <code>classGameSetup</code>, link to me with `
        <Link to={routes.classGameSetup()}>ClassGameSetup</Link>`
      </p>
    </>
  )
}

export default DashboardClassGameSetupPage
