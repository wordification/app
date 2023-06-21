import { render } from '@redwoodjs/testing/web'

import AdministratorLayout from './AdministratorLayout'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('AdministratorLayout', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AdministratorLayout />)
    }).not.toThrow()
  })
})
