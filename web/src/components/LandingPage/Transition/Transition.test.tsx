import { render } from '@redwoodjs/testing/web'

import Transition from './Transition'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Transition', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Transition />)
    }).not.toThrow()
  })
})
