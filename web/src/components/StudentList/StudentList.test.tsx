import { render } from '@redwoodjs/testing/web'

import StudentList from './StudentList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StudentList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentList />)
    }).not.toThrow()
  })
})
