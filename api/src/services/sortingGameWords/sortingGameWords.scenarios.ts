import type { Prisma, SortingGameWord } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.SortingGameWordCreateArgs>({
  sortingGameWord: {
    one: {
      data: {
        testedGrapheme: 'String',
        word: {
          create: {
            word: 'String1633711',
            gradeLevel: 7240443,
            phonemes: 8957929,
            graphemes: 'String',
            syllables: 'String',
            sentences: 'String',
          },
        },
        game: {
          create: {
            wordsPerPhoneme: 8380322,
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
    two: {
      data: {
        testedGrapheme: 'String',
        word: {
          create: {
            word: 'String9644265',
            gradeLevel: 1463540,
            phonemes: 270591,
            graphemes: 'String',
            syllables: 'String',
            sentences: 'String',
          },
        },
        game: {
          create: {
            wordsPerPhoneme: 8379853,
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

export type StandardScenario = ScenarioData<SortingGameWord, 'sortingGameWord'>
