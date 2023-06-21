import { render } from '@redwoodjs/testing/web'

import MenuPage from './MenuPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('MenuPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuPage />)
    }).not.toThrow()
  })
})
