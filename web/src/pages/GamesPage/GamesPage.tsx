import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const GAME_CHOICES = [
  {
    title: 'Sorting',
    content: 'Sort the cards to win!',
    to: routes.sortingGame(),
    icon: 'game-icons/SortingGameIcon.svg',
  },
  {
    title: 'Matching',
    content: 'Match the cards to win!',
    to: routes.matchingGame(),
    icon: 'game-icons/MatchingGameIcon.svg',
  },
  {
    title: 'Building',
    content: 'Build words!',
    to: routes.buildingGame(),
    icon: 'game-icons/WordBuildingGameIcon.svg',
  },
] as const

const GamesPage = () => {
  return (
    <>
      <MetaTags title="Games" description="Games page" />

      <h1 className="pb-3 text-5xl font-bold">Games</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {GAME_CHOICES.map((game) => (
          <Link
            to={game.to}
            key={game.to}
            className="bg-off-black card h-auto shadow-lg hover:bg-secondary-focus hover:shadow-2xl"
          >
            <div className="card-body flex flex-col justify-between">
              <div className="flex  flex-col items-center justify-center">
                <h3 className="card-title text-8xl text-white">{game.title}</h3>
                <p className="text-gray pt-3 text-center text-4xl">
                  {game.content}
                </p>
              </div>

              <div className="flex h-auto w-full justify-center">
                <img
                  src={game.icon}
                  alt={`${game.icon} icon`}
                  className="w-1/2"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default GamesPage
