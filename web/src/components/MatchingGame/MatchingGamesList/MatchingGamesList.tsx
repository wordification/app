import { Link, routes } from '@redwoodjs/router'

import { timeTag, truncate } from 'src/lib/formatters'

import type { FindMatchingGames } from 'types/graphql'

const MatchingGamesList = ({ matchingGames }: FindMatchingGames) => {
  return (
    <>
      <h1 className="text-5xl font-bold pb-3">Matching Games</h1>

      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr className="text-2xl">
              <th>ID</th>
              <th>User</th>
              <th>Last Played</th>
              <th># of Words</th>
              <th>Phonemes</th>
              <th>Level</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {matchingGames.map((game) => (
              <tr className="text-xl" key={game.id}>
                <td>{truncate(game.id)}</td>
                <td>{truncate(game.user?.email)}</td>
                <td>{timeTag(game.updatedAt)}</td>
                <td>{truncate(game.wordsPerUnit * game.phonemes.length)}</td>
                <td>{truncate(game.phonemes.join(' & '))}</td>
                <td>{truncate(game.level)}</td>
                <td>
                  <Link
                    to={routes.matchingGameIndividual({ id: game.id })}
                    title={'Resume game ' + game.id}
                    className="btn-primary btn-outline btn-xs btn"
                  >
                    Resume
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default MatchingGamesList
