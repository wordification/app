import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useState } from 'react'

import { QUERY as LEVEL_QUERY } from 'src/components/BuildingGame/BuildingGameCell/BuildingGameCell'
import GameCard from 'src/components/GameCard/GameCard'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindBuildingGamePlayLevelQuery,
  FindBuildingGamePlayLevelQueryVariables,
  GradeBuildingGameMutation,
} from 'types/graphql'

export const beforeQuery = (props: FindBuildingGamePlayLevelQueryVariables) => {
  return {
    variables: props,
    fetchPolicy: 'cache-and-network',
    // notifyOnNetworkStatusChange: true,
  }
}

export const QUERY = gql`
  query FindBuildingGamePlayLevelQuery($gameId: Int!) {
    buildingGamePlayLevel: buildingGamePlayLevel(gameId: $gameId) {
      game {
        id
        currentWordId
      }
      audio
      choppedWord
      onsList
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindBuildingGamePlayLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const GRADE_BUILDING_GAME_MUTATION = gql`
  mutation GradeBuildingGameMutation($gameId: Int!, $ons: String!) {
    buildingGameGrade(gameId: $gameId, ons: $ons) {
      correct
      audio
    }
  }
`

export const Success = ({
  buildingGamePlayLevel,
}: CellSuccessProps<
  FindBuildingGamePlayLevelQuery,
  FindBuildingGamePlayLevelQueryVariables
>) => {
  const [playingAudio, setPlayingAudio] = useState(true)
  const [files, setFiles] = useState(buildingGamePlayLevel.audio)
  const [selectedBtn, setSelectedBtn] = useState<undefined | string>(undefined)
  const [correctClick, setCorrectClick] = useState<undefined | boolean>(
    undefined
  )
  const [useOns, setUseOns] = useState<string[]>([])
  const [useChopWord, setUseChopWord] = useState<string>('')

  const [gradeLevel, { loading, client }] =
    useMutation<GradeBuildingGameMutation>(GRADE_BUILDING_GAME_MUTATION, {
      onCompleted: ({ buildingGameGrade }) => {
        switch (buildingGameGrade.correct) {
          case true:
            setCorrectClick(true)
            setPlayingAudio(true)
            toast.success('Correct!')
            break
          case false:
            setCorrectClick(false)
            setPlayingAudio(true)
            toast.error('Incorrect!')
        }
        if (buildingGameGrade.audio) {
          setFiles(buildingGameGrade.audio)
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        {
          query: QUERY,
          variables: { gameId: buildingGamePlayLevel.game.id },
          notifyOnNetworkStatusChange: true,
          fetchPolicy: 'network-only',
        },
      ],
      awaitRefetchQueries: true,
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'no-cache',
    })

  const handleClick = (selectedOns: string) => {
    setSelectedBtn(selectedOns)
    return gradeLevel({
      variables: {
        ons: selectedOns,
        gameId: buildingGamePlayLevel.game.id,
      },
    })
  }

  if (useOns.length === 0) {
    setUseOns(buildingGamePlayLevel.onsList)
    setUseChopWord(buildingGamePlayLevel.choppedWord)
  }

  const handleComplete = async () => {
    const tmpCorrect = correctClick
    setCorrectClick(undefined)
    setSelectedBtn(undefined)

    const gameId = buildingGamePlayLevel.game.id // Extract the game ID
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: gameId },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'network-only',
    })

    setUseOns(buildingGamePlayLevel.onsList)
    setUseChopWord(buildingGamePlayLevel.choppedWord)
    setPlayingAudio(false)

    setFiles(buildingGamePlayLevel.audio)
    if (tmpCorrect === true) {
      setPlayingAudio(true)
    }
  }

  console.log(playingAudio)

  const btnState = (ons: string) => {
    if (selectedBtn != undefined) {
      if (selectedBtn == ons) {
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
    <>
      <GameCard
        title="Select a letter to build the word!"
        files={files}
        playingAudio={playingAudio}
        onComplete={() => handleComplete()}
      >
        {useChopWord === 'Complete' ? (
          <div className="card-title mt-5">Good job!</div>
        ) : (
          <div className="card-title mb-5 ml-10 mt-5">
            <div className="chopword-box">{`_${useChopWord}`}</div>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          {useOns.map((option: string, index: number) => (
            <button
              className={`btn-game-yellow h-25 btn-lg btn normal-case ${btnState(
                option
              )}`}
              type="button"
              onClick={() => handleClick(option)}
              disabled={loading}
              key={index}
            >
              <div className="small-answer-text">{option}</div>
            </button>
          ))}
        </div>
      </GameCard>
    </>
  )
}
