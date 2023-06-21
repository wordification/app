import { render } from '@redwoodjs/testing/web'

import GamePage from './GamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('GamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GamePage id={42} />)
    }).not.toThrow()
  })
})
