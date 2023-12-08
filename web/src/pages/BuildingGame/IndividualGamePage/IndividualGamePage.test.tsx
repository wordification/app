import { render } from '@redwoodjs/testing/web'

import IndividualGamePage from './IndividualGamePage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('IndividualGamePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<IndividualGamePage id={42} />)
    }).not.toThrow()
  })
})
