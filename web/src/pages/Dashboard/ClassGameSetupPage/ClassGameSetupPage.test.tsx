import { render } from '@redwoodjs/testing/web'

import ClassGameSetupPage from './ClassGameSetupPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ClassGameSetupPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClassGameSetupPage />)
    }).not.toThrow()
  })
})
