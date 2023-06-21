import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import type { CreateGameMutation } from 'types/graphql'

const CREATE_GAME_MUTATION = gql`
  mutation CreateGameMutation($input: CreateGameInput!) {
    createGame(input: $input) {
      id
    }
  }
`

const SetupGamePage = () => {
  const [createGame, { loading, error }] = useMutation<CreateGameMutation>(
    CREATE_GAME_MUTATION,
    {
      onCompleted: ({ createGame }) => {
        toast.success('Game created!')
        navigate(routes.sortingGameIndividual({ id: createGame.id }))
      },
      onError: (error) => {
        toast.error(error.message)
      },
    }
  )

  if (!loading && !error) {
    createGame({
      variables: {
        input: {
          type: 'SORTING',
        },
      },
    })
  }

  return (
    <div className="card bg-base-200 text-base-content">
      <div className="card-body">
        <header>
          <h1 className="card-title">
            {error ? error.message : 'Creating New Game...'}
          </h1>
        </header>
      </div>
    </div>
  )
}

export default SetupGamePage
