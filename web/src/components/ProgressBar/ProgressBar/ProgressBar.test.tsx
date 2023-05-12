import { render } from '@redwoodjs/testing/web'

import ProgressBar from './ProgressBar'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProgressBar', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProgressBar value={0.5} max={1} />)
    }).not.toThrow()
  })
})
