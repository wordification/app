import { Link, routes } from '@redwoodjs/router'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindStudentGamesInfoById,
  FindStudentGamesInfoByIdVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindStudentGamesInfoById($userId: Int!) {
    games: userGames(userId: $userId) {
      id
      userId
      complete
      user {
        email
      }
      updatedAt
      wordsPerPhoneme
      phonemes
      level
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindStudentGamesInfoByIdVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  games,
}: CellSuccessProps<
  FindStudentGamesInfoById,
  FindStudentGamesInfoByIdVariables
>) => {
  const incompleteGames = games.filter((game) => !game.complete)
  const completeGames = games.filter((game) => game.complete)

  return (
    <>
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title">Total Games</div>
          <div className="stat-value mb-2">{games.length}</div>
          <Link
            to={routes.studentGames({ id: games[0].userId })}
            title={'Student Games ' + games[0].userId}
            className="btn-outline btn-primary btn-xs btn"
          >
            View All Games
          </Link>
        </div>
        <div className="stat">
          <div className="stat-title">Complete Games</div>
          <div className="stat-value mb-2">{completeGames.length}</div>
          <Link
            to={routes.studentGames({
              id: games[0].userId,
              complete: true,
            })}
            title={'Student Games ' + games[0].userId}
            className="btn-outline btn-primary btn-xs btn"
          >
            View Complete Games
          </Link>
        </div>
        <div className="stat">
          <div className="stat-title">Incomplete Games</div>
          <div className="stat-value mb-2">{incompleteGames.length}</div>
          <Link
            to={routes.studentGames({
              id: games[0].userId,
              complete: false,
            })}
            title={'Student Games ' + games[0].userId}
            className="btn-outline btn-primary btn-xs btn"
          >
            View Incomplete Games
          </Link>
        </div>
      </div>
    </>
  )
}
