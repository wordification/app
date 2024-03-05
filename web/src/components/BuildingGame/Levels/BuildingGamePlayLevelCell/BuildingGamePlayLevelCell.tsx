import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'
import { useCallback, useState } from 'react'

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
  const [playingAudio, setPlayingAudio] = useState(false)
  const [files, setFiles] = useState(buildingGamePlayLevel.audio)

  const [gradeLevel, { client }] = useMutation<GradeBuildingGameMutation>(
    GRADE_BUILDING_GAME_MUTATION,
    {
      onCompleted: ({ buildingGameGrade }) => {
        switch (buildingGameGrade.correct) {
          case true:
            setPlayingAudio(true)
            toast.success('Correct!')
            break
          case false:
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
    }
  )

  const handleClick = (selectedOns: string) => {
    return gradeLevel({
      variables: {
        ons: selectedOns,
        gameId: buildingGamePlayLevel.game.id,
      },
    })
  }

  const handleComplete = useCallback(async () => {
    setPlayingAudio(false)
    console.log(typeof buildingGamePlayLevel.game.id)
    const gameId = buildingGamePlayLevel.game.id // Extract the game ID
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: gameId },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'network-only',
    })
    setFiles(buildingGamePlayLevel.audio)
  }, [buildingGamePlayLevel.game.id, buildingGamePlayLevel.audio, client])

  return (
    <>
      <GameCard
        title="Select a letter to build the word!"
        files={files}
        onComplete={() => handleComplete()}
      >
        <div className="grid grid-cols-2 gap-4">
          {buildingGamePlayLevel.onsList.map(
            (option: string, index: number) => (
              <button
                className="btn-secondary btn normal-case"
                type="button"
                onClick={() => handleClick(option)}
                disabled={playingAudio}
                key={index}
              >
                {option}
              </button>
            )
          )}
        </div>
        <div className="card-title mt-5">
          {`__${buildingGamePlayLevel.choppedWord}`}
        </div>
      </GameCard>
    </>
  )
}
