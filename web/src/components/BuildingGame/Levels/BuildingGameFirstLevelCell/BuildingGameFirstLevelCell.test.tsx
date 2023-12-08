import { render } from '@redwoodjs/testing/web'

import BuildingGameFirstLevelCell from './BuildingGameFirstLevelCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGameFirstLevelCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGameFirstLevelCell />)
    }).not.toThrow()
  })
})
