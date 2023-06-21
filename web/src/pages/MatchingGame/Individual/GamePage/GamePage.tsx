import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

type MatchingGameIndividualGamePageProps = {
  id: number
}

const MatchingGameIndividualGamePage = ({
  id,
}: MatchingGameIndividualGamePageProps) => {
  return (
    <>
      <MetaTags title="Game" description="Game page" />

      <h1>GamePage</h1>
      <p>
        Find me in <code>./web/src/pages/GamePage/GamePage.tsx</code>
      </p>
      <p>
        My default route is named <code>game</code>, link to me with `
        <Link to={routes.game({ id: 42 })}>Game 42</Link>`
      </p>
      <p>The parameter passed to me is {id}</p>
    </>
  )
}

export default MatchingGameIndividualGamePage
