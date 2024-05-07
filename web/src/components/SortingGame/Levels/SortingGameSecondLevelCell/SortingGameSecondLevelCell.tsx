import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import GameCard from 'src/components/GameCard/GameCard'
import { QUERY as LEVEL_QUERY } from 'src/components/SortingGame/SortingGameCell'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindSortingGameSecondLevelQuery,
  FindSortingGameSecondLevelQueryVariables,
  GradeLevelTwoMutation,
} from 'types/graphql'

export const beforeQuery = (
  props: FindSortingGameSecondLevelQueryVariables
) => {
  return {
    variables: props,
    fetchPolicy: 'no-cache',
  }
}

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
      status
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
  // const [playingAudio, setPlayingAudio] = useState(false)
  const [files, setFiles] = useState(sortingGameSecondLevel.audio)
  const [selectedBtn, setSelectedBtn] = useState<undefined | string>(undefined)
  const [correctClick, setCorrectClick] = useState<undefined | boolean>(
    undefined
  )
  const [gradeLevel, { loading, client }] = useMutation<GradeLevelTwoMutation>(
    GRADE_LEVEL_TWO_MUTATION,
    {
      onCompleted: ({ sortingGameGradeSecondLevel }) => {
        switch (sortingGameGradeSecondLevel.status) {
          case 'CORRECT':
            setCorrectClick(true)
            // setPlayingAudio(true)
            toast.success('Correct!')
            break
          case 'INCORRECT':
            setCorrectClick(false)
            toast.error('Incorrect!')
            break
          case 'TOO_MANY_INCORRECT_GUESSES':
            setCorrectClick(false)
            toast.error('Too many incorrect guesses!')
            break
        }
        if (sortingGameGradeSecondLevel.audio) {
          setFiles(sortingGameGradeSecondLevel.audio)
          console.log('HIT')
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      // refetchQueries: [
      //   {
      //     query: LEVEL_QUERY,
      //     variables: { id: sortingGameSecondLevel.game.id },
      //   },
      // ],
      awaitRefetchQueries: true,
    }
  )

  const handleClick = (selectedGrapheme: string) => {
    setSelectedBtn(selectedGrapheme)
    return gradeLevel({
      variables: {
        grapheme: selectedGrapheme,
        gameId: sortingGameSecondLevel.game.id,
      },
    })
  }

  const handleComplete = async () => {
    setCorrectClick(undefined)
    setSelectedBtn(undefined)
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: sortingGameSecondLevel.game.id },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'network-only',
    })
  }

  const btnState = (grapheme: string) => {
    if (selectedBtn != undefined) {
      if (selectedBtn == grapheme) {
        if (correctClick == true) {
          return 'btn-game-correct'
        } else if (correctClick == false) {
          return 'btn-game-incorrect'
        }
      } else {
        return 'btn-game-wait'
      }
    } else {
      return 'btn-game-yellow'
    }
  }

  return (
    <GameCard
      title="Click on the correct spelling pattern."
      files={files}
      onComplete={() => handleComplete()}
    >
      <div className="grid grid-cols-2 gap-4">
        {sortingGameSecondLevel.graphemes.map((grapheme) => (
          <button
            className={`btn-lg btn h-32 normal-case ${btnState(grapheme)} `}
            type="button"
            onClick={() => handleClick(grapheme)}
            disabled={loading}
            key={grapheme}
          >
            <div className="text-6xl">{grapheme}</div>
          </button>
        ))}
      </div>
    </GameCard>
  )
}
