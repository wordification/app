import { Role } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import { User } from 'types/graphql'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.UserCreateArgs, 'user'>({
  user: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        roles: Role.STUDENT,
        email: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
})

export type StandardScenario = ScenarioData<User, 'user'>
