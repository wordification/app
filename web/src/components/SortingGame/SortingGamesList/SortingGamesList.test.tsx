import { render } from '@redwoodjs/testing/web'

import SortingGamesList from './SortingGamesList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SortingGamesList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortingGamesList sortingGames={[]} />)
    }).not.toThrow()
  })
})
