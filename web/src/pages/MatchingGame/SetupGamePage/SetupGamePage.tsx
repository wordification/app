import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const MatchingGameSetupGamePage = () => {
  return (
    <>
      <MetaTags title="SetupGame" description="SetupGame page" />

      <h1>SetupGamePage</h1>
      <p>
        Find me in <code>./web/src/pages/SetupGamePage/SetupGamePage.tsx</code>
      </p>
      <p>
        My default route is named <code>setupGame</code>, link to me with `
        <Link to={routes.setupGame()}>SetupGame</Link>`
      </p>
    </>
  )
}

export default MatchingGameSetupGamePage
