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
  game_graphemes?: string
  /** Input field to select a group of students to set this game setup for. */
  student_group?: number
}

type ClassGameSetupFormProps = {
  onSave: (data: UpsertGameSetupInput, studentSelect?: number) => void
  error?: RWGqlError
  loading: boolean
  idProvided: boolean
}

type Phoneme = {
  id: number
  name: string
  graphemes: string[]
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

const STUDENT_GROUP_OPTIONS = [
  { id: 0, name: 'All Students' },
  { id: 1, name: 'Red Group' },
  { id: 2, name: 'Yellow Group' },
  { id: 3, name: 'Green Group' },
] as const

/** Current Options for demo version */
const GRAPHEME_GAME_OPTIONS = [
  { id: 0, name: `Initial Consonants - 'w', 'wh'`, value: ['w', 'wh'] },
  {
    id: 1,
    name: `Silent 'e' Vowels - 'aCe', 'iCe', 'oCe'`,
    value: ['iCe', 'oCe', 'aCe'],
  },
] as const

const GRAPHEME_MATCHING_BOARD_SIZE_OPTIONS = [{ id: 0, name: '3x4' }] as const

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

  const [phonemeGraphemeGame, setPhonemeGraphemeGame] = useState<boolean>(true)

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
      game_graphemes = '',
      phoneme_grapheme_selection = 0,
      student_group = 0,
      ...restData
    } = data

    const studentSelect = student_group * -1

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
      graphemes = JSON.parse(game_graphemes)
    }

    props.onSave(
      {
        ...restData,
        phonemes,
        graphemes,
      },
      studentSelect
    )
  }

  return (
    <Form<FormGame> onSubmit={onSubmit}>
      <FormError
        error={props.error}
        wrapperClassName="card card-body bg-base-300"
        titleClassName="font-bold text-error"
        listClassName="list-disc list-inside text-sm"
      />

      {/* {!props.idProvided && (
        <>
          <h2 className="text-lg">Select Students</h2>
          <div className="form-control mb-2 w-full max-w-xs">
            <Label
              name="student_group"
              className="label"
              errorClassName="label text-error"
            >
              <span className="label-text">Student Group</span>
            </Label>
            <SelectField
              name="student_group"
              defaultValue={0}
              className="input-bordered select mb-2 w-full"
              validation={{ required: true, valueAsNumber: true }}
            >
              {STUDENT_GROUP_OPTIONS.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </SelectField>
          </div>
          <div className="flex flex-col">
            <FieldError name="student_group" className="text-error" />
          </div>
        </>
      )} */}

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
            <span className="label-text">Grapheme Game Options</span>
          </Label>

          <SelectField
            name="game_graphemes"
            className="select-bordered select mb-2 w-full"
            validation={{
              required: true,
              valueAsNumber: false,
              validate: {
                matchesInitialValue: (value) => {
                  return value !== 'Select a Grapheme Game Option'
                },
              },
            }}
            defaultChecked
          >
            <option>Select a Grapheme Game Option</option>
            {GRAPHEME_GAME_OPTIONS.map((p) => (
              <option key={p.id} value={JSON.stringify(p.value)}>
                {p.name}
              </option>
            ))}
          </SelectField>
        </div>
      )}

      <div className="flex flex-col">
        <FieldError name="game_graphemes" className="text-error" />
      </div>

      <div className="divider w-full max-w-xs"></div>
      <h2 className="text-lg">Sorting Game</h2>

      <div className="form-control w-full max-w-xs">
        <Label
          name="wordsPerUnit"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">{`Words per ${
            phonemeGraphemeGame ? 'Phoneme' : 'Grapheme'
          }`}</span>
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
          {phonemeGraphemeGame
            ? MATCHING_BOARD_SIZE_OPTIONS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))
            : GRAPHEME_MATCHING_BOARD_SIZE_OPTIONS.map((s) => (
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

      <div className="divider w-full max-w-xs"></div>
      <h2 className="text-lg">Building Game</h2>

      <div className="form-control w-full max-w-xs">
        <Label
          name="wordsPerUnit"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Words per game</span>
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

      <div className="mt-2">
        <Submit disabled={props.loading} className="btn-primary btn">
          Submit
        </Submit>
      </div>
    </Form>
  )
}

export default ClassGameSetupForm
