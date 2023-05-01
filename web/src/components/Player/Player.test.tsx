import { render } from '@redwoodjs/testing/web'

import Player from './Player'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Player', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Player files={[]} />)
    }).not.toThrow()
  })
})
