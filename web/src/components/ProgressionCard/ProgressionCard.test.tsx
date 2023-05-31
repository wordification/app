import { render } from '@redwoodjs/testing/web'

import ProgressionCard from './ProgressionCard'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProgressionCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ProgressionCard
          phoneme="Long I"
          graphemes={[
            {
              label: 'i',
              active: false,
            },
            {
              label: 'igh',
              active: false,
            },
            {
              label: 'y',
              active: false,
            },
            {
              label: 'iCe',
              active: true,
            },
          ]}
        />
      )
    }).not.toThrow()
  })
})
