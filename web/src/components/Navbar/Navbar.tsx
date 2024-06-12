/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Link, navigate, routes, useLocation } from '@redwoodjs/router'
import { toast } from '@redwoodjs/web/toast'

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

  const handleSignout = () => {
    logOut()
    toast.success('Goodbye!')
    navigate(routes.landing())
  }

  return (
    <button onClick={handleSignout} className="font-bold normal-case">
      Sign Out
    </button>
  )
}

const NavbarItem = ({ item }: { item: MenuItem }) => (
  <li>
    {'to' in item ? (
      item.to === '/#about' ? (
        <a className="font-bold normal-case" href="/#about">
          {item.label}
        </a>
      ) : (
        <Link className="font-bold normal-case" to={item.to}>
          {item.label}
        </Link>
      )
    ) : (
      <SignoutButton />
    )}
  </li>
)

const Navbar = ({ items }: { items: readonly MenuItem[] }) => {
  const { hasRole } = useAuth()
  const location = useLocation()
  const isRootPath =
    location.pathname === routes.landing() ||
    location.pathname === routes.supporters() ||
    location.pathname === routes.contributors() ||
    location.pathname === routes.demonstration() ||
    location.pathname === routes.presentation()

  const roleRoute = isRootPath ? routes.games() : routes.landing()
    // ? routes.landing()
    // : hasRole('SUPERUSER')
    // ? routes.superuserDashboard()
    // : hasRole('ADMINISTRATOR')
    // ? routes.adminDashboard()
    // : hasRole('TEACHER')
    // ? routes.dashboard()
    // : hasRole('STUDENT')
    // ? routes.games()
    // : routes.landing()
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn-ghost btn lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box menu-sm z-50 mt-3 w-52 bg-secondary p-2 shadow"
            >
              {items.map((item) => (
                <NavbarItem
                  item={item}
                  key={'to' in item ? item.to : item.type}
                />
              ))}
            </ul>
          </div>
          <Link
            className="font-gabarito btn-ghost btn mr-10 rounded-none text-xl normal-case"
            to={roleRoute}
          >
            <div className="text-xl text-base-100">Wordification</div>
          </Link>
          {hasRole('SUPERUSER') && !isRootPath && <SuperuserViewSelector />}
        </div>
        <div className="navbar-end">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal text-base-100">
              {items.map((item) => (
                <NavbarItem
                  item={item}
                  key={'to' in item ? item.to : item.type}
                />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
