import { Link, routes } from '@redwoodjs/router'

import MatchingGamesList from 'src/components/MatchingGame/MatchingGamesList'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { FindMatchingGames } from 'types/graphql'

export const QUERY = gql`
  query FindMatchingGames($complete: Boolean, $type: GameType) {
    matchingGames: games(complete: $complete, type: $type) {
      id
      user {
        email
      }
      updatedAt
      wordsPerUnit
      phonemes
      level
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="text-center">
      {'No games yet. '}
      <Link to={routes.matchingGameSetup()} className="link-hover link">
        {'Start one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-error">{error?.message}</div>
)

export const Success = ({
  matchingGames,
}: CellSuccessProps<FindMatchingGames>) => {
  return <MatchingGamesList matchingGames={matchingGames} />
}
