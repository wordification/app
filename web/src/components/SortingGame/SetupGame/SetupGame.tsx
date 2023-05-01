import type { CreateGameInput } from 'types/graphql'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import GameForm from 'src/components/SortingGame/GameForm'

const CREATE_GAME_MUTATION = gql`
  mutation CreateGameMutation($input: CreateGameInput!) {
    createGame(input: $input) {
      id
    }
  }
`

const NewGame = () => {
  const [createGame, { loading, error }] = useMutation(CREATE_GAME_MUTATION, {
    onCompleted: (a) => {
      console.log(a)
      toast.success('Game created')
      navigate(routes.games())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input: CreateGameInput) => {
    console.log(input)
    createGame({
      variables: {
        input: {
          ...input,
          type: 'SORTING',
        },
      },
    })
  }

  return (
    <div className="card bg-base-200 text-base-content">
      <div className="card-body">
        <header>
          <h2 className="card-title">New Game</h2>
        </header>
        <GameForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewGame
