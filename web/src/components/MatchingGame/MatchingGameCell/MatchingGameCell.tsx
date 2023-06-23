import MatchingGameLevelManager from '../MatchingGameLevelManager/MatchingGameLevelManager'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindMatchingGameById,
  FindMatchingGameByIdVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindMatchingGameById($id: Int!) {
    matchingGame: game(id: $id) {
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

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No game details found!</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMatchingGameByIdVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  matchingGame,
}: CellSuccessProps<FindMatchingGameById, FindMatchingGameByIdVariables>) => {
  return (
    <MatchingGameLevelManager
      gameId={matchingGame.id}
      level={matchingGame.level}
    />
  )
}
