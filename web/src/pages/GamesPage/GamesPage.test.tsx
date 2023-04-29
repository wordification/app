import { render } from '@redwoodjs/testing/web'

import GamesPage from './GamesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GamesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GamesPage />)
    }).not.toThrow()
  })
})
