import { render } from '@redwoodjs/testing/web'

import SortingGamePage from './SortingGamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SortingGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortingGamePage />)
    }).not.toThrow()
  })
})
