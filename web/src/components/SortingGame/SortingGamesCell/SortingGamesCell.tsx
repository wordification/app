import { Link, routes } from '@redwoodjs/router'

import SortingGamesList from 'src/components/SortingGame/SortingGamesList'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { FindSortingGames } from 'types/graphql'

export const QUERY = gql`
  query FindSortingGames($complete: Boolean, $type: GameType) {
    sortingGames: games(complete: $complete, type: $type) {
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
      <Link to={routes.sortingGameSetup()} className="link-hover link">
        {'Start one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="text-error">{error?.message}</div>
)

export const Success = ({
  sortingGames,
}: CellSuccessProps<FindSortingGames>) => {
  return <SortingGamesList sortingGames={sortingGames} />
}
