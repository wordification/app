import TeacherCell from 'src/components/TeacherCell'

const StudentTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>ID#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>View Games</th>
          </tr>
        </thead>
        <tbody>
          <TeacherCell />
        </tbody>
      </table>
    </div>
  )
}

export default StudentTable
