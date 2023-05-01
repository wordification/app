import type {
  FindSortingGameById,
  FindSortingGameByIdVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import SortingGameLevelManager from '../SortingGameLevelManager/SortingGameLevelManager'

export const QUERY = gql`
  query FindSortingGameById($id: Int!) {
    sortingGame: game(id: $id) {
      id
      level
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSortingGameByIdVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  sortingGame,
}: CellSuccessProps<FindSortingGameById, FindSortingGameByIdVariables>) => {
  return (
    <SortingGameLevelManager
      gameId={sortingGame.id}
      level={sortingGame.level}
    />
  )
}
