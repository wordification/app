import { MetaTags } from '@redwoodjs/web'

import MatchingGameGrid from 'src/components/MatchingGame/MatchingGameGrid/MatchingGameGrid'

const TestPage = () => {
  return (
    <>
      <MetaTags title="Test" description="Test page" />

      <MatchingGameGrid />
    </>
  )
}

export default TestPage
