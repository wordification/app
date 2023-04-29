import type { Prisma, Word } from '@prisma/client'

import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.WordCreateArgs>({
  word: {
    one: {
      data: {
        word: 'String4751197',
        gradeLevel: 3963657,
        phonemes: [7492830],
        graphemes: ['String'],
        syllables: ['String'],
        sentences: ['String'],
      },
    },
    two: {
      data: {
        word: 'String7033175',
        gradeLevel: 893289,
        phonemes: [7192715],
        graphemes: ['String'],
        syllables: ['String'],
        sentences: ['String'],
      },
    },
  },
})

export type StandardScenario = ScenarioData<Word, 'word'>
