import { Link, routes } from '@redwoodjs/router'

const MATCHING_MENU_ITEMS = [
  {
    title: 'New Game',
    content: 'Start a new game',
    to: routes.matchingGameSetup(),
  },
  {
    title: 'Resume Game',
    content: 'Resume a game in progress',
    to: routes.matchingGameIncomplete(),
  },
  {
    title: 'Completed Games',
    content: 'View completed games',
    to: routes.matchingGameComplete(),
  },
] as const

const MatchingGameMenuPage = () => {
  return (
    <>
      <h1 className="pb-3 text-5xl font-bold">Matching Game</h1>
      <ul className="grid gap-4 sm:grid-cols-3">
        {MATCHING_MENU_ITEMS.map((item) => (
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

export default MatchingGameMenuPage
