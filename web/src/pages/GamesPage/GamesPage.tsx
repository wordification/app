import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const GAME_CHOICES = [
  {
    title: 'Sorting',
    content: 'Sort the cards to win!',
    to: '/games/sorting',
  },
  {
    title: 'Matching',
    content: 'Match the cards to win!',
    to: '/games/matching',
  },
] as const

const GamesPage = () => {
  return (
    <>
      <MetaTags title="Games" description="Games page" />

      <h1 className="text-2xl font-bold">Games</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {GAME_CHOICES.map((game) => (
          <Link
            to={game.to}
            key={game.to}
            className="card shadow-lg hover:shadow-xl"
          >
            <li className="card-body">
              <h3 className="card-title">{game.title}</h3>
              <p>{game.content}</p>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}

export default GamesPage
