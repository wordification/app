import { render } from '@redwoodjs/testing/web'

import ClassGameSetupMenuPage from './ClassGameSetupMenuPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('ClassGameSetupMenuPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ClassGameSetupMenuPage id={42} />)
    }).not.toThrow()
  })
})
