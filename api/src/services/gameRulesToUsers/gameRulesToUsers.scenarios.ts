import type { Prisma, GameRulesToUser } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GameRulesToUserCreateArgs>({
  gameRulesToUser: {
    one: {
      data: {
        wordsPerPhoneme: 1048915,
        phonemes: 4717337,
        user: {
          create: {
            email: 'String9843569',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        wordsPerPhoneme: 7347334,
        phonemes: 628073,
        user: {
          create: {
            email: 'String6948520',
            firstName: 'String',
            lastName: 'String',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<GameRulesToUser, 'gameRulesToUser'>
