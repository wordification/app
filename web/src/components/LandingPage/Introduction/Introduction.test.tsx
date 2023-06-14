import { render } from '@redwoodjs/testing/web'

import Introduction from './Introduction'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Introduction', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Introduction />)
    }).not.toThrow()
  })
})
