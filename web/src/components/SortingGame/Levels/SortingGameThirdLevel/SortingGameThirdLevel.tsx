import type {
  GradeLevelThreeMutation,
  GradeLevelThreeMutationVariables,
} from 'types/graphql'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameCard from 'src/components/GameCard'
import SortingGameThirdLevelForm from 'src/components/SortingGame/Levels/SortingGameThirdLevel/SortingGameThirdLevelForm'
import { QUERY as LEVEL_QUERY } from 'src/components/SortingGame/SortingGameCell'

const GRADE_LEVEL_THREE_MUTATION = gql`
  mutation GradeLevelThreeMutation($gameId: Int!, $entry: String!) {
    sortingGameGradeThirdLevel(gameId: $gameId, entry: $entry)
  }
`

const SortingGameThirdLevel = ({ gameId }: { gameId: number }) => {
  const [gradeLevel, { loading, error }] = useMutation<GradeLevelThreeMutation>(
    GRADE_LEVEL_THREE_MUTATION,
    {
      onCompleted: ({ sortingGameGradeThirdLevel }) => {
        if (sortingGameGradeThirdLevel) {
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
          variables: { id: gameId },
        },
      ],
      awaitRefetchQueries: true,
    }
  )

  const handleSubmit = (input: GradeLevelThreeMutationVariables) => {
    console.log(input)
    gradeLevel({
      variables: {
        gameId,
        entry: input.entry,
      },
    })
  }

  return (
    <GameCard title="Spell the word." files={[]}>
      <SortingGameThirdLevelForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </GameCard>
  )
}

export default SortingGameThirdLevel
