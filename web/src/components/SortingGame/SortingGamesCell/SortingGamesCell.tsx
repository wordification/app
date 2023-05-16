import { Link, routes } from '@redwoodjs/router'

import SortingGamesList from 'src/components/SortingGame/SortingGamesList'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { FindSortingGames } from 'types/graphql'

export const QUERY = gql`
  query FindSortingGames($complete: Boolean) {
    sortingGames: games(complete: $complete) {
      id
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

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No games yet. '}
      <Link to={routes.sortingGameSetup()} className="rw-link">
        {'Start one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({
  sortingGames,
}: CellSuccessProps<FindSortingGames>) => {
  return <SortingGamesList sortingGames={sortingGames} />
}
