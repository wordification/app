import type { Prisma, SortingGameWord } from '@prisma/client'
import { Word } from 'types/graphql'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<
  Prisma.WordCreateArgs | Prisma.SortingGameWordCreateArgs
>({
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
    night: {
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
  sortingGameWord: {
    friday: {
      data: {
        testedGrapheme: 'String',
        word: {
          create: {
            word: 'Friday',
            gradeLevel: 3,
            numSyllables: 2,
            phonemes: [6, 21, 49, 2, 51],
            graphemes: ['F', 'r', 'i', 'd', 'ay'],
            syllables: ['ons', 'ons', 'nuc', 'ons', 'nuc'],
            sentences: [
              'Today is Friday.',
              'On Friday it is going to snow.',
              'We will wear matching outfits on Friday.',
              'Friday is the best day of the week.',
            ],
          },
        },
        game: {
          create: {
            wordsPerPhoneme: 8380322,
            type: 'SORTING',
            phonemeOne: 7305155,
            phonemeTwo: 4877085,
            level: 173029,
            user: {
              create: {
                email: 'String2306530',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
    america: {
      data: {
        testedGrapheme: 'String',
        word: {
          create: {
            word: 'America',
            gradeLevel: 5,
            phonemes: [43, 15, 39, 21, 40, 12, 43],
            numSyllables: 4,
            graphemes: ['A', 'm', 'e', 'r', 'i', 'c', 'a'],
            syllables: ['nuc', 'ons', 'nuc', 'ons', 'nuc', 'ons', 'nuc'],
            sentences: [
              'We live in North America.',
              'America is a great country.',
              'We are from America.',
              'South America has many countries.',
            ],
          },
        },
        game: {
          create: {
            wordsPerPhoneme: 8379853,
            type: 'SORTING',
            phonemeOne: 7200173,
            phonemeTwo: 8682203,
            level: 5595501,
            user: {
              create: {
                email: 'String1664973',
                hashedPassword: 'String',
                salt: 'String',
              },
            },
          },
        },
      },
    },
  },
})

export type StandardScenario = ScenarioData<
  SortingGameWord,
  'sortingGameWord',
  'friday' | 'america'
> &
  ScenarioData<Word, 'word', 'sight' | 'night'>
