import { render } from '@redwoodjs/testing/web'

import StudentGamesPage from './StudentGamesPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('StudentGamesPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<StudentGamesPage id={42} />)
    }).not.toThrow()
  })
})
