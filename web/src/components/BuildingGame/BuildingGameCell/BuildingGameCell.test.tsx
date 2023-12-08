import { render } from '@redwoodjs/testing/web'

import BuildingGameCell from './BuildingGameCell'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGameCell', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGameCell />)
    }).not.toThrow()
  })
})
