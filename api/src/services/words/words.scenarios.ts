import type { Prisma, Word } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WordCreateArgs>({
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
})

export type StandardScenario = ScenarioData<
  Word,
  'word',
  'sight' | 'show' | 'wife' | 'snow'
>
