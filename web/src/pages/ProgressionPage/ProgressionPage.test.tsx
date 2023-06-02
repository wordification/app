import { render } from '@redwoodjs/testing/web'

import ProgressionPage from './ProgressionPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ProgressionPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProgressionPage />)
    }).not.toThrow()
  })
})
