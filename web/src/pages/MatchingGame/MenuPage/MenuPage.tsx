import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const MatchingGameMenuPage = () => {
  return (
    <>
      <MetaTags title="Menu" description="Menu page" />

      <h1>MenuPage</h1>
      <p>
        Find me in <code>./web/src/pages/MenuPage/MenuPage.tsx</code>
      </p>
      <p>
        My default route is named <code>menu</code>, link to me with `
        <Link to={routes.menu()}>Menu</Link>`
      </p>
    </>
  )
}

export default MatchingGameMenuPage
