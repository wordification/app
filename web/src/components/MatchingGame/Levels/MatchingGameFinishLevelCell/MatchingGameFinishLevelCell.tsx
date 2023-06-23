import { Link, routes } from '@redwoodjs/router'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindMatchingGameFinishLevelQuery,
  FindMatchingGameFinishLevelQueryVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindMatchingGameFinishLevelQuery($gameId: Int!) {
    matchingGameFinishLevel: game(id: $gameId) {
      id
      allWords {
        id
        word
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No game data found!</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMatchingGameFinishLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  matchingGameFinishLevel,
}: CellSuccessProps<
  FindMatchingGameFinishLevelQuery,
  FindMatchingGameFinishLevelQueryVariables
>) => {
  return (
    <div className="card bg-base-300 text-base-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Game complete!</h2>
        <p>Here are the words you practiced:</p>
        <ul className="list-inside list-disc">
          {matchingGameFinishLevel.allWords.map((word) => (
            <li key={word.id}>{word.word}</li>
          ))}
        </ul>
        <div className="card-actions justify-end">
          <Link className="btn-primary btn" to={routes.matchingGameSetup()}>
            Play again
          </Link>
        </div>
      </div>
    </div>
  )
}
