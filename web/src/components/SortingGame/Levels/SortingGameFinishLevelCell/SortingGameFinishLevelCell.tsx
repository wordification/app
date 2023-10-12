import { Link, routes } from '@redwoodjs/router'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindSortingGameFinishLevelQuery,
  FindSortingGameFinishLevelQueryVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindSortingGameFinishLevelQuery($gameId: Int!) {
    sortingGameFinishLevel: game(id: $gameId) {
      id
      allWords {
        id
        word
      }
      finalScore
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>No game data found!</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSortingGameFinishLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({
  sortingGameFinishLevel,
}: CellSuccessProps<
  FindSortingGameFinishLevelQuery,
  FindSortingGameFinishLevelQueryVariables
>) => {
  const gameScore = sortingGameFinishLevel.finalScore ?? 0

  // Map game score on a 3 point grade scale.
  //  -12 - 0 ->  0.0 - 1.0  ->  RED
  //  0 - 3   ->  1.0 - 2.0  ->  YELLOW
  //  3 - 6   ->  2.0 - 3.0  ->  GREEN
  const shiftGameScore = gameScore + 12.0
  const mappedGameScore =
    shiftGameScore >= 0 && shiftGameScore <= 12
      ? (shiftGameScore - 0) / (12 - 0)
      : shiftGameScore > 12 && shiftGameScore <= 15
      ? 1 + (shiftGameScore - 12) / (15 - 12)
      : shiftGameScore > 15 && shiftGameScore <= 18
      ? 2 + (shiftGameScore - 15) / (18 - 15)
      : 0

  return (
    <div className="card bg-base-300 text-base-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Game complete!</h2>
        <p>Here are the words you practiced:</p>
        <ul className="list-inside list-disc">
          {sortingGameFinishLevel.allWords.map((word) => (
            <li key={word.id}>{word.word}</li>
          ))}
        </ul>
        <h2 className="card-title">
          Score: {gameScore} —{' '}
          {mappedGameScore < 1
            ? 'FAIL'
            : mappedGameScore < 2
            ? 'MARGINAL'
            : 'PASS'}
        </h2>

        <progress
          className={`${
            mappedGameScore < 1
              ? 'progress-error'
              : mappedGameScore < 2
              ? 'progress-warning'
              : 'progress-success'
          } progress w-56`}
          value={mappedGameScore}
          max="3"
        ></progress>
        <p>{mappedGameScore.toFixed(2)} / 3</p>
        <div className="card-actions justify-end">
          <Link className="btn-primary btn" to={routes.sortingGameSetup()}>
            Play again
          </Link>
        </div>
      </div>
    </div>
  )
}
