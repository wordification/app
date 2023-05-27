import { render } from '@redwoodjs/testing/web'

import StudentGamesList from './StudentGamesList'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('StudentGamesList', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentGamesList />)
    }).not.toThrow()
  })
})
