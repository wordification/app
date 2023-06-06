import { render } from '@redwoodjs/testing/web'

import UserList from './UserList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UserList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UserList />)
    }).not.toThrow()
  })
})
