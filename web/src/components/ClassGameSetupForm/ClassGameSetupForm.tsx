import {
  FieldError,
  Form,
  FormError,
  Label,
  NumberField,
  SelectField,
  Submit,
} from '@redwoodjs/forms'
import { useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'

import type { RWGqlError } from '@redwoodjs/forms'
import type { UpsertGameSetupInput, GameSetup, Scalars } from 'types/graphql'

type FormGame = NonNullable<Omit<GameSetup, 'phonemes'>> & {
  /** Input fields to form the phonemes to test the user on. */
  first_phoneme?: Array<Scalars['Int']>
  second_phoneme?: Array<Scalars['Int']>
}

type ClassGameSetupFormProps = {
  onSave: (data: UpsertGameSetupInput) => void
  error?: RWGqlError
  loading: boolean
}

type Phoneme = {
  id: number
  name: string
}

const PHONEME_OPTIONS = gql`
  query PhonemeOptions {
    phonemes {
      id
      name
    }
  }
`

const MATCHING_BOARD_SIZE_OPTIONS = [
  { id: 0, name: '3x4' },
  { id: 1, name: '4x4' },
  { id: 2, name: '4x5' },
] as const

const MATCHING_GAME_TYPE_OPTIONS = [
  { id: '0', name: 'MEMORY' },
  { id: '1', name: 'GROUPING' },
] as const

const ClassGameSetupForm = (props: ClassGameSetupFormProps) => {
  const { loading, error, data } = useQuery(PHONEME_OPTIONS)

  const [availableOptions, setAvailableOptions] = useState<readonly Phoneme[]>(
    []
  )
  const [phonemeOptions, setPhonemeOptions] = useState<readonly Phoneme[]>([])

  useEffect(() => {
    if (!loading && !error && data && data.phonemes) {
      const fetchedPhonemeOptions: Phoneme[] = data.phonemes
      setPhonemeOptions(fetchedPhonemeOptions)
      setAvailableOptions(fetchedPhonemeOptions)
    }
  }, [loading, error, data])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error?.message}</div>

  const handlePhonemeOneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value)
    const filteredOptions = phonemeOptions.filter((p) => p.id !== selectedValue)
    setAvailableOptions(filteredOptions)
  }

  const onSubmit = (data: FormGame) => {
    const { first_phoneme = 0, second_phoneme = 0, ...restData } = data
    const phonemes: number[] = [
      ...(Array.isArray(first_phoneme) ? first_phoneme : [first_phoneme]),
      ...(Array.isArray(second_phoneme) ? second_phoneme : [second_phoneme]),
    ].filter((p) => !!p)

    props.onSave({
      ...restData,
      phonemes,
    })
  }

  return (
    <Form<FormGame> onSubmit={onSubmit}>
      <FormError
        error={props.error}
        wrapperClassName="card card-body bg-base-300"
        titleClassName="font-bold text-error"
        listClassName="list-disc list-inside text-sm"
      />

      <h2 className="text-lg">All Games</h2>

      <div className="form-control w-full max-w-xs">
        <Label
          name="phonemes"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Phonemes</span>
        </Label>

        <div className="flex flex-col">
          <SelectField
            name="first_phoneme"
            className="select-bordered select mb-2 w-full"
            validation={{
              required: true,
              valueAsNumber: true,
              validate: {
                matchesInitialValue: (value) => {
                  return value !== 'Select a Phoneme'
                },
              },
            }}
            onChange={handlePhonemeOneChange}
            defaultChecked
          >
            <option>Select a Phoneme</option>
            {phonemeOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </SelectField>
          <SelectField
            name="second_phoneme"
            className="select-bordered select mb-2 w-full"
            validation={{
              required: true,
              valueAsNumber: true,
              validate: {
                matchesInitialValue: (value) => {
                  return value !== 'Select a Phoneme'
                },
              },
            }}
            defaultChecked
          >
            <option>Select a Phoneme</option>
            {availableOptions.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </SelectField>
        </div>
      </div>
      <div className="flex flex-col">
        <FieldError name="first_phoneme" className="text-error" />
        <FieldError name="second_phoneme" className="text-error" />
      </div>

      <div className="divider w-full max-w-xs"></div>
      <h2 className="text-lg">Sorting Game</h2>

      <div className="form-control w-full max-w-xs">
        <Label
          name="wordsPerPhoneme"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Words per phoneme</span>
        </Label>

        <NumberField
          name="wordsPerPhoneme"
          defaultValue={3}
          className="input-bordered input mb-2 w-full max-w-xs"
          errorClassName="input input-bordered border-error w-full max-w-xs"
          validation={{ required: true }}
        />
      </div>
      <FieldError name="wordsPerPhoneme" className="text-sm text-error" />

      <div className="divider w-full max-w-xs"></div>
      <h2 className="text-lg">Matching Game</h2>

      <div className="form-control w-full max-w-xs">
        <Label
          name="matchingBoardSize"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Size of Board</span>
        </Label>

        <SelectField
          name="matchingBoardSize"
          defaultValue={0}
          className="input-bordered select mb-2 w-full"
          validation={{ required: true, valueAsNumber: true }}
        >
          {MATCHING_BOARD_SIZE_OPTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </SelectField>
      </div>
      <FieldError name="matchingBoardSize" className="text-sm text-error" />

      <div className="form-control w-full max-w-xs">
        <Label
          name="matchingGameType"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Matching Game Type</span>
        </Label>

        <SelectField
          name="matchingGameType"
          defaultValue={0}
          className="input-bordered select mb-2 w-full"
          validation={{ required: true }}
        >
          {MATCHING_GAME_TYPE_OPTIONS.map((s) => (
            <option key={s.id} value={s.name}>
              {s.name}
            </option>
          ))}
        </SelectField>
      </div>
      <FieldError name="matchingGameType" className="text-sm text-error" />

      <div className="mt-2">
        <Submit disabled={props.loading} className="btn-primary btn">
          Submit
        </Submit>
      </div>
    </Form>
  )
}

export default ClassGameSetupForm
