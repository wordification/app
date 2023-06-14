import { render } from '@redwoodjs/testing/web'

import Importance from './Importance'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Importance', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Importance />)
    }).not.toThrow()
  })
})
