import { Form, Label, SelectField, Submit, TextField } from '@redwoodjs/forms'
import { Link, routes } from '@redwoodjs/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import type { GetCurrentStudents } from 'types/graphql'

type SearchStudentListInput = {
  searchString: string
  searchField: string
}

const StudentList = ({ currentStudents }: GetCurrentStudents) => {
  const formMethods = useForm<SearchStudentListInput>()

  const [displayStudents, setDisplayStudents] = useState(currentStudents)

  useEffect(() => {
    setDisplayStudents(displayStudents)
  }, [displayStudents])

  const onSearch = (data: SearchStudentListInput) => {
    data.searchString = data.searchString.toLowerCase()
    switch (data.searchField) {
      case 'ID':
        setDisplayStudents(
          currentStudents?.filter((student) =>
            student.id.toString().includes(data.searchString)
          )
        )
        break
      case 'Email':
        setDisplayStudents(
          currentStudents?.filter((student) =>
            student.email.toLowerCase().includes(data.searchString)
          )
        )
        break
      case 'Last Name':
        setDisplayStudents(
          currentStudents?.filter((student) =>
            student.lastName.toLowerCase().includes(data.searchString)
          )
        )
        break
      case 'First Name':
        setDisplayStudents(
          currentStudents?.filter((student) =>
            student.firstName.toLowerCase().includes(data.searchString)
          )
        )
        break
      default:
        setDisplayStudents(
          currentStudents?.filter(
            (student) =>
              student.id.toString().includes(data.searchString) ||
              student.email.toLowerCase().includes(data.searchString) ||
              student.firstName.toLowerCase().includes(data.searchString) ||
              student.lastName.toLowerCase().includes(data.searchString)
          )
        )
    }
  }

  const resetFilters = () => {
    setDisplayStudents(currentStudents)
    formMethods.reset()
  }

  return (
    <>
      <Form<SearchStudentListInput>
        onSubmit={onSearch}
        formMethods={formMethods}
      >
        <div className="mb-2 mt-2 flex flex-row">
          <button className="btn-primary btn mr-4 mt-6" onClick={resetFilters}>
            Reset
          </button>
          <div className="form-control mr-1 w-full max-w-xs">
            <Label className="mb-1 text-sm font-bold" name="searchString">
              Search for:
            </Label>
            <TextField
              name="searchString"
              placeholder="Type here"
              className="input-bordered input-secondary input w-full max-w-xs"
            />
          </div>
          <div className="form-control mr-2 w-full max-w-xs">
            <Label className="mb-1 text-sm font-bold" name="searchField">
              On field:
            </Label>
            <SelectField
              className="select-secondary select w-full max-w-xs"
              defaultChecked
              name="searchField"
            >
              <option>All Fields</option>
              <option>ID</option>
              <option>Email</option>
              <option>Last Name</option>
              <option>First Name</option>
            </SelectField>
          </div>
          <Submit className="btn-primary btn mt-6">Sumbit</Submit>
        </div>
      </Form>
      <div className="overflow-x-auto">
        <table className="table-zebra table-xs table w-full lg:table-md">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>ID#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Group</th>
              <th>GPA - 3.0 Scale</th>
            </tr>
          </thead>
          <tbody>
            {displayStudents?.map((student) => (
              <tr key={student.id}>
                <td>
                  <div className="join-vertical join">
                    <Link
                      to={routes.resetPasswordTeacher({
                        id: student.id,
                        name: student.lastName + ', ' + student.firstName,
                      })}
                      title={'Reset Password - User ' + student.id}
                      className="btn-error btn-outline btn-xs join-item btn mb-1"
                    >
                      Reset Password
                    </Link>
                    <Link
                      to={routes.studentProfile({ id: student.id })}
                      title={'Student Profile ' + student.id}
                      className="btn-primary btn-outline btn-xs join-item btn mb-1"
                    >
                      View Student
                    </Link>
                    <Link
                      to={routes.classGameSetup({ id: student.id })}
                      title={'Game Setup ' + student.id}
                      className="btn-accent btn-outline btn-xs join-item btn"
                    >
                      Edit Game Setup
                    </Link>
                  </div>
                </td>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td
                  className={
                    (student.gpa ?? 0) < 1
                      ? 'text-error'
                      : (student.gpa ?? 0) < 2
                      ? 'text-warning'
                      : 'text-success'
                  }
                >
                  {(student.gpa ?? 0) < 1
                    ? 'RED'
                    : (student.gpa ?? 0) < 2
                    ? 'YELLOW'
                    : 'GREEN'}
                </td>
                <td>{student.gpa}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default StudentList
