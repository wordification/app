import type { Prisma } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'
import type { Game, User, Word } from 'types/graphql'

export const standard = defineScenario<
  Prisma.WordCreateArgs | Prisma.GameCreateArgs | Prisma.UserCreateArgs,
  'user' | 'word' | 'game'
>({
  user: {
    one: {
      data: {
        firstName: 'String',
        lastName: 'String',
        roles: 'STUDENT' as const,
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
    wife: {
      data: {
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
    snow: {
      data: {
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
  },
  game: {
    notLastWords: (scenario: StandardScenario) => ({
      include: {
        incompleteWords: true,
      },
      data: {
        updatedAt: '2023-04-30T21:33:37.356Z',
        type: 'MATCHING',
        level: 1,
        wordsPerPhoneme: 2,
        phonemes: [49, 53],
        user: {
          create: {
            firstName: 'String',
            lastName: 'String',
            roles: 'STUDENT' as const,
            email: 'String8936105',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
        incompleteWords: {
          connect: [
            { id: scenario.word.sight.id },
            { id: scenario.word.show.id },
            { id: scenario.word.wife.id },
            { id: scenario.word.snow.id },
          ],
        },
        allWords: {
          connect: [
            { id: scenario.word.sight.id },
            { id: scenario.word.show.id },
            { id: scenario.word.wife.id },
            { id: scenario.word.snow.id },
          ],
        },
      },
    }),
    lastWords: (scenario: StandardScenario) => ({
      data: {
        updatedAt: '2023-04-30T21:33:37.356Z',
        type: 'MATCHING',
        wordsPerPhoneme: 2,
        phonemes: [49, 53],
        incompleteWords: {
          connect: [
            { id: scenario.word.show.id },
            { id: scenario.word.snow.id },
          ],
        },
        allWords: {
          connect: [
            { id: scenario.word.sight.id },
            { id: scenario.word.show.id },
            { id: scenario.word.wife.id },
            { id: scenario.word.snow.id },
          ],
        },
        user: {
          create: {
            firstName: 'String',
            lastName: 'String',
            roles: 'STUDENT' as const,
            email: 'String7570650',
            hashedPassword: 'String',
            salt: 'String',
          },
        },
      },
    }),
  },
})

export type StandardScenario = ScenarioData<
  Game,
  'game',
  'lastWords' | 'notLastWords'
> &
  ScenarioData<User, 'user', 'one'> &
  ScenarioData<Word, 'word', 'sight' | 'snow' | 'show' | 'wife'>
