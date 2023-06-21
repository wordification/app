import { MetaTags } from '@redwoodjs/web'

import Introduction from 'src/components/LandingPage/Introduction/Introduction'
import LandingAccordian from 'src/components/LandingPage/LandingAccordian/LandingAccordian'

const LandingPage = () => {
  return (
    <>
      <MetaTags title="Landing" description="Landing page" />

      <Introduction />
      <LandingAccordian />
    </>
  )
}

export default LandingPage
