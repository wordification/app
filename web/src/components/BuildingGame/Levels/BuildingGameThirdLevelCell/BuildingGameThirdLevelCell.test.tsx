import { render } from '@redwoodjs/testing/web'

import BuildingGameThirdLevelCell from './BuildingGameThirdLevelCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGameThirdLevelCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGameThirdLevelCell />)
    }).not.toThrow()
  })
})
