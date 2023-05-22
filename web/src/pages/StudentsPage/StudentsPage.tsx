import { MetaTags } from '@redwoodjs/web'

import TeacherCell from 'src/components/TeacherCell'

const StudentsPage = () => {
  return (
    <>
      <MetaTags title="Students" description="Students page" />

      <h1 className="text-2xl font-bold">My Class</h1>

      <TeacherCell />
    </>
  )
}

export default StudentsPage
