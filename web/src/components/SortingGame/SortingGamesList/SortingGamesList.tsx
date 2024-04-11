import { Link, routes } from '@redwoodjs/router'

import { timeTag, truncate } from 'src/lib/formatters'

import type { FindSortingGames } from 'types/graphql'

const SortingGamesList = ({ sortingGames }: FindSortingGames) => {
  return (
    <>
      <h1 className="text-5xl font-bold pb-3">Sorting Games</h1>

      <div className="overflow-x-auto">
        <table className="table-zebra table w-full">
          <thead>
            <tr>
              <th className="text-2xl">ID</th>
              <th className="text-2xl">User</th>
              <th className="text-2xl">Last Played</th>
              <th className="text-2xl"># of Words</th>
              <th className="text-2xl">Phonemes</th>
              <th className="text-2xl">Level</th>
              <th className="text-2xl">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            {sortingGames.map((game) => (
              <tr key={game.id}>
                <td className="text-xl">{truncate(game.id)}</td>
                <td className="text-xl">{truncate(game.user?.email)}</td>
                <td className="text-xl">{timeTag(game.updatedAt)}</td>
                <td className="text-xl">{truncate(game.wordsPerUnit * game.phonemes.length)}</td>
                <td className="text-xl">{truncate(game.phonemes.join(' & '))}</td>
                <td className="text-xl">{truncate(game.level)}</td>
                <td className="text-xl">
                  <Link
                    to={routes.sortingGameIndividual({ id: game.id })}
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

export default SortingGamesList
