import type {
  DeleteGameMutationVariables,
  FindSortingGames,
} from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { QUERY } from 'src/components/SortingGame/SortingGamesCell'
import { timeTag, truncate } from 'src/lib/formatters'

const DELETE_GAME_MUTATION = gql`
  mutation DeleteGameMutation($id: Int!) {
    deleteGame(id: $id) {
      id
    }
  }
`

const GamesList = ({ sortingGames }: FindSortingGames) => {
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
            <th>Phonemes</th>
            <th>Level</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {sortingGames.map((game) => (
            <tr key={game.id}>
              <td>{truncate(game.id)}</td>
              <td>{truncate(game.userId)}</td>
              <td>{timeTag(game.createdAt)}</td>
              <td>{truncate(game.wordsPerPhoneme)}</td>
              <td>{truncate(game.phonemes.join(','))}</td>
              <td>{truncate(game.level)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.sortingGameIndividual({ id: game.id })}
                    title={'Show game ' + game.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
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
