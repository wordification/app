import { render } from '@redwoodjs/testing/web'

import Issues from './Issues'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Issues', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Issues />)
    }).not.toThrow()
  })
})
