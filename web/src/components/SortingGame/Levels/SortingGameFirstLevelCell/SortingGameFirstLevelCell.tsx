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
  const [playingAudio, setPlayingAudio] = useState(false)
  const [files, setFiles] = useState(sortingGameFirstLevel.audio)
  const [gradeLevel, { loading, client }] = useMutation<GradeLevelOneMutation>(
    GRADE_LEVEL_ONE_MUTATION,
    {
      onCompleted: ({ sortingGameGradeFirstLevel }) => {
        switch (sortingGameGradeFirstLevel.status) {
          case 'CORRECT':
            setPlayingAudio(true)
            toast.success('Correct!')
            break
          case 'INCORRECT':
            toast.error('Incorrect!')
            break
          case 'TOO_MANY_INCORRECT_GUESSES':
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
    return gradeLevel({
      variables: {
        phoneme: selectedPhoneme,
        gameId: sortingGameFirstLevel.game.id,
      },
    })
  }

  const handleComplete = async () => {
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: sortingGameFirstLevel.game.id },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'network-only',
    })
  }

  return (
    <GameCard
      title="Click on the correct vowel sound!"
      files={files}
      onComplete={() => handleComplete()}
    >
      <div className="grid grid-cols-2 gap-4">
        {sortingGameFirstLevel.phonemes.map((option) => (
          <button
            className="btn-game-yellow btn-lg btn normal-case"
            type="button"
            onClick={() => handleClick(option.id)}
            disabled={loading || playingAudio}
            key={option.id}
          >
            {option.name}
          </button>
        ))}
      </div>
    </GameCard>
  )
}
