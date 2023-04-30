import type { EditGameById, UpdateGameInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameForm from 'src/components/SortingGame/GameForm'

export const QUERY = gql`
  query EditGameById($id: Int!) {
    game: game(id: $id) {
      id
      userId
      date
      wordsPerPhoneme
      phonemeOne
      phonemeTwo
      level
    }
  }
`
const UPDATE_GAME_MUTATION = gql`
  mutation UpdateGameMutation($id: Int!, $input: UpdateGameInput!) {
    updateGame(id: $id, input: $input) {
      id
      userId
      date
      wordsPerPhoneme
      phonemeOne
      phonemeTwo
      level
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
)

export const Success = ({ game }: CellSuccessProps<EditGameById>) => {
  const [updateGame, { loading, error }] = useMutation(UPDATE_GAME_MUTATION, {
    onCompleted: () => {
      toast.success('Game updated')
      navigate(routes.games())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: UpdateGameInput, id: number) => {
    updateGame({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Game {game?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <GameForm game={game} onSave={onSave} error={error} loading={loading} />
      </div>
    </div>
  )
}
