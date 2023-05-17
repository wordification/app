import { render } from '@redwoodjs/testing/web'

import MatchingGameGrid from './MatchingGameGrid'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MatchingGameGrid', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchingGameGrid />)
    }).not.toThrow()
  })
})
