import { render } from '@redwoodjs/testing/web'

import CreateUserForm from './CreateUserForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('CreateUserForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CreateUserForm />)
    }).not.toThrow()
  })
})
