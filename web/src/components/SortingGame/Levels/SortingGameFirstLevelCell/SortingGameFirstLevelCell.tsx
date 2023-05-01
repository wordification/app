import type {
  FindSortingGameFirstLevelQuery,
  FindSortingGameFirstLevelQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import GameCard from 'src/components/GameCard/GameCard'

export const QUERY = gql`
  query FindSortingGameFirstLevelQuery($gameId: Int!) {
    sortingGameFirstLevel: sortingGameFirstLevel(gameId: $gameId) {
      phonemes {
        id
        label
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSortingGameFirstLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  sortingGameFirstLevel,
}: CellSuccessProps<
  FindSortingGameFirstLevelQuery,
  FindSortingGameFirstLevelQueryVariables
>) => {
  return (
    <GameCard title="Click on the correct vowel sound." files={[]}>
      <div className="grid grid-cols-2 gap-4">
        {sortingGameFirstLevel.phonemes.map((option) => (
          <button
            className="btn-secondary btn normal-case"
            type="button"
            key={option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
    </GameCard>
  )
}
