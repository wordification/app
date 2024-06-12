import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import GameCard from 'src/components/GameCard/GameCard'
import { QUERY as LEVEL_QUERY } from 'src/components/SortingGame/SortingGameCell'

import SortingGameThirdLevelForm from './SortingGameThirdLevelForm'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindSortingGameThirdLevelQuery,
  FindSortingGameThirdLevelQueryVariables,
  GradeLevelThreeMutation,
  GradeLevelThreeMutationVariables,
} from 'types/graphql'

export const beforeQuery = (props: FindSortingGameThirdLevelQueryVariables) => {
  return {
    variables: props,
    fetchPolicy: 'no-cache',
  }
}

export const QUERY = gql`
  query FindSortingGameThirdLevelQuery($gameId: Int!) {
    sortingGameThirdLevel: sortingGameThirdLevel(gameId: $gameId) {
      game {
        id
      }
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
      status
      audio
    }
  }
`

export const Success = ({
  sortingGameThirdLevel,
}: CellSuccessProps<
  FindSortingGameThirdLevelQuery,
  FindSortingGameThirdLevelQueryVariables
>) => {
  const [playingAudio, setPlayingAudio] = useState(true)
  const [files, setFiles] = useState(sortingGameThirdLevel.audio)
  const [gradeLevel, { loading, client, error }] =
    useMutation<GradeLevelThreeMutation>(GRADE_LEVEL_THREE_MUTATION, {
      onCompleted: ({ sortingGameGradeThirdLevel }) => {
        switch (sortingGameGradeThirdLevel.status) {
          case 'CORRECT':
            toast.success('Correct!')
            break
          case 'INCORRECT':
            toast.error('Incorrect!')
            break
          case 'TOO_MANY_INCORRECT_GUESSES':
            toast.error('Too many incorrect guesses!')
            break
        }
        setPlayingAudio(true)
        if (sortingGameGradeThirdLevel.audio) {
          setFiles(sortingGameGradeThirdLevel.audio)
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
      //     variables: { id: sortingGameThirdLevel.game.id },
      //   },
      // ],
      awaitRefetchQueries: true,
    })

  const handleSubmit = (
    input: Omit<GradeLevelThreeMutationVariables, 'gameId'>
  ) => {
    gradeLevel({
      variables: {
        gameId: sortingGameThirdLevel.game.id,
        entry: input.entry,
      },
    })
  }

  const handleComplete = async () => {
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: sortingGameThirdLevel.game.id },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'network-only',
    })
    setPlayingAudio(false)
  }

  return (
    <GameCard
      title="Spell the word."
      files={files}
      playingAudio={playingAudio}
      onComplete={() => handleComplete()}
    >
      <SortingGameThirdLevelForm
        onSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </GameCard>
  )
}
