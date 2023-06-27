import { render } from '@redwoodjs/testing/web'

import MatchingGameLevelManager from './MatchingGameLevelManager'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MatchingGameLevelManager', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchingGameLevelManager />)
    }).not.toThrow()
  })
})
