import { render } from '@redwoodjs/testing/web'

import SortingGameThirdLevel from './SortingGameThirdLevel'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SortingGameThirdLevel', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortingGameThirdLevel gameId={0} />)
    }).not.toThrow()
  })
})
