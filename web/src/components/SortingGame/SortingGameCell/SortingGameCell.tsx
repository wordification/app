import ProgressBar from 'src/components/ProgressBar/ProgressBar/ProgressBar'

import SortingGameLevelManager from '../SortingGameLevelManager/SortingGameLevelManager'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindSortingGameById,
  FindSortingGameByIdVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindSortingGameById($id: Int!) {
    sortingGame: game(id: $id) {
      id
      level
      allWords {
        id
      }
      incompleteWords {
        id
      }
    }
  }
`

export const Loading = () => (
  <>
    <ProgressBar value={undefined} max={undefined} />
    <div>Loading...</div>
  </>
)

export const Empty = () => <div>No game details found!</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSortingGameByIdVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  sortingGame,
}: CellSuccessProps<FindSortingGameById, FindSortingGameByIdVariables>) => {
  return (
    <>
      <ProgressBar
        value={sortingGame.allWords.length - sortingGame.incompleteWords.length}
        max={sortingGame.allWords.length}
      />
      <SortingGameLevelManager
        gameId={sortingGame.id}
        level={sortingGame.level}
      />
    </>
  )
}
