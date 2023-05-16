import { Role } from '@prisma/client'
import type { Prisma, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs, 'user'>({
  user: {
    one: {
      data: {
        firstName: 'Test',
        lastName: 'User',
        roles: Role.STUDENT,
        email: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user', 'test'>
