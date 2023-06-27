import { render } from '@redwoodjs/testing/web'

import SetupGamePage from './SetupGamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SetupGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SetupGamePage />)
    }).not.toThrow()
  })
})
