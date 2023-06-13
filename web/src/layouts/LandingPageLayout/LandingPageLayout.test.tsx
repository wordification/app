import { render } from '@redwoodjs/testing/web'

import LandingPageLayout from './LandingPageLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('LandingPageLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<LandingPageLayout />)
    }).not.toThrow()
  })
})
