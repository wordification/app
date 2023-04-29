import { Link } from '@redwoodjs/router'

const SORTING_MENU_ITEMS = [
  {
    title: 'New Game',
    content: 'Start a new game',
    to: '/games/sorting/setup',
  },
  {
    title: 'Resume Game',
    content: 'Resume a game in progress',
    to: '/games/sorting/unfinished',
  },
  {
    title: 'Completed Games',
    content: 'View completed games',
    to: '/games/sorting/finished',
  },
] as const

const SortingGamePage = () => {
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {SORTING_MENU_ITEMS.map((item) => (
        <Link
          to={item.to}
          key={item.to}
          className="card shadow-lg hover:shadow-xl"
        >
          <li className="card-body">
            <h3 className="card-title">{item.title}</h3>
            <p>{item.content}</p>
          </li>
        </Link>
      ))}
    </ul>
  )
}

export default SortingGamePage
