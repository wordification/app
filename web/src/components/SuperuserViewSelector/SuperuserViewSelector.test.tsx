import { render } from '@redwoodjs/testing/web'

import SuperuserViewSelector from './SuperuserViewSelector'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('SuperuserViewSelector', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SuperuserViewSelector />)
    }).not.toThrow()
  })
})
