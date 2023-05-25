import { render } from '@redwoodjs/testing/web'

import StudentProfilePage from './StudentProfilePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StudentProfilePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentProfilePage id={42} />)
    }).not.toThrow()
  })
})
