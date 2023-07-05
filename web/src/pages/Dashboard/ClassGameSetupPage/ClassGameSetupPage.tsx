import { navigate, routes } from '@redwoodjs/router'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import ClassGameSetupForm from 'src/components/ClassGameSetupForm/ClassGameSetupForm'

import type {
  UpsertGameSetupInput,
  UpsertGameSetupMutation,
} from 'types/graphql'

const UPSERT_GAME_SETUP_MUTATION = gql`
  mutation UpsertGameSetupMutation(
    $input: UpsertGameSetupInput!
    $studentId: Int
  ) {
    upsertGameSetup(input: $input, studentId: $studentId) {
      id
    }
  }
`

type ClassGameSetupPageProps = {
  id?: string
}

const DashboardClassGameSetupPage = ({ id }: ClassGameSetupPageProps) => {
  const [upsertGameSetup, { loading, error }] =
    useMutation<UpsertGameSetupMutation>(UPSERT_GAME_SETUP_MUTATION, {
      onCompleted: () => {
        toast.success('Game Setup Saved!')
        if (id) {
          navigate(routes.students())
        }
      },
      onError: (error) => {
        toast.error(error.message)
      },
    })

  const onSave = (input: UpsertGameSetupInput) => {
    const studentId = parseInt(id ?? '0')
    upsertGameSetup({
      variables: {
        input: {
          ...input,
        },
        studentId,
      },
    })
  }

  return (
    <>
      <MetaTags title="ClassGameSetup" description="ClassGameSetup page" />

      <div className="card bg-base-200 text-base-content">
        <div className="card-body">
          <header>
            <h1 className="card-title">
              {id ? `Student ID# ${id}: Game Setup` : 'Class Game Setup'}
            </h1>
          </header>

          <ClassGameSetupForm onSave={onSave} loading={loading} error={error} />
        </div>
      </div>
    </>
  )
}

export default DashboardClassGameSetupPage
