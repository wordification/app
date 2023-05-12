import type { FindSortingGames } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import SortingGamesList from 'src/components/SortingGame/SortingGamesList'

export const QUERY = gql`
  query FindSortingGames($complete: Boolean) {
    sortingGames: games(complete: $complete) {
      id
      user {
        email
      }
      createdAt
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
