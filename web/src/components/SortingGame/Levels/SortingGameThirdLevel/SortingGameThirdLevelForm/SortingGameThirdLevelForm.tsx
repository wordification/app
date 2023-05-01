import type { GradeLevelThreeMutationVariables } from 'types/graphql'

import {
  Form,
  FormError,
  FieldError,
  Label,
  Submit,
  TextField,
} from '@redwoodjs/forms'
import type { RWGqlError } from '@redwoodjs/forms'

type FormGame = { entry: GradeLevelThreeMutationVariables['entry'] }

interface SortingGameThirdLevelFormProps {
  onSubmit: (data: FormGame) => void
  error: RWGqlError
  loading: boolean
}

const SortingGameThirdLevelForm = (props: SortingGameThirdLevelFormProps) => {
  const handleSubmit = (data: FormGame) => {
    props.onSubmit(data)
  }

  return (
    <Form<FormGame> onSubmit={handleSubmit} error={props.error}>
      <FormError
        error={props.error}
        wrapperClassName="card card-body bg-base-300"
        titleClassName="font-bold text-error"
        listClassName="list-disc list-inside text-sm"
      />

      <div className="form-control w-full max-w-xs">
        <Label
          name="entry"
          className="label sr-only"
          errorClassName="label text-error sr-only"
        >
          <span className="label-text">Spell the word</span>
        </Label>

        <div className="input-group">
          <TextField
            name="entry"
            placeholder="Type your answer here."
            className="input-bordered input w-full max-w-xs"
            errorClassName="input input-bordered border-error w-full max-w-xs"
            validation={{ required: true }}
          />

          <Submit disabled={props.loading} className="btn-primary btn">
            Submit
          </Submit>
        </div>
      </div>
      <FieldError name="entry" className="text-sm text-error" />
    </Form>
  )
}

export default SortingGameThirdLevelForm
