import { render } from '@redwoodjs/testing/web'

import TeacherLayout from './TeacherLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('TeacherLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TeacherLayout />)
    }).not.toThrow()
  })
})
