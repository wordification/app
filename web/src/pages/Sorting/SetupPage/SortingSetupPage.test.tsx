import { render } from '@redwoodjs/testing/web'

import SortingSetupPage from './SortingSetupPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SortingSetupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortingSetupPage />)
    }).not.toThrow()
  })
})
