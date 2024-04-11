import { Link, routes } from '@redwoodjs/router'

import BuildingGamesList from '../BuildingGamesList/BuildingGamesList'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type { FindBuildingGames } from 'types/graphql'

export const QUERY = gql`
  query FindBuildingGames($complete: Boolean, $type: GameType) {
    buildingGames: games(complete: $complete, type: $type) {
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
      <Link to={routes.buildingGameSetup()} className="link-hover link">
        {'Start one?'}
      </Link>
    </div>
  )
}

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  buildingGames,
}: CellSuccessProps<FindBuildingGames>) => {
  return <BuildingGamesList buildingGames={buildingGames} />
}
