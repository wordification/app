import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

type IndividualGamePageProps = {
  id: number
}

const IndividualGamePage = ({ id }: IndividualGamePageProps) => {
  return (
    <>
      <MetaTags title="IndividualGame" description="IndividualGame page" />

      <h1>IndividualGamePage</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/IndividualGamePage/IndividualGamePage.tsx</code>
      </p>
      <p>
        My default route is named <code>individualGame</code>, link to me with `
        <Link to={routes.individualGame({ id: 42 })}>IndividualGame 42</Link>`
      </p>
      <p>The parameter passed to me is {id}</p>
    </>
  )
}

export default IndividualGamePage
