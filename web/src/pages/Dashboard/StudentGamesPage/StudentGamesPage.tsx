import { MetaTags } from '@redwoodjs/web'

import StudentGamesList from 'src/components/StudentGamesList/StudentGamesList'

type StudentGamesPageProps = {
  id: number
  complete?: string
}

const DashboardStudentGamesPage = ({ id, complete }: StudentGamesPageProps) => {
  const passComplete =
    complete === 'true' ? true : complete === 'false' ? false : undefined
  return (
    <>
      <MetaTags title="StudentGames" description="StudentGames page" />

      <StudentGamesList userId={id} complete={passComplete} />
    </>
  )
}

export default DashboardStudentGamesPage
