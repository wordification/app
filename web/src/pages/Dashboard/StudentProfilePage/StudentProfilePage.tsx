import { MetaTags } from '@redwoodjs/web'

import StudentProfileCell from 'src/components/StudentProfileCell'

type StudentProfilePageProps = {
  id: number
}

const DashboardStudentProfilePage = ({ id }: StudentProfilePageProps) => {
  return (
    <>
      <MetaTags title="StudentProfile" description="StudentProfile page" />

      <StudentProfileCell id={id} />
    </>
  )
}

export default DashboardStudentProfilePage
