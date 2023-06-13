import { MetaTags } from '@redwoodjs/web'

import Importance from 'src/components/LandingPage/Importance/Importance'
import Introduction from 'src/components/LandingPage/Introduction/Introduction'
import Issues from 'src/components/LandingPage/Issues/Issues'
import Solution from 'src/components/LandingPage/Solution/Solution'
import Transition from 'src/components/LandingPage/Transition/Transition'
import Navbar from 'src/components/Navbar/Navbar'

const MENU_ITEMS = [
  {
    to: '/login',
    label: 'Sign In',
  },
] as const

const LandingPage = () => {
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <Navbar items={MENU_ITEMS} />

      <Introduction />
      <Importance />
      <Issues />
      <Transition />
      <Solution />

      <footer className="mx-auto w-full bg-base-300 p-4 text-center">
        <p>&copy; 2023 Wordification</p>
      </footer>
    </>
  )
}

export default LandingPage
