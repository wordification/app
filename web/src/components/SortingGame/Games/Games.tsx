import type { DeleteGameMutationVariables, FindGames } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/SortingGame/GamesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_GAME_MUTATION = gql`
  mutation DeleteGameMutation($id: Int!) {
    deleteGame(id: $id) {
      id
    }
  }
`

const GamesList = ({ games }: FindGames) => {
  const [deleteGame] = useMutation(DELETE_GAME_MUTATION, {
    onCompleted: () => {
      toast.success('Game deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteGameMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete game ' + id + '?')) {
      deleteGame({ variables: { id } })
    }
  }

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>User id</th>
            <th>Date</th>
            <th>Words per phoneme</th>
            <th>Phoneme one</th>
            <th>Phoneme two</th>
            <th>Level</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{truncate(game.id)}</td>
              <td>{truncate(game.userId)}</td>
              <td>{timeTag(game.date)}</td>
              <td>{truncate(game.wordsPerPhoneme)}</td>
              <td>{truncate(game.phonemeOne)}</td>
              <td>{truncate(game.phonemeTwo)}</td>
              <td>{truncate(game.level)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.game({ id: game.id })}
                    title={'Show game ' + game.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editGame({ id: game.id })}
                    title={'Edit game ' + game.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete game ' + game.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(game.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GamesList
