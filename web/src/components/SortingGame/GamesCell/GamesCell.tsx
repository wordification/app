import type { FindGames } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import Games from 'src/components/SortingGame/Games'

export const QUERY = gql`
  query FindGames {
    games {
      id
      userId
      createdAt
      wordsPerPhoneme
      phonemeOne
      phonemeTwo
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
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ games }: CellSuccessProps<FindGames>) => {
  return <Games games={games} />
}
