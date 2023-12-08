import { render } from '@redwoodjs/testing/web'

import CompleteGamesPage from './CompleteGamesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('CompleteGamesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CompleteGamesPage />)
    }).not.toThrow()
  })
})
