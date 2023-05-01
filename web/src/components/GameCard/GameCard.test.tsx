import { render } from '@redwoodjs/testing/web'

import GameCard from './GameCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('GameCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<GameCard />)
    }).not.toThrow()
  })
})
