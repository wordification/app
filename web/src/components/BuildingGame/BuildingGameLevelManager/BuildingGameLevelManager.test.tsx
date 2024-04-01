import { render } from '@redwoodjs/testing/web'

import BuildingGameLevelManager from './BuildingGameLevelManager'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('BuildingGameLevelManager', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<BuildingGameLevelManager />)
    }).not.toThrow()
  })
})
