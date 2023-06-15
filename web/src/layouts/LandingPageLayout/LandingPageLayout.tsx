import { SkipNavContent, SkipNavLink } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

import Navbar from 'src/components/Navbar'

type LandingPageLayoutProps = {
  children?: React.ReactNode
}

const MENU_ITEMS = [
  {
    to: '/login',
    label: 'Sign In',
  },
] as const

const LandingPageLayout = ({ children }: LandingPageLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipNavLink />
      <Toaster />

      <header className="bg-base-300">
        <Navbar items={MENU_ITEMS} />
      </header>

      <SkipNavContent />

      <main>{children}</main>
      <footer className="mx-auto w-full bg-base-300 p-4 text-center">
        <p>&copy; 2023 Wordification</p>
      </footer>
    </div>
  )
}

export default LandingPageLayout
