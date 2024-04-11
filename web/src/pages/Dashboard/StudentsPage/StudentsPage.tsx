import { MetaTags } from '@redwoodjs/web'

import TeacherCell from 'src/components/TeacherCell'

const DashboardStudentsPage = () => {
  return (
    <>
      <MetaTags title="Students" description="Students page" />

      <h1 className="text-5xl font-bold pb-3">My Class</h1>

      <TeacherCell />
    </>
  )
}

export default DashboardStudentsPage
