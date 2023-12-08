import { render } from '@redwoodjs/testing/web'

import BuildingGameFinishLevelCell from './BuildingGameFinishLevelCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGameFinishLevelCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGameFinishLevelCell />)
    }).not.toThrow()
  })
})
