import ProgressionCard from 'src/components/ProgressionCard/ProgressionCard'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'
import type {
  FindProgressionQuery,
  FindProgressionQueryVariables,
} from 'types/graphql'

export const QUERY = gql`
  query FindProgressionQuery {
    # placeholder query until we actually return data
    __typename
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({
  error,
}: CellFailureProps<FindProgressionQueryVariables>) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = (
  _props: CellSuccessProps<FindProgressionQuery, FindProgressionQueryVariables>
) => {
  const RETURN_DATA = {
    vowels: [
      {
        phoneme: 'Long I',
        graphemes: [
          {
            label: 'i',
            active: false,
          },
          {
            label: 'igh',
            active: false,
          },
          {
            label: 'y',
            active: false,
          },
          {
            label: 'iCe',
            active: true,
          },
        ],
      },
      {
        phoneme: 'Long O',
        graphemes: [
          {
            label: 'o',
            active: false,
          },
          {
            label: 'oa',
            active: true,
          },
          {
            label: 'ow',
            active: true,
          },
        ],
      },
      {
        phoneme: 'Long E',
        graphemes: [
          {
            label: 'e',
            active: true,
          },
          {
            label: 'ee',
            active: true,
          },
          {
            label: 'ea',
            active: true,
          },
          {
            label: 'eCe',
            active: true,
          },
        ],
      },
    ],
    consonants: [
      {
        phoneme: '/f/',
        graphemes: [
          {
            label: 'f',
            active: false,
          },
          {
            label: 'ff',
            active: true,
          },
          {
            label: 'ph',
            active: true,
          },
        ],
      },
      {
        phoneme: '/s/',
        graphemes: [
          {
            label: 's',
            active: false,
          },
          {
            label: 'c',
            active: true,
          },
          {
            label: 'ss',
            active: true,
          },
        ],
      },
      {
        phoneme: '/k/',
        graphemes: [
          {
            label: 'k',
            active: false,
          },
          {
            label: 'c',
            active: false,
          },
          {
            label: 'ck',
            active: true,
          },
        ],
      },
    ],
  }
  return (
    <>
      <h1 className="font-2xl">Vowels</h1>
      <div className="grid grid-cols-3 gap-4">
        {RETURN_DATA.vowels.map((option) => (
          <ProgressionCard
            key={option.phoneme}
            phoneme={option.phoneme}
            graphemes={option.graphemes}
          />
        ))}
      </div>
      <h1 className="font-2xl">Consonants</h1>
      <div className="grid grid-cols-3 gap-4">
        {RETURN_DATA.consonants.map((option) => (
          <ProgressionCard
            key={option.phoneme}
            phoneme={option.phoneme}
            graphemes={option.graphemes}
          />
        ))}
      </div>
    </>
  )
}
