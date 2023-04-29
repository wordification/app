import { render } from '@redwoodjs/testing/web'

import MatchingGamePage from './MatchingGamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MatchingGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MatchingGamePage />)
    }).not.toThrow()
  })
})
