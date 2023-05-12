import type {
  FindSortingGameFirstLevelQuery,
  FindSortingGameFirstLevelQueryVariables,
  GradeLevelOneMutation,
} from 'types/graphql'

import { CellSuccessProps, CellFailureProps, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameCard from 'src/components/GameCard/GameCard'
import { QUERY as LEVEL_QUERY } from 'src/components/SortingGame/SortingGameCell'

export const QUERY = gql`
  query FindSortingGameFirstLevelQuery($gameId: Int!) {
    sortingGameFirstLevel: sortingGameFirstLevel(gameId: $gameId) {
      gameId
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

const GRADE_LEVEL_ONE_MUTATION = gql`
  mutation GradeLevelOneMutation($gameId: Int!, $phoneme: Int!) {
    sortingGameGradeFirstLevel(gameId: $gameId, phoneme: $phoneme) {
      correct
    }
  }
`

export const Success = ({
  sortingGameFirstLevel,
}: CellSuccessProps<
  FindSortingGameFirstLevelQuery,
  FindSortingGameFirstLevelQueryVariables
>) => {
  const [gradeLevel, { loading }] = useMutation<GradeLevelOneMutation>(
    GRADE_LEVEL_ONE_MUTATION,
    {
      onCompleted: ({ sortingGameGradeFirstLevel }) => {
        if (sortingGameGradeFirstLevel.correct) {
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
        { query: LEVEL_QUERY, variables: { id: sortingGameFirstLevel.gameId } },
      ],
      awaitRefetchQueries: true,
    }
  )

  const handleClick = (selectedPhoneme: number) => {
    return gradeLevel({
      variables: {
        phoneme: selectedPhoneme,
        gameId: sortingGameFirstLevel.gameId,
      },
    })
  }

  return (
    <GameCard title="Click on the correct vowel sound." files={[]}>
      <div className="grid grid-cols-2 gap-4">
        {sortingGameFirstLevel.phonemes.map((option) => (
          <button
            className="btn-secondary btn normal-case"
            type="button"
            onClick={() => handleClick(option.id)}
            disabled={loading}
            key={option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
    </GameCard>
  )
}
