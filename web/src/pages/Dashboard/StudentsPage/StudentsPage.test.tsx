import { render } from '@redwoodjs/testing/web'

import StudentsPage from './StudentsPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StudentsPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentsPage />)
    }).not.toThrow()
  })
})
