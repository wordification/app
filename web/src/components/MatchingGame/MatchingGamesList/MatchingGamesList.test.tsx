import { render } from '@redwoodjs/testing/web'

import MatchingGamesList from './MatchingGamesList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MatchingGamesList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchingGamesList />)
    }).not.toThrow()
  })
})
