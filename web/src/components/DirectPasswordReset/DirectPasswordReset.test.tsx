import { render } from '@redwoodjs/testing/web'

import DirectPasswordReset from './DirectPasswordReset'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('DirectPasswordReset', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DirectPasswordReset />)
    }).not.toThrow()
  })
})
