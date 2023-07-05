import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

type ClassGameSetupMenuPageProps = {
  id?: string
}

const MENU_ITEMS = [
  {
    title: 'Sorting Game Setup',
    content:
      'Set game rules/specifications for your entire class for sorting game',
  },
  {
    title: 'Matching Game Setup',
    content:
      'Set game rules/specifications for your entire class for matching game',
  },
] as const

const DashboardClassGameSetupMenuPage = ({
  id,
}: ClassGameSetupMenuPageProps) => {
  return (
    <>
      <MetaTags
        title="ClassGameSetupMenu"
        description="ClassGameSetupMenu page"
      />

      <h1 className="text-xl font-bold">Select a Game Type</h1>
      <ul className="grid gap-4 sm:grid-cols-3">
        {MENU_ITEMS.map((item, index) => {
          const type = index === 0 ? 'sorting' : 'matching'
          return (
            <Link
              to={routes.classGameSetup({ id: id, type: type })}
              key={index}
              className="card shadow-lg hover:shadow-xl"
            >
              <li className="card-body">
                <h3 className="card-title">{item.title}</h3>
                <p>{item.content}</p>
              </li>
            </Link>
          )
        })}
      </ul>
    </>
  )
}

export default DashboardClassGameSetupMenuPage
