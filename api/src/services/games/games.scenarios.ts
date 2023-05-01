import type { Prisma, Game, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<
  Prisma.WordCreateArgs | Prisma.GameCreateArgs | Prisma.UserCreateArgs,
  'user' | 'word' | 'game'
>({
  user: {
    one: {
      data: {
        email: 'String',
        hashedPassword: 'String',
        salt: 'String',
      },
    },
  },
  word: {
    sight: {
      data: {
        word: 'sight',
        gradeLevel: 3,
        phonemes: [22, 49, 24],
        graphemes: ['s', 'igh', 't'],
        syllables: ['ons', 'nuc', 'cod'],
        numSyllables: 1,
        sentences: [
          'We have lost sight of him.',
          "We can't lose sight of that.",
          'Do you believe in love at first sight?',
          'He lost his sight.',
        ],
      },
    },
    show: {
      data: {
        word: 'show',
        gradeLevel: 2,
        phonemes: [23, 53],
        graphemes: ['sh', 'ow'],
        syllables: ['ons', 'nuc'],
        numSyllables: 1,
        sentences: [
          'I love that show.',
          'Show me an example.',
          'I want to show you my dolls.',
          'She did not show up.',
        ],
      },
    },
  },
  game: {
    one: {
      data: {
        updatedAt: '2023-04-30T21:33:37.356Z',
        type: 'SORTING',
        level: 1,
        wordsPerPhoneme: 1,
        phonemes: [49, 53],
        user: {
          create: {
            email: 'String8936105',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        currentWord: {
          create: {
            word: 'String',
            gradeLevel: 1,
            phonemes: [49, 53],
            graphemes: ['String'],
            syllables: ['String'],
            numSyllables: 1,
            sentences: ['String'],
          },
        },
      },
    },
    two: {
      data: {
        updatedAt: '2023-04-30T21:33:37.356Z',
        type: 'SORTING',
        wordsPerPhoneme: 1,
        phonemes: [49, 53],
        user: {
          create: {
            email: 'String7570650',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<Game, 'game'> &
  ScenarioData<User, 'user'>
