import { render } from '@redwoodjs/testing/web'

import Solution from './Solution'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Solution', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Solution />)
    }).not.toThrow()
  })
})
