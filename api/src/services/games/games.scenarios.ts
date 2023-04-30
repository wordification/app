import type { Prisma, Game } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.GameCreateArgs>({
  game: {
    one: {
      data: {
        wordsPerPhoneme: 5034699,
        phonemeOne: 7605639,
        type: 'SORTING',
        phonemeTwo: 4484993,
        level: 6818699,
        user: {
          create: {
            email: 'String7480309',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
    two: {
      data: {
        wordsPerPhoneme: 3766750,
        phonemeOne: 1051697,
        type: 'SORTING',
        phonemeTwo: 4537374,
        level: 4391041,
        user: {
          create: {
            email: 'String1670264',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Game, 'game'>
