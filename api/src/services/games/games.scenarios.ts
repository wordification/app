import type { Prisma, Game, User } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<
  Prisma.WordCreateArgs | Prisma.GameCreateArgs | Prisma.UserCreateArgs,
  'user' | 'word' | 'game'
>({
  user: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
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
        testedGraphemes: ['igh'],
        testedPhonemes: [49],
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
        testedGraphemes: ['ow'],
        testedPhonemes: [53],
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
            firstName: 'String',
            lastName: 'String',
            email: 'String8936105',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        currentWord: {
          create: {
            word: 'wife',
            gradeLevel: 3,
            phonemes: [30, 49, 6],
            graphemes: ['w', 'iCe', 'f'],
            syllables: ['ons', 'nuc', 'cod'],
            numSyllables: 1,
            sentences: [
              'He loves his wife.',
              'Please bring your wife to the party.',
              'How is your wife?',
              'Your wife called while you were out.',
            ],
            testedGraphemes: ['iCe'],
            testedPhonemes: [49],
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
        currentWord: {
          create: {
            word: 'snow',
            gradeLevel: 2,
            phonemes: [22, 17, 53],
            graphemes: ['s', 'n', 'ow'],
            syllables: ['ons', 'ons', 'nuc'],
            numSyllables: 1,
            sentences: [
              'It is going to snow.',
              'We had a lot of snow this winter.',
              'Do you like to play in the snow?',
              'The snow has melted.',
            ],
            testedGraphemes: ['ow'],
            testedPhonemes: [53],
          },
        },
        user: {
          create: {
            firstName: 'String',
            lastName: 'String',
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
