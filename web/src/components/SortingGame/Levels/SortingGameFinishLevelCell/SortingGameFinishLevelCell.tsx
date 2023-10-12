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
      grade
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
  const grade = sortingGameFinishLevel.grade ?? 0

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
          {grade < 1 ? 'FAIL' : grade < 2 ? 'MARGINAL' : 'PASS'}
        </h2>

        <progress
          className={`${
            grade < 1
              ? 'progress-error'
              : grade < 2
              ? 'progress-warning'
              : 'progress-success'
          } progress w-56`}
          value={grade}
          max="3"
        ></progress>
        <p>{grade} / 3</p>
        <div className="card-actions justify-end">
          <Link className="btn-primary btn" to={routes.sortingGameSetup()}>
            Play again
          </Link>
        </div>
      </div>
    </div>
  )
}
