import { SkipNavLink, SkipNavContent } from '@redwoodjs/router'

import Navbar from 'src/components/Navbar/Navbar'

import '@reach/skip-nav/styles.css'

type GlobalLayoutProps = {
  children?: React.ReactNode
}

const MENU_ITEMS = [
  {
    to: '/about',
    label: 'About',
  },
  {
    to: '/games',
    label: 'Games',
  },
  // {
  //   to: routes.home(),
  //   label: 'Profile',
  // },
  // {
  //   to: routes.home(),
  //   label: 'Sign Out',
  // },
] as const

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipNavLink />

      <header className="bg-base-300">
        <Navbar items={MENU_ITEMS} />
      </header>

      <SkipNavContent />

      <main className="container mx-auto flex-grow p-4 md:px-8">
        {children}
      </main>
      <footer className="mx-auto w-full bg-base-300 p-4 text-center">
        <p>&copy; 2023 Wordification</p>
      </footer>
    </div>
  )
}

export default GlobalLayout
