import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

type StudentProfilePageProps = {
  id: number
}

const StudentProfilePage = ({ id }: StudentProfilePageProps) => {
  return (
    <>
      <MetaTags title="StudentProfile" description="StudentProfile page" />

      <h1 className="text-2xl font-bold">{id} Profile</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/StudentProfilePage/StudentProfilePage.tsx</code>
      </p>
      <p>
        My default route is named <code>studentProfile</code>, link to me with `
        <Link to={routes.studentProfile({ id: 42 })}>StudentProfile 42</Link>`
      </p>
      <p>The parameter passed to me is {id}</p>
    </>
  )
}

export default StudentProfilePage
