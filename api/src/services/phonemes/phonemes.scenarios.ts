import type { Prisma, Phoneme } from '@prisma/client'
import type { ScenarioData } from '@redwoodjs/testing/api'

export const standard = defineScenario<Prisma.PhonemeCreateArgs>({
  phoneme: {
    one: { data: { id: 9750343, name: 'String' } },
    two: { data: { id: 8552676, name: 'String' } },
  },
})

export type StandardScenario = ScenarioData<Phoneme, 'phoneme'>
