import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/dist/toast'

import { useAuth } from 'src/auth'
import { truncate, timeTag } from 'src/lib/formatters'

import { QUERY } from '../StudentGamesInfoCell'

import type { DeleteGameMutationVariables, Game } from 'types/graphql'

const DELETE_GAME_MUTATION = gql`
  mutation DeleteGameMutation($id: Int!) {
    deleteGame(id: $id) {
      id
    }
  }
`

const StudentGamesList = ({
  userId,
  complete,
}: {
  userId: number
  complete?: boolean
}) => {
  const { data, loading, error } = useQuery(QUERY, { variables: { userId } })
  const { hasRole } = useAuth()

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
    refetchQueries: [{ query: QUERY, variables: { userId } }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id: DeleteGameMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete game ' + id + '?')) {
      deleteGame({ variables: { id } })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const { games } = data

  const incompleteGames = games.filter((game: Game) => !game.complete)
  const completeGames = games.filter((game: Game) => game.complete)

  const filteredGames =
    complete !== undefined
      ? complete
        ? completeGames
        : incompleteGames
      : games

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold">
        {complete !== undefined
          ? complete
            ? 'Complete Games'
            : 'Incomplete Games'
          : 'All Games'}
      </h1>
      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Last Played</th>
              <th>Game Type</th>
              <th># of Words</th>
              <th>Phonemes</th>
              <th>Level</th>
              <th>Complete</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.map((game: Game) => (
              <tr key={game.id}>
                <td>{truncate(game.id)}</td>
                <td>{truncate(game.user?.email)}</td>
                <td>{timeTag(game.updatedAt)}</td>
                <td>{truncate(game.type)}</td>
                <td>{truncate(game.wordsPerUnit * game.phonemes.length)}</td>
                <td>{truncate(game.phonemes.join(' & '))}</td>
                <td>{truncate(game.level)}</td>
                <td>{game.complete ? 'Y' : 'N'}</td>
                <td>
                  {(hasRole('TEACHER') || hasRole('SUPERUSER')) && (
                    <button
                      type="button"
                      title={'Delete game ' + game.id}
                      className="btn-outline btn-error btn-xs btn"
                      onClick={() => onDeleteClick(game.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StudentGamesList
