import { render } from '@redwoodjs/testing/web'

import SupportersPage from './SupportersPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SupportersPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SupportersPage />)
    }).not.toThrow()
  })
})
