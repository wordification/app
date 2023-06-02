import { render } from '@redwoodjs/testing/web'

import SuperuserLayout from './SuperuserLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SuperuserLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SuperuserLayout />)
    }).not.toThrow()
  })
})
