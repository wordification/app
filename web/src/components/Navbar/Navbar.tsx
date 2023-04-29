import { Link, routes } from '@redwoodjs/router'
export type MenuItem = {
  to: string
  label: string
  submenu?: readonly {
    url: string
    label: string
  }[]
}

const NavbarItem = ({ item }: { item: MenuItem }) => (
  <li>
    <Link className="font-bold normal-case" to={item.to}>
      {item.label}
    </Link>
  </li>
)

const Navbar = ({ items }: { items: readonly MenuItem[] }) => (
  <nav className="navbar">
    <div className="navbar-start">
      <Link
        className="btn-ghost btn rounded-none text-xl normal-case text-primary"
        to={routes.home()}
      >
        Wordification
      </Link>
    </div>
    <div className="navbar-end">
      <ul className="menu menu-horizontal">
        {items.map((item) => (
          <NavbarItem item={item} key={item.to} />
        ))}
      </ul>
    </div>
  </nav>
)

export default Navbar
