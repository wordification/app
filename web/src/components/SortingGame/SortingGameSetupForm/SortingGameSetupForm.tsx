import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'
import { useState } from 'react'

import type { RWGqlError } from '@redwoodjs/forms'
import type { CreateGameInput, Game, Scalars } from 'types/graphql'

type FormGame = NonNullable<Omit<Game, 'phonemes'>> & {
  /** Input fields to form the phonemes to test the user on. */
  first_phoneme?: Array<Scalars['Int']>
  second_phoneme?: Array<Scalars['Int']>
}

type SortingGameSetupFormProps = {
  onSave: (data: CreateGameInput) => void
  error?: RWGqlError
  loading: boolean
}

type Phoneme = {
  id: number
  name: string
}

const PHONEME_OPTIONS = [
  { id: 40, name: 'Short I' },
  { id: 49, name: 'Long I' },
  { id: 55, name: 'Short O' },
  { id: 53, name: 'Long O' },
] as const

const SortingGameSetupForm = (props: SortingGameSetupFormProps) => {
  const [availableOptions, setAvailableOptions] =
    useState<readonly Phoneme[]>(PHONEME_OPTIONS)

  const handlePhonemeOneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = parseInt(e.target.value)
    const filteredOptions = PHONEME_OPTIONS.filter(
      (p) => p.id !== selectedValue
    )
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
          className="input-bordered input w-full max-w-xs"
          errorClassName="input input-bordered border-error w-full max-w-xs"
          validation={{ required: true }}
        />
      </div>
      <FieldError name="wordsPerPhoneme" className="text-sm text-error" />

      <div className="form-control w-full max-w-xs">
        <Label
          name="phonemes"
          className="label"
          errorClassName="label text-error"
        >
          <span className="label-text">Phonemes</span>
        </Label>

        <div className="flex">
          <SelectField
            name="first_phoneme"
            className="select-bordered select mr-2 w-full"
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
          >
            <option disabled selected>
              Select a Phoneme
            </option>
            {PHONEME_OPTIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </SelectField>
          <SelectField
            name="second_phoneme"
            className="select-bordered select ml-2 w-full"
            validation={{
              required: true,
              valueAsNumber: true,
              validate: {
                matchesInitialValue: (value) => {
                  return value !== 'Select a Phoneme'
                },
              },
            }}
          >
            <option disabled selected>
              Select a Phoneme
            </option>
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
      <div className="mt-2">
        <Submit disabled={props.loading} className="btn-primary btn">
          Submit
        </Submit>
      </div>
    </Form>
  )
}

export default SortingGameSetupForm
