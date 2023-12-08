import { render } from '@redwoodjs/testing/web'

import BuildingGamesCell from './BuildingGamesCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGamesCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGamesCell />)
    }).not.toThrow()
  })
})
