import { render } from '@redwoodjs/testing/web'

import IncompleteGamesPage from './IncompleteGamesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('IncompleteGamesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IncompleteGamesPage />)
    }).not.toThrow()
  })
})
