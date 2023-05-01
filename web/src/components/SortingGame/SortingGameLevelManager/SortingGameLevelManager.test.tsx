import { render } from '@redwoodjs/testing/web'

import SortingGameLevelManager from './SortingGameLevelManager'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SortingGameLevelManager', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortingGameLevelManager gameId={0} level={1} />)
    }).not.toThrow()
  })
})
