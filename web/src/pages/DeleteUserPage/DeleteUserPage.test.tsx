import { render } from '@redwoodjs/testing/web'

import DeleteUserPage from './DeleteUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('DeleteUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DeleteUserPage />)
    }).not.toThrow()
  })
})
