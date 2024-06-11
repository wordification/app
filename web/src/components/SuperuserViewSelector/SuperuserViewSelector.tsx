/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */

import { Link, routes, useLocation } from '@redwoodjs/router'
import { useEffect, useState } from 'react'

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
const SuperuserViewSelector = () => {
  const location = useLocation()
  const [role, setRole] = useState('')

  useEffect(() => {
    const path = location.pathname
    // Update the role based on the current path
    if (path.includes('demo')) {
      setRole('SUPERUSER')
    } else if (path.includes('admin')) {
      setRole('ADMINISTRATOR')
    } else if (path.includes('dashboard')) {
      setRole('TEACHER')
    } else {
      setRole('STUDENT')
    }
  }, [location])

  return (
    <>
      <div className="dropdown-end dropdown z-50">
        <label tabIndex={0} className="btn-accent rounded-btn btn m-1">
          Select Role
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-50 mt-4 w-52 bg-secondary p-2 shadow"
        >
          <li className="group">
            <Link
              className="font-bold normal-case text-base-100 group-hover:text-amber"
              to={routes.superuserDashboard()}
            >
              SUPERUSER
            </Link>
          </li>
          <li className="group">
            <Link
              className="font-bold normal-case text-base-100 group-hover:text-amber"
              to={routes.adminDashboard()}
            >
              ADMINISTRATOR
            </Link>
          </li>
          <li className="group">
            <Link
              className="font-bold normal-case text-base-100 group-hover:text-amber"
              to={routes.dashboard()}
            >
              TEACHER
            </Link>
          </li>
          <li className="group">
            <Link
              className="font-bold normal-case text-base-100 group-hover:text-amber"
              to={routes.games()}
            >
              STUDENT
            </Link>
          </li>
        </ul>
      </div>
      <h1 className="ml-2 hidden font-bold normal-case text-base-100 lg:block">
        CURRENT ROLE: {'\u00A0\u00A0'}
        <span className="text-amber">
          {role}
        </span>
      </h1>
    </>
  )
}

export default SuperuserViewSelector
