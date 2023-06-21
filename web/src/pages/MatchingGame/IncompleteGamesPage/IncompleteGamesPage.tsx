import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const MatchingGameIncompleteGamesPage = () => {
  return (
    <>
      <MetaTags title="IncompleteGames" description="IncompleteGames page" />

      <h1>IncompleteGamesPage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/IncompleteGamesPage/IncompleteGamesPage.tsx</code>
      </p>
      <p>
        My default route is named <code>incompleteGames</code>, link to me with
        `<Link to={routes.incompleteGames()}>IncompleteGames</Link>`
      </p>
    </>
  )
}

export default MatchingGameIncompleteGamesPage
