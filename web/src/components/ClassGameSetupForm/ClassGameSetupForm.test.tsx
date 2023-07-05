import { render } from '@redwoodjs/testing/web'

import ClassGameSetupForm from './ClassGameSetupForm'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ClassGameSetupForm', () => {
  it('renders successfully', () => {
    expect(() => {
      render(
        <ClassGameSetupForm
          onSave={function (): void {
            throw new Error('Function not implemented.')
          }}
          loading={false}
        />
      )
    }).not.toThrow()
  })
})
