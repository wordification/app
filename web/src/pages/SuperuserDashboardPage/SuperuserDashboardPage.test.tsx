import { render } from '@redwoodjs/testing/web'

import SuperuserDashboardPage from './SuperuserDashboardPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SuperuserDashboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SuperuserDashboardPage />)
    }).not.toThrow()
  })
})
