import { Link, routes, useLocation } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

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
      wordsPerUnit
      phonemes
      level
      type
    }
  }
`

export const Loading = () => <div>Loading student&apos;s games...</div>

export const Empty = () => <div>This student has no games.</div>

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
  const { hasRole } = useAuth()
  const { pathname } = useLocation()

  const incompleteGames = games.filter((game) => !game.complete)
  const completeGames = games.filter((game) => game.complete)

  return (
    <>
      <div className="stats stats-vertical ml-2 shadow lg:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Total Games</div>
          <div className="stat-value mb-2">{games.length}</div>
          {(hasRole('TEACHER') ||
            (hasRole('SUPERUSER') && pathname !== '/profile')) && (
            <Link
              to={routes.studentGames({ id: games[0].userId })}
              title={'Student Games ' + games[0].userId}
              className="btn-primary btn-outline btn-xs btn"
            >
              View All Games
            </Link>
          )}
        </div>
        <div className="stat">
          <div className="stat-title">Complete Games</div>
          <div className="stat-value mb-2">{completeGames.length}</div>
          {(hasRole('TEACHER') ||
            (hasRole('SUPERUSER') && pathname !== '/profile')) && (
            <Link
              to={routes.studentGames({
                id: games[0].userId,
                complete: true,
              })}
              title={'Student Games ' + games[0].userId}
              className="btn-primary btn-outline btn-xs btn"
            >
              View Complete Games
            </Link>
          )}
        </div>
        <div className="stat">
          <div className="stat-title">Incomplete Games</div>
          <div className="stat-value mb-2">{incompleteGames.length}</div>
          {(hasRole('TEACHER') ||
            (hasRole('SUPERUSER') && pathname !== '/profile')) && (
            <Link
              to={routes.studentGames({
                id: games[0].userId,
                complete: false,
              })}
              title={'Student Games ' + games[0].userId}
              className="btn-primary btn-outline btn-xs btn"
            >
              View Incomplete Games
            </Link>
          )}
        </div>
      </div>
    </>
  )
}
