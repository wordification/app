import { mockRedwoodDirective, getDirectiveName } from '@redwoodjs/testing/api'

import requireAuth from './requireAuth'
import type { StandardScenario } from './requireAuth.scenarios'

describe('requireAuth directive', () => {
  it('declares the directive sdl as schema, with the correct name', () => {
    expect(requireAuth.schema).toBeTruthy()
    expect(getDirectiveName(requireAuth.schema)).toBe('requireAuth')
  })

  scenario('should throw when there is no current user', async () => {
    const mockExecution = mockRedwoodDirective(requireAuth, {
      context: {},
    })

    expect(mockExecution).toThrowError()
  })

  scenario(
    'should not throw when there is a current user',
    async (scenario: StandardScenario) => {
      const mockExecution = mockRedwoodDirective(requireAuth, {
        context: {
          currentUser: scenario.user.one,
        },
      })

      expect(mockExecution).not.toThrowError()
    }
  )
})
