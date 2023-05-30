import { render } from '@redwoodjs/testing/web'

import AdminUpdateUserPage from './UpdateUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminUpdateUserPage id={42} />)
    }).not.toThrow()
  })
})
