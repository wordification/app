import { render } from '@redwoodjs/testing/web'

import UpdateUserPage from './UpdateUserPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('UpdateUserPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateUserPage id={'42'} />)
    }).not.toThrow()
  })
})
