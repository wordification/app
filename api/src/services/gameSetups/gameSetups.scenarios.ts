import type { Prisma, GameSetup } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GameSetupCreateArgs>({
  gameSetup: {
    one: {
      data: {
        wordsPerPhoneme: 4955654,
        phonemes: 8867444,
        user: {
          create: {
            email: 'String3896368',
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
        wordsPerPhoneme: 1709650,
        phonemes: 8483172,
        user: {
          create: {
            email: 'String9818619',
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

export type StandardScenario = ScenarioData<GameSetup, 'gameSetup'>
