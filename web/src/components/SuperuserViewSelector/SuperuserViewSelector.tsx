/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
const SuperuserViewSelector = () => {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn-primary rounded-btn btn m-1">
        Select Role
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box mt-4 w-52 bg-secondary p-2 shadow"
      >
        <li>
          <a>ADMINISTRATOR</a>
        </li>
        <li>
          <a>TEACHER</a>
        </li>
        <li>
          <a>STUDENT</a>
        </li>
      </ul>
    </div>
  )
}

export default SuperuserViewSelector
