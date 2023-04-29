import { render } from '@redwoodjs/testing/web'

import SortingGameLayout from './SortingGameLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SortingGameLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SortingGameLayout />)
    }).not.toThrow()
  })
})
