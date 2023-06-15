import { render } from '@redwoodjs/testing/web'

import DemonstrationPage from './DemonstrationPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DemonstrationPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DemonstrationPage />)
    }).not.toThrow()
  })
})
