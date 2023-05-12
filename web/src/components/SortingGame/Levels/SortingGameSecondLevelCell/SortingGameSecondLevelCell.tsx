import { useState } from 'react'

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
      game {
        id
      }
      graphemes
      audio
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
    sortingGameGradeSecondLevel(gameId: $gameId, grapheme: $grapheme) {
      correct
      audio
    }
  }
`

export const Success = ({
  sortingGameSecondLevel,
}: CellSuccessProps<
  FindSortingGameSecondLevelQuery,
  FindSortingGameSecondLevelQueryVariables
>) => {
  const [files, setFiles] = useState(sortingGameSecondLevel.audio)
  const [gradeLevel, { loading }] = useMutation<GradeLevelTwoMutation>(
    GRADE_LEVEL_TWO_MUTATION,
    {
      onCompleted: ({ sortingGameGradeSecondLevel }) => {
        if (sortingGameGradeSecondLevel.correct) {
          toast.success('Correct!')
        } else {
          toast.error('Incorrect!')
        }
        if (sortingGameGradeSecondLevel.audio) {
          setFiles(sortingGameGradeSecondLevel.audio)
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
          variables: { id: sortingGameSecondLevel.game.id },
        },
      ],
      awaitRefetchQueries: true,
    }
  )

  const handleClick = (selectedGrapheme: string) => {
    return gradeLevel({
      variables: {
        grapheme: selectedGrapheme,
        gameId: sortingGameSecondLevel.game.id,
      },
    })
  }

  return (
    <GameCard title="Click on the correct vowel sound." files={files}>
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
