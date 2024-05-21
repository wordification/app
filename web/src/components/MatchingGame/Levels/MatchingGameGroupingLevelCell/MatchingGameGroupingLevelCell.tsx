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
        graphemes
        currentUnitIndex
      }
      audio
      incompleteWords {
        id
        word
      }
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

  const [useIncompleteWords, setUseIncompleteWords] = useState<
    { __typename?: 'Word' | undefined; id: number; word: string }[]
  >([])
  const [useIndex, setUseIndex] = useState<number>(0)
  const [selectedWord, setSelectedWord] = useState<
    { __typename?: 'Word' | undefined; id: number; word: string } | undefined
  >(undefined)

  const [useSoundLabel, setUseSoundLabel] = useState<string>('')

  const [gradeLevel, { client }] =
    useMutation<GradeMatchingGameGroupingMutation>(
      GRADE_GROUPING_MATCHING_GAME_MUTATION,
      {
        fetchPolicy: 'no-cache',
        onCompleted: ({ groupingMatchingGameGrade }) => {
          if (groupingMatchingGameGrade.correct) {
            toast.success('Correct!')
            if (selectedWord !== undefined) {
              setUseIncompleteWords(
                useIncompleteWords.filter((word) => word.id !== selectedWord.id)
              )
            }
          } else {
            toast.error('Incorrect!')
          }
          setCheck(!check) // this triggers to change the color of the card
          setTimeout(() => {
            if (groupingMatchingGameGrade.audio) {
              setPlayingAudio(true)
              setFiles(groupingMatchingGameGrade.audio)
              setFlippedWords([])
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
    setPlayingAudio(true)
    const updatedFlippedWords = [...flippedWords, card]
    setFlippedWords(updatedFlippedWords)
    setSelectedWord(card)

    const { data } = await client.query({
      query: GET_AUDIO_QUERY,
      variables: {
        word: card.word,
      },
    })
    setFiles(data?.readWord)

    await handleGradeLevel(updatedFlippedWords[0])
  }

  const currentSoundLabel =
    matchingGameGroupingLevel.game.phonemes.length !== 0
      ? matchingGameGroupingLevel.phonemes.find(
          (p) =>
            p.id ===
            matchingGameGroupingLevel.game.phonemes[
              matchingGameGroupingLevel.game.currentUnitIndex ?? -1
            ]
        )?.name ?? 'ERROR'
      : matchingGameGroupingLevel.game.graphemes[
          matchingGameGroupingLevel.game.currentUnitIndex ?? -1
        ]

  if (useIncompleteWords.length === 0) {
    setUseIncompleteWords(matchingGameGroupingLevel.incompleteWords)
    setUseIndex(matchingGameGroupingLevel.game.currentUnitIndex ?? 0)
    setUseSoundLabel(currentSoundLabel)
  }

  const handleComplete = useCallback(async () => {
    setPlayingAudio(false)
    setSelectedWord(undefined)
    await client.query({
      query: LEVEL_QUERY,
      variables: { id: matchingGameGroupingLevel.game.id },
      notifyOnNetworkStatusChange: true,
      // fetchPolicy: 'no-cache',
    })

    setUseIncompleteWords(matchingGameGroupingLevel.incompleteWords)
    setUseIndex(matchingGameGroupingLevel.game.currentUnitIndex ?? 0)
    setUseSoundLabel(currentSoundLabel)
  }, [
    matchingGameGroupingLevel.game.id,
    matchingGameGroupingLevel.incompleteWords,
    matchingGameGroupingLevel.game.currentUnitIndex,
    currentSoundLabel,
    client,
  ])

  return (
    <>
      <div className="bg-w-dark-blue card shadow-2xl">
        <div className="card-body items-center justify-center">
          {currentSoundLabel !== 'ERROR' ? (
            <h2 className="card-title pb-3 text-6xl">
              Click all the words that have the &apos;{useSoundLabel}&apos;
              sound
            </h2>
          ) : (
            <h2 className="card-title pb-3 text-6xl">Good job!</h2>
          )}
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

              const isUseIncompleteWord = useIncompleteWords.some(
                (incompleteWord) => incompleteWord.id === word.id
              )
              const selected = flippedWords.some(
                (flippedWord) => flippedWord.id === word.id
              )

              return (
                <MatchingGameCard
                  key={word.id}
                  word={word.word}
                  flipped={
                    (matchingGameGroupingLevel.game.currentUnitIndex ?? 0) >
                    useIndex
                      ? !isUseIncompleteWord
                      : !isIncompleteWord
                  }
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
