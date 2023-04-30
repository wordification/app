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
    one: {
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
    two: {
      data: {
        word: 'night',
        gradeLevel: 2,
        phonemes: [17, 49, 24],
        graphemes: ['n', 'igh', 't'],
        syllables: ['ons', 'nuc', 'cod'],
        numSyllables: 1,
        sentences: [
          'I stayed up all night.',
          'She cooked dinner last night.',
          'We met last night.',
          'They talk every night before bed.',
        ],
      },
    },
  },
  game: {
    one: {
      data: {
        wordsPerPhoneme: 1,
        phonemeOne: 49,
        type: 'SORTING',
        phonemeTwo: 53,
        level: 1,
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
        wordsPerPhoneme: 1,
        phonemeOne: 49,
        type: 'SORTING',
        phonemeTwo: 53,
        level: 1,
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

export type StandardScenario = ScenarioData<Game, 'game'> &
  ScenarioData<User, 'user'>
