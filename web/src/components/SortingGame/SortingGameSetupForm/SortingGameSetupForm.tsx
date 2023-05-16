import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
  SelectField,
} from '@redwoodjs/forms'

import type { RWGqlError } from '@redwoodjs/forms'
import type { CreateGameInput, Game } from 'types/graphql'

type FormGame = NonNullable<Game>

type SortingGameSetupFormProps = {
  onSave: (data: CreateGameInput) => void
  error?: RWGqlError
  loading: boolean
}

const PHONEME_OPTIONS = [
  { id: 40, name: 'Short I' },
  { id: 49, name: 'Long I' },
  { id: 55, name: 'Short O' },
  { id: 53, name: 'Long O' },
] as const

const SortingGameSetupForm = (props: SortingGameSetupFormProps) => {
  const onSubmit = (data: FormGame) => {
    props.onSave({
      ...data,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      phonemes: data.phonemes.filter((p) => !!p).map((p) => +p!),
    })
  }

  return (
    <Form<FormGame> onSubmit={onSubmit} error={props.error}>
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

        <SelectField
          name="phonemes"
          multiple
          validation={{
            required: true,
            validate: {
              exactlyTwo: (value) =>
                value.length === 2 || 'Please select two phonemes.',
            },
          }}
        >
          {PHONEME_OPTIONS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </SelectField>
      </div>
      <FieldError name="phonemes" className="text-error" />

      <div>
        <Submit disabled={props.loading} className="btn-primary btn">
          Submit
        </Submit>
      </div>
    </Form>
  )
}

export default SortingGameSetupForm
