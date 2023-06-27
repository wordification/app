import { render } from '@redwoodjs/testing/web'

import MatchingGameCard from './MatchingGameCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('MatchingGameCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <MatchingGameCard word="test" flipped={false} onClick={() => {}} />
      )
    }).not.toThrow()
  })
})
