import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useState } from 'react'

import MatchingGameCard from '../../MatchingGameCard/MatchingGameCard'
import { QUERY as LEVEL_QUERY } from '../../MatchingGameCell/MatchingGameCell'

import type {
  FindMatchingGamePlayLevelQuery,
  FindMatchingGamePlayLevelQueryVariables,
  GradeMatchingGameMutation,
} from 'types/graphql'

type MatchingCard = {
  id: number
  word: string
  testedPhonemes: number[]
}

export const beforeQuery = (props: FindMatchingGamePlayLevelQueryVariables) => {
  return {
    variables: props,
    fetchPolicy: 'network-only',
  }
}

export const QUERY = gql`
  query FindMatchingGamePlayLevelQuery($gameId: Int!) {
    matchingGamePlayLevel: matchingGamePlayLevel(gameId: $gameId) {
      game {
        id
        allWords {
          id
          word
          testedPhonemes
        }
      }
      audio
      incompleteWords {
        id
        word
        testedPhonemes
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMatchingGamePlayLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const GRADE_MATCHING_GAME_MUTATION = gql`
  mutation GradeMatchingGameMutation(
    $gameId: Int!
    $firstWordId: Int!
    $secondWordId: Int!
  ) {
    matchingGameGrade(
      gameId: $gameId
      firstWordId: $firstWordId
      secondWordId: $secondWordId
    ) {
      correct
    }
  }
`

const GET_AUDIO_QUERY = gql`
  query ReadWordQuery($word: String!) {
    readWord(word: $word)
  }
`

export const Success = ({
  matchingGamePlayLevel,
}: CellSuccessProps<
  FindMatchingGamePlayLevelQuery,
  FindMatchingGamePlayLevelQueryVariables
>) => {
  const [playingAudio, setPlayingAudio] = useState(false)
  const [files, setFiles] = useState(matchingGamePlayLevel.audio)

  const [gradeLevel, { client }] = useMutation<GradeMatchingGameMutation>(
    GRADE_MATCHING_GAME_MUTATION,
    {
      fetchPolicy: 'no-cache',
      onCompleted: ({ matchingGameGrade }) => {
        if (matchingGameGrade.correct) {
          toast.success('Correct!')
        } else {
          toast.error('Incorrect!')
        }

        setCheck(!check)

        /** TODO: INTRO AUDIO */
        // if (matchingGameGrade.audio) {
        //   setFiles(matchingGameGrade.audio)
        // }
      },
      onError: (error) => {
        toast.error(error.message)
      },
      // This refetches the query. Read more about other ways to
      // update the cache over here:
      // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
      refetchQueries: [
        {
          query: QUERY,
          variables: { gameId: matchingGamePlayLevel.game.id },
          notifyOnNetworkStatusChange: true,
          fetchPolicy: 'no-cache',
        },
      ],
      awaitRefetchQueries: true,
      notifyOnNetworkStatusChange: true,
    }
  )

  const [flippedWords, setFlippedWords] = useState<MatchingCard[]>([])
  const [check, setCheck] = useState<boolean>(false)

  const handleGradeLevel = async (
    firstWord: MatchingCard,
    secondWord: MatchingCard
  ) => {
    return gradeLevel({
      variables: {
        gameId: matchingGamePlayLevel.game.id,
        firstWordId: firstWord.id,
        secondWordId: secondWord.id,
      },
    })
  }

  const flipCard = async (card: MatchingCard) => {
    const updatedFlippedWords = [...flippedWords, card]
    setFlippedWords(updatedFlippedWords)

    setPlayingAudio(true)

    const { data } = await client.query({
      query: GET_AUDIO_QUERY,
      variables: {
        word: card.word,
      },
    })

    setFiles(data?.readWord)
    setPlayingAudio(false)

    if (updatedFlippedWords.length === 2) {
      await handleGradeLevel(updatedFlippedWords[0], updatedFlippedWords[1])
      setFlippedWords([])

      // if (matchingGamePlayLevel.incompleteWords) {
      //   await client.query({
      //     query: LEVEL_QUERY,
      //     variables: { id: matchingGamePlayLevel.game.id },
      //     notifyOnNetworkStatusChange: true,
      //     // fetchPolicy: 'no-cache',
      //   })
      // }
    }
  }

  const handleComplete = async () => {
    setPlayingAudio(false)
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: matchingGamePlayLevel.game.id },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'no-cache',
    })
  }

  return (
    <div className="card bg-base-100 text-base-content shadow-2xl">
      <div className="card-body items-center justify-center">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {matchingGamePlayLevel.game.allWords.map((word) => {
            const isIncompleteWord = matchingGamePlayLevel.incompleteWords.some(
              (incompleteWord) => incompleteWord.id === word.id
            )

            return (
              <>
                <MatchingGameCard
                  key={word.id}
                  word={word.word}
                  flipped={!isIncompleteWord}
                  check={check}
                  disabled={playingAudio}
                  files={files}
                  onClick={() => flipCard(word)}
                  onComplete={() => handleComplete()}
                />
              </>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
