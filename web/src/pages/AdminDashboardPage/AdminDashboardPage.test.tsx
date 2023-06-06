import { render } from '@redwoodjs/testing/web'

import AdminDashboardPage from './AdminDashboardPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdminDashboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdminDashboardPage />)
    }).not.toThrow()
  })
})
