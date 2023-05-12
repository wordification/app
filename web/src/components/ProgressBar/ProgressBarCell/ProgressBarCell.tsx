import type {
  FindProgressBarQuery,
  FindProgressBarQueryVariables,
} from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import ProgressBar from '../ProgressBar/ProgressBar'

export const QUERY = gql`
  query FindProgressBarQuery($gameId: Int!) {
    progressBar: game(id: $gameId) {
      allWords {
        id
      }
      incompleteWords {
        id
      }
    }
  }
`

export const Loading = () => <ProgressBar value={undefined} max={undefined} />

export const Empty = () => <ProgressBar value={undefined} max={undefined} />

export const Failure = ({
  error,
}: CellFailureProps<FindProgressBarQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  progressBar,
}: CellSuccessProps<FindProgressBarQuery, FindProgressBarQueryVariables>) => {
  if (
    !progressBar.allWords ||
    !progressBar.incompleteWords ||
    progressBar.allWords.length === 0
  ) {
    return <Empty />
  }
  return (
    <ProgressBar
      value={progressBar.allWords.length - progressBar.incompleteWords.length}
      max={progressBar.allWords.length}
    />
  )
}
