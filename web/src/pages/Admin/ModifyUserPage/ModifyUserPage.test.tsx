import { render } from '@redwoodjs/testing/web'

import AdminModifyUserPage from './ModifyUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ModifyUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminModifyUserPage />)
    }).not.toThrow()
  })
})
