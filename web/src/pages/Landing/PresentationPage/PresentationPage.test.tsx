import { render } from '@redwoodjs/testing/web'

import PresentationPage from './PresentationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('PresentationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<PresentationPage />)
    }).not.toThrow()
  })
})
