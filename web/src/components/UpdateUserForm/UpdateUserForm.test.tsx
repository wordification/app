import { render } from '@redwoodjs/testing/web'

import UpdateUserForm from './UpdateUserForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('UpdateUserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<UpdateUserForm />)
    }).not.toThrow()
  })
})
