import { render } from '@redwoodjs/testing/web'

import BuildingGamesList from './BuildingGamesList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGamesList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGamesList />)
    }).not.toThrow()
  })
})
