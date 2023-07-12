import {
  type CellSuccessProps,
  type CellFailureProps,
  useMutation,
} from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useCallback, useState } from 'react'

import Player from 'src/components/Player/Player'

import MatchingGameCard from '../../MatchingGameCard/MatchingGameCard'
import { QUERY as LEVEL_QUERY } from '../../MatchingGameCell/MatchingGameCell'

import type {
  FindMatchingGameGroupingLevelQuery,
  FindMatchingGameGroupingLevelQueryVariables,
  GradeMatchingGameGroupingMutation,
} from 'types/graphql'

type MatchingCard = {
  id: number
  word: string
}

export const beforeQuery = (
  props: FindMatchingGameGroupingLevelQueryVariables
) => {
  return {
    variables: props,
    fetchPolicy: 'network-only',
  }
}

export const QUERY = gql`
  query FindMatchingGameGroupingLevelQuery($gameId: Int!) {
    matchingGameGroupingLevel: matchingGamePlayLevel(gameId: $gameId) {
      game {
        id
        allWords {
          id
          word
          testedPhonemes
        }
        phonemes
        currentPhonemeId
      }
      audio
      incompleteWords {
        id
        word
      }
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindMatchingGameGroupingLevelQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

const GRADE_GROUPING_MATCHING_GAME_MUTATION = gql`
  mutation GradeGroupingMatchingGameMutation($gameId: Int!, $wordId: Int!) {
    groupingMatchingGameGrade(gameId: $gameId, wordId: $wordId) {
      correct
      audio
    }
  }
`

const GET_AUDIO_QUERY = gql`
  query ReadWordQuery($word: String!) {
    readWord(word: $word)
  }
`

export const Success = ({
  matchingGameGroupingLevel,
}: CellSuccessProps<
  FindMatchingGameGroupingLevelQuery,
  FindMatchingGameGroupingLevelQueryVariables
>) => {
  const [playingAudio, setPlayingAudio] = useState(false)
  const [files, setFiles] = useState(matchingGameGroupingLevel.audio)

  const [gradeLevel, { client }] =
    useMutation<GradeMatchingGameGroupingMutation>(
      GRADE_GROUPING_MATCHING_GAME_MUTATION,
      {
        fetchPolicy: 'no-cache',
        onCompleted: ({ groupingMatchingGameGrade }) => {
          if (groupingMatchingGameGrade.correct) {
            toast.success('Correct!')
          } else {
            toast.error('Incorrect!')
          }

          setCheck(!check)
          setFlippedWords([])

          setTimeout(() => {
            if (groupingMatchingGameGrade.audio) {
              setPlayingAudio(true)
              setFiles(groupingMatchingGameGrade.audio)
            }
          }, 1500)
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
            variables: { gameId: matchingGameGroupingLevel.game.id },
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

  const handleGradeLevel = async (word: MatchingCard) => {
    return gradeLevel({
      variables: {
        gameId: matchingGameGroupingLevel.game.id,
        wordId: word.id,
      },
    })
  }

  const flipCard = async (card: MatchingCard) => {
    const updatedFlippedWords = [...flippedWords, card]
    setFlippedWords(updatedFlippedWords)

    const { data } = await client.query({
      query: GET_AUDIO_QUERY,
      variables: {
        word: card.word,
      },
    })

    setFiles(data?.readWord)
    setPlayingAudio(true)

    await handleGradeLevel(updatedFlippedWords[0])
  }

  const handleComplete = useCallback(async () => {
    setPlayingAudio(false)
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: matchingGameGroupingLevel.game.id },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'no-cache',
    })
  }, [matchingGameGroupingLevel.game.id, client])

  const currentPhonemeName =
    matchingGameGroupingLevel.game.currentPhonemeId === 49 ? 'Long I' : 'Long O'

  return (
    <>
      <div className="card bg-base-100 text-base-content shadow-2xl">
        <div className="card-body items-center justify-center">
          <h2 className="card-title">
            Click all the words that have the &apos;{currentPhonemeName}&apos;
            sound
          </h2>
          <ul
            className={`grid grid-cols-2 gap-4 ${
              matchingGameGroupingLevel.game.allWords.length === 24
                ? 'md:grid-cols-6'
                : matchingGameGroupingLevel.game.allWords.length === 20
                ? 'md:grid-cols-5'
                : 'md:grid-cols-4'
            }`}
          >
            {matchingGameGroupingLevel.game.allWords.map((word) => {
              const isIncompleteWord =
                matchingGameGroupingLevel.incompleteWords.some(
                  (incompleteWord) => incompleteWord.id === word.id
                )
              const selected = flippedWords.some(
                (flippedWord) => flippedWord.id === word.id
              )

              return (
                <MatchingGameCard
                  key={word.id}
                  word={word.word}
                  flipped={!isIncompleteWord}
                  check={check}
                  disabled={playingAudio || selected}
                  onClick={() => flipCard(word)}
                  grouping={true}
                />
              )
            })}
          </ul>
        </div>
      </div>
      {files && <Player files={files} onComplete={handleComplete} />}
    </>
  )
}
