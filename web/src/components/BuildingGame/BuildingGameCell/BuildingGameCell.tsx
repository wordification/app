import BuildingGameLevelManager from '../../BuildingGame/BuildingGameLevelManager/BuildingGameLevelManager'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindBuildingGameById,
  FindBuildingGameByIdVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindBuildingGameById($id: Int!) {
    buildingGame: game(id: $id) {
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

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBuildingGameByIdVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  buildingGame,
}: CellSuccessProps<FindBuildingGameById, FindBuildingGameByIdVariables>) => {
  return (
    <BuildingGameLevelManager
      gameId={buildingGame.id}
      level={buildingGame.level}
    />
  )
}
