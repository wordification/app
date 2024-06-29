import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import GameCard from 'src/components/GameCard/GameCard'
import { QUERY as LEVEL_QUERY } from 'src/components/SortingGame/SortingGameCell'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindSortingGameFirstLevelQuery,
  FindSortingGameFirstLevelQueryVariables,
  GradeLevelOneMutation,
} from 'types/graphql'

export const beforeQuery = (props: FindSortingGameFirstLevelQueryVariables) => {
  return {
    variables: props,
    fetchPolicy: 'no-cache',
  }
}

export const QUERY = gql`
  query FindSortingGameFirstLevelQuery($gameId: Int!) {
    sortingGameFirstLevel: sortingGameFirstLevel(gameId: $gameId) {
      game {
        id
      }
      audio
      phonemes {
        id
        name
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
      status
      audio
    }
  }
`

export const Success = ({
  sortingGameFirstLevel,
}: CellSuccessProps<
  FindSortingGameFirstLevelQuery,
  FindSortingGameFirstLevelQueryVariables
>) => {
  const [playingAudio, setPlayingAudio] = useState(true)
  const [files, setFiles] = useState(sortingGameFirstLevel.audio)
  const [selectedBtn, setSelectedBtn] = useState<undefined | number>(undefined)
  const [correctClick, setCorrectClick] = useState<undefined | boolean>(
    undefined
  )
  const [gradeLevel, { loading, client }] = useMutation<GradeLevelOneMutation>(
    GRADE_LEVEL_ONE_MUTATION,
    {
      onCompleted: ({ sortingGameGradeFirstLevel }) => {
        setPlayingAudio(true)
        switch (sortingGameGradeFirstLevel.status) {
          case 'CORRECT':
            setCorrectClick(true)
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
        if (sortingGameGradeFirstLevel.audio) {
          setFiles(sortingGameGradeFirstLevel.audio)
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
      //     variables: { id: sortingGameFirstLevel.game.id },
      //   },
      // ],
      awaitRefetchQueries: true,
    }
  )

  const handleClick = (selectedPhoneme: number) => {
    setSelectedBtn(selectedPhoneme)
    return gradeLevel({
      variables: {
        phoneme: selectedPhoneme,
        gameId: sortingGameFirstLevel.game.id,
      },
    })
  }

  const handleComplete = async () => {
    setCorrectClick(undefined)
    setSelectedBtn(undefined)
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: sortingGameFirstLevel.game.id },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'network-only',
    })
    setPlayingAudio(false)
  }

  const btnState = (optionId: number) => {
    if (selectedBtn != undefined) {
      if (selectedBtn == optionId) {
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
      title="Click on the correct vowel sound!"
      files={files}
      playingAudio={playingAudio}
      onComplete={() => handleComplete()}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {sortingGameFirstLevel.phonemes.map((option) => (
          <button
            className={`btn-lg btn h-32 normal-case ${btnState(option.id)}`}
            type="button"
            onClick={() => handleClick(option.id)}
            disabled={loading}
            key={option.id}
          >
            <div className="text-6xl">{option.name}</div>
          </button>
        ))}
      </div>
    </GameCard>
  )
}
