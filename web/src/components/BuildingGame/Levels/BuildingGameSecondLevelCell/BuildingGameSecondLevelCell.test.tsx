import { render } from '@redwoodjs/testing/web'

import BuildingGameSecondLevelCell from './BuildingGameSecondLevelCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGameSecondLevelCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGameSecondLevelCell />)
    }).not.toThrow()
  })
})
