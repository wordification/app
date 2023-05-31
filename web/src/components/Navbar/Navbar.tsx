import { Link, routes } from '@redwoodjs/router'

import { useAuth } from 'src/auth'

import SuperuserViewSelector from '../SuperuserViewSelector/SuperuserViewSelector'
export type MenuItem =
  | {
      to: string
      label: string
      submenu?: readonly {
        url: string
        label: string
      }[]
    }
  | {
      type: 'signout'
    }

const SignoutButton = () => {
  const { logOut } = useAuth()

  return (
    <button onClick={logOut} className="font-bold normal-case">
      Sign Out
    </button>
  )
}

const NavbarItem = ({ item }: { item: MenuItem }) => (
  <li>
    {'to' in item ? (
      <Link className="font-bold normal-case" to={item.to}>
        {item.label}
      </Link>
    ) : (
      <SignoutButton />
    )}
  </li>
)

const Navbar = ({ items }: { items: readonly MenuItem[] }) => {
  const { hasRole } = useAuth()
  const roleRoute = hasRole('SUPERUSER')
    ? routes.superuserDashboard()
    : hasRole('ADMINISTRATOR')
    ? routes.adminDashboard()
    : hasRole('TEACHER')
    ? routes.dashboard()
    : routes.home()
  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link
          className="btn-ghost btn mr-10 rounded-none text-xl normal-case text-primary"
          to={roleRoute}
        >
          Wordification
        </Link>
        <SuperuserViewSelector />
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal">
          {items.map((item) => (
            <NavbarItem item={item} key={'to' in item ? item.to : item.type} />
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
