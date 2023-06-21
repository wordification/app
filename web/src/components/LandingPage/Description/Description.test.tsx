import { render } from '@redwoodjs/testing/web'

import Description from './Description'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Description', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Description />)
    }).not.toThrow()
  })
})
