import { MetaTags } from '@redwoodjs/web'

import TeacherCell from 'src/components/TeacherCell'

const DashboardStudentsPage = () => {
  return (
    <>
      <MetaTags title="Students" description="Students page" />

      <h1 className="pb-3 text-5xl font-bold">My Class</h1>

      <TeacherCell />
    </>
  )
}

export default DashboardStudentsPage
