import { render } from '@redwoodjs/testing/web'

import ClassGameSetupForm from './ClassGameSetupForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClassGameSetupForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClassGameSetupForm />)
    }).not.toThrow()
  })
})
