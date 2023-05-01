import type {
  FindSortingGameSecondLevelQuery,
  FindSortingGameSecondLevelQueryVariables,
  GradeLevelTwoMutation,
} from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameCard from 'src/components/GameCard/GameCard'
import { QUERY as LEVEL_QUERY } from 'src/components/SortingGame/SortingGameCell'

export const QUERY = gql`
  query FindSortingGameSecondLevelQuery($gameId: Int!) {
    sortingGameSecondLevel: sortingGameSecondLevel(gameId: $gameId) {
      gameId
      graphemes
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSortingGameSecondLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const GRADE_LEVEL_TWO_MUTATION = gql`
  mutation GradeLevelTwoMutation($gameId: Int!, $grapheme: String!) {
    sortingGameGradeSecondLevel(gameId: $gameId, grapheme: $grapheme)
  }
`

export const Success = ({
  sortingGameSecondLevel,
}: CellSuccessProps<
  FindSortingGameSecondLevelQuery,
  FindSortingGameSecondLevelQueryVariables
>) => {
  const [gradeLevel, { loading }] = useMutation<GradeLevelTwoMutation>(
    GRADE_LEVEL_TWO_MUTATION,
    {
      onCompleted: ({ sortingGameGradeSecondLevel }) => {
        if (sortingGameGradeSecondLevel) {
          toast.success('Correct!')
        } else {
          toast.error('Incorrect!')
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [
        {
          query: LEVEL_QUERY,
          variables: { id: sortingGameSecondLevel.gameId },
        },
      ],
      awaitRefetchQueries: true,
    }
  )

  const handleClick = (selectedGrapheme: string) => {
    return gradeLevel({
      variables: {
        grapheme: selectedGrapheme,
        gameId: sortingGameSecondLevel.gameId,
      },
    })
  }

  return (
    <GameCard title="Click on the correct vowel sound." files={[]}>
      <div className="grid grid-cols-2 gap-4">
        {sortingGameSecondLevel.graphemes.map((grapheme) => (
          <button
            className="btn-secondary btn normal-case"
            type="button"
            onClick={() => handleClick(grapheme)}
            disabled={loading}
            key={grapheme}
          >
            {grapheme}
          </button>
        ))}
      </div>
    </GameCard>
  )
}
