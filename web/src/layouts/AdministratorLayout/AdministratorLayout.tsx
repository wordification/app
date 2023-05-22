import { SkipNavLink, SkipNavContent } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/dist/toast'

import Navbar from 'src/components/Navbar/Navbar'

type AdministratorLayoutProps = {
  children?: React.ReactNode
}

const MENU_ITEMS = [
  {
    to: '/admin-dashboard',
    label: 'Dashboard',
  },
  {
    type: 'signout',
  },
] as const

const AdministratorLayout = ({ children }: AdministratorLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipNavLink />
      <Toaster />

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

export default AdministratorLayout
