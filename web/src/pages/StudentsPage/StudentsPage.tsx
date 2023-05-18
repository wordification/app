import { MetaTags } from '@redwoodjs/web'

import StudentTable from 'src/components/StudentTable/StudentTable'

const StudentsPage = () => {
  return (
    <>
      <MetaTags title="Students" description="Students page" />

      <h1 className="text-2xl font-bold">My Class</h1>

      <StudentTable />
    </>
  )
}

export default StudentsPage
