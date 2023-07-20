import { db } from 'src/lib/db'

import type { QueryResolvers } from 'types/graphql'

export const phonemes: QueryResolvers['phonemes'] = () => {
  return db.phoneme.findMany()
}

export const phoneme: QueryResolvers['phoneme'] = ({ id }) => {
  return db.phoneme.findUnique({
    where: { id },
  })
}
