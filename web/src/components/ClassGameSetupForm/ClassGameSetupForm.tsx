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

type FormGame = NonNullable<Omit<Omit<GameSetup, 'phonemes'>, 'graphemes'>> & {
  /** Input field to make a selection of a phoneme or grapheme based game. */
  phoneme_grapheme_selection?: Array<Scalars['Int']>
  /** Input fields to form the phonemes or graphemes to test the user on. */
  first_phoneme?: Array<Scalars['Int']>
  second_phoneme?: Array<Scalars['Int']>
  first_grapheme?: Array<Scalars['String']>
  second_grapheme?: Array<Scalars['String']>
}

type ClassGameSetupFormProps = {
  onSave: (data: UpsertGameSetupInput) => void
  error?: RWGqlError
  loading: boolean
}

type Phoneme = {
  id: number
  name: string
  graphemes: string[]
}

type Grapheme = {
  id: number
  name: string
}

const PHONEME_OPTIONS = gql`
  query PhonemeOptions {
    phonemes {
      id
      name
      graphemes
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

const PHONEME_GRAPHEME_WORD_OPTIONS = [
  { id: '0', name: 'Phonemes' },
  { id: '1', name: 'Graphemes' },
] as const

const ClassGameSetupForm = (props: ClassGameSetupFormProps) => {
  const { loading, error, data } = useQuery(PHONEME_OPTIONS)

  const [availableOptions, setAvailableOptions] = useState<readonly Phoneme[]>(
    []
  )
  const [phonemeOptions, setPhonemeOptions] = useState<readonly Phoneme[]>([])

  const [availableGraphemeOptions, setAvailableGraphemeOptions] = useState<
    readonly Grapheme[]
  >([])
  const [graphemeOptions, setGraphemeOptions] = useState<readonly Grapheme[]>(
    []
  )

  const [phonemeGraphemeGame, setPhonemeGraphemeGame] = useState<boolean>(true)

  useEffect(() => {
    if (!loading && !error && data && data.phonemes) {
      const fetchedPhonemeOptions: Phoneme[] = data.phonemes

      let idx = 0
      const fetchedGraphemeOptions = fetchedPhonemeOptions.flatMap((p) => {
        return p.graphemes.flatMap((g) => ({
          id: idx++,
          name: g,
        }))
      }) as Grapheme[]

      setPhonemeOptions(fetchedPhonemeOptions)
      setAvailableOptions(fetchedPhonemeOptions)
      setAvailableGraphemeOptions(fetchedGraphemeOptions)
      setGraphemeOptions(fetchedGraphemeOptions)
    }
  }, [loading, error, data])

  if (loading) return <div>Loading...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error?.message}</div>

  const handlePhonemeOneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value)
    const filteredOptions = phonemeOptions.filter((p) => p.id !== selectedValue)
    setAvailableOptions(filteredOptions)
  }

  const handleGraphemeOneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    const filteredOptions = graphemeOptions.filter(
      (p) => p.name !== selectedValue
    )
    setAvailableGraphemeOptions(filteredOptions)
  }

  const handlePhonemeGraphemeGameChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedValue = parseInt(e.target.value)
    if (selectedValue === 0) {
      setPhonemeGraphemeGame(true)
    } else {
      setPhonemeGraphemeGame(false)
    }
  }

  const onSubmit = (data: FormGame) => {
    const {
      first_phoneme = 0,
      second_phoneme = 0,
      first_grapheme = '',
      second_grapheme = '',
      phoneme_grapheme_selection = 0,
      ...restData
    } = data

    const selection = [
      ...(Array.isArray(phoneme_grapheme_selection)
        ? phoneme_grapheme_selection
        : [phoneme_grapheme_selection]),
    ].filter((s) => !!s)

    let phonemes: number[] = []
    let graphemes: string[] = []

    if (selection.length === 0) {
      phonemes = [
        ...(Array.isArray(first_phoneme) ? first_phoneme : [first_phoneme]),
        ...(Array.isArray(second_phoneme) ? second_phoneme : [second_phoneme]),
      ].filter((p) => !!p)
    }

    if (selection.length === 1) {
      graphemes = [
        ...(Array.isArray(first_grapheme) ? first_grapheme : [first_grapheme]),
        ...(Array.isArray(second_grapheme)
          ? second_grapheme
          : [second_grapheme]),
      ].filter((g) => !!g)
    }

    props.onSave({
      ...restData,
      phonemes,
      graphemes,
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
          name="phoneme_grapheme_selection"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Choose Phonemes or Graphemes</span>
        </Label>
        <SelectField
          name="phoneme_grapheme_selection"
          defaultValue={0}
          className="input-bordered select mb-2 w-full"
          onChange={handlePhonemeGraphemeGameChange}
          validation={{ required: true, valueAsNumber: true }}
        >
          {PHONEME_GRAPHEME_WORD_OPTIONS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </SelectField>
      </div>
      <div className="flex flex-col">
        <FieldError name="phoneme_grapheme_selection" className="text-error" />
      </div>

      {phonemeGraphemeGame && (
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
      )}

      <div className="flex flex-col">
        <FieldError name="first_phoneme" className="text-error" />
        <FieldError name="second_phoneme" className="text-error" />
      </div>

      {!phonemeGraphemeGame && (
        <div className="form-control w-full max-w-xs">
          <Label
            name="graphemes"
            className="label"
            errorClassName="label text-error"
          >
            <span className="label-text">Graphemes</span>
          </Label>

          <div className="flex flex-col">
            <SelectField
              name="first_grapheme"
              className="select-bordered select mb-2 w-full"
              validation={{
                required: true,
                valueAsNumber: false,
                validate: {
                  matchesInitialValue: (value) => {
                    return value !== 'Select a Grapheme'
                  },
                },
              }}
              onChange={handleGraphemeOneChange}
              defaultChecked
            >
              <option>Select a Grapheme</option>
              {graphemeOptions.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </SelectField>
            <SelectField
              name="second_grapheme"
              className="select-bordered select mb-2 w-full"
              validation={{
                required: true,
                valueAsNumber: false,
                validate: {
                  matchesInitialValue: (value) => {
                    return value !== 'Select a Grapheme'
                  },
                },
              }}
              defaultChecked
            >
              <option>Select a Grapheme</option>
              {availableGraphemeOptions.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </SelectField>
          </div>
        </div>
      )}

      <div className="flex flex-col">
        <FieldError name="first_grapheme" className="text-error" />
        <FieldError name="second_grapheme" className="text-error" />
      </div>

      <div className="divider w-full max-w-xs"></div>
      <h2 className="text-lg">Sorting Game</h2>

      <div className="form-control w-full max-w-xs">
        <Label
          name="wordsPerUnit"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Words per phoneme</span>
        </Label>

        <NumberField
          name="wordsPerUnit"
          defaultValue={3}
          className="input-bordered input mb-2 w-full max-w-xs"
          errorClassName="input input-bordered border-error w-full max-w-xs"
          validation={{ required: true }}
        />
      </div>
      <FieldError name="wordsPerUnit" className="text-sm text-error" />

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
