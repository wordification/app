import { MetaTags } from '@redwoodjs/web'

import ProgressionCell from 'src/components/ProgressionCell'

const ProgressionPage = () => {
  return (
    <>
      <MetaTags title="Progression" description="Progression page" />

      <ProgressionCell />
    </>
  )
}

export default ProgressionPage
