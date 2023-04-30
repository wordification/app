import type { EditGameById, UpdateGameInput } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  NumberField,
  Submit,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormGame = NonNullable<EditGameById['game']>

interface GameFormProps {
  game?: EditGameById['game']
  onSave: (data: UpdateGameInput, id?: FormGame['id']) => void
  error: RWGqlError
  loading: boolean
}

const GameForm = (props: GameFormProps) => {
  const onSubmit = (data: FormGame) => {
    props.onSave(data, props?.game?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form<FormGame> onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="userId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          User id
        </Label>

        <NumberField
          name="userId"
          defaultValue={props.game?.userId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="userId" className="rw-field-error" />

        <Label
          name="wordsPerPhoneme"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Words per phoneme
        </Label>

        <NumberField
          name="wordsPerPhoneme"
          defaultValue={props.game?.wordsPerPhoneme}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="wordsPerPhoneme" className="rw-field-error" />

        <Label
          name="phonemeOne"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phoneme one
        </Label>

        <NumberField
          name="phonemeOne"
          defaultValue={props.game?.phonemeOne}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phonemeOne" className="rw-field-error" />

        <Label
          name="phonemeTwo"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Phoneme two
        </Label>

        <NumberField
          name="phonemeTwo"
          defaultValue={props.game?.phonemeTwo}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="phonemeTwo" className="rw-field-error" />

        <Label
          name="level"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Level
        </Label>

        <NumberField
          name="level"
          defaultValue={props.game?.level}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="level" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default GameForm
