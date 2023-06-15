import { render } from '@redwoodjs/testing/web'

import LandingAccordian from './LandingAccordian'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('LandingAccordian', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LandingAccordian />)
    }).not.toThrow()
  })
})
