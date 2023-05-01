import type { EditGameById, UpdateGameInput } from 'types/graphql'

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

type FormGame = NonNullable<EditGameById['game']>

interface GameFormProps {
  game?: EditGameById['game']
  onSave: (data: UpdateGameInput, id?: FormGame['id']) => void
  error: RWGqlError
  loading: boolean
}

const PHONEME_OPTIONS = [
  { id: 40, name: 'Short I' },
  { id: 49, name: 'Long I' },
  { id: 55, name: 'Short O' },
  { id: 53, name: 'Long O' },
] as const

const GameForm = (props: GameFormProps) => {
  const onSubmit = (data: FormGame) => {
    props.onSave(
      { ...data, phonemes: data.phonemes.map((p) => +p) },
      props?.game?.id
    )
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
          defaultValue={props.game?.wordsPerPhoneme ?? 1}
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
      <FieldError name="phonemes" className="rw-field-error" />

      <div>
        <Submit disabled={props.loading} className="btn-primary btn">
          Save
        </Submit>
      </div>
    </Form>
  )
}

export default GameForm
