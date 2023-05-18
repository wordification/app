import { render } from '@redwoodjs/testing/web'

import StudentTable from './StudentTable'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StudentTable', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentTable />)
    }).not.toThrow()
  })
})
