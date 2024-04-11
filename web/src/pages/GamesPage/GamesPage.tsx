import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import SortingGameIcon from '../../../../static/SortingGameIcon.svg'
import MatchingGameIcon from '../../../../static/MatchingGameIcon.svg'

const GAME_CHOICES = [
  {
    title: 'Sorting',
    content: 'Sort the cards to win!',
    to: routes.sortingGame(),
    icon: SortingGameIcon,
  },
  {
    title: 'Matching',
    content: 'Match the cards to win!',
    to: routes.matchingGame(),
    icon: MatchingGameIcon,
  },
  {
    title: 'Building',
    content: 'Build words!',
    to: routes.buildingGame(),
  },
] as const

const GamesPage = () => {
  return (
    <>
      <MetaTags title="Games" description="Games page" />

      <h1 className="text-5xl font-bold pb-3">Games</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        {GAME_CHOICES.map((game) => (
          <Link
            to={game.to}
            key={game.to}
            className="card shadow-lg hover:shadow-xl  bg-off-black"
          >
            <li className="card-body flex flex-row justify-between">
              <div className="">
                <h3 className="card-title text-white text-5xl">{game.title}</h3>
                <p className="text-gray text-2xl">{game.content}</p>
              </div>

              <object data={game.icon} type="image/svg+xml" className="w-1/4 pr-5"> </object>
            </li>
          </Link>
        ))}
      </ul>
    </>
  )
}

export default GamesPage
