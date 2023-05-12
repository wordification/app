import type {
  FindSortingGameThirdLevelQuery,
  FindSortingGameThirdLevelQueryVariables,
  GradeLevelThreeMutation,
  GradeLevelThreeMutationVariables,
} from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameCard from 'src/components/GameCard/GameCard'
import { QUERY as LEVEL_QUERY } from 'src/components/SortingGame/SortingGameCell'

import SortingGameThirdLevelForm from '../SortingGameThirdLevel/SortingGameThirdLevelForm/SortingGameThirdLevelForm'

export const QUERY = gql`
  query FindSortingGameThirdLevelQuery($gameId: Int!) {
    sortingGameThirdLevel: sortingGameThirdLevel(gameId: $gameId) {
      gameId
      audio
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindSortingGameThirdLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const GRADE_LEVEL_THREE_MUTATION = gql`
  mutation GradeLevelThreeMutation($gameId: Int!, $entry: String!) {
    sortingGameGradeThirdLevel(gameId: $gameId, entry: $entry) {
      correct
    }
  }
`

export const Success = ({
  sortingGameThirdLevel,
}: CellSuccessProps<
  FindSortingGameThirdLevelQuery,
  FindSortingGameThirdLevelQueryVariables
>) => {
  const [gradeLevel, { loading, error }] = useMutation<GradeLevelThreeMutation>(
    GRADE_LEVEL_THREE_MUTATION,
    {
      onCompleted: ({ sortingGameGradeThirdLevel }) => {
        if (sortingGameGradeThirdLevel.correct) {
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
          variables: { id: sortingGameThirdLevel.gameId },
        },
      ],
      awaitRefetchQueries: true,
    }
  )

  const handleSubmit = (
    input: Omit<GradeLevelThreeMutationVariables, 'gameId'>
  ) => {
    console.log(input)
    gradeLevel({
      variables: {
        gameId: sortingGameThirdLevel.gameId,
        entry: input.entry,
      },
    })
  }

  return (
    <GameCard title="Spell the word." files={sortingGameThirdLevel.audio}>
      <SortingGameThirdLevelForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </GameCard>
  )
}
