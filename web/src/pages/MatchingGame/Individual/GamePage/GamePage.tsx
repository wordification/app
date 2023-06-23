import MatchingGameCell from 'src/components/MatchingGame/MatchingGameCell'

type MatchingGameIndividualGamePageProps = {
  id: number
}

const MatchingGameIndividualGamePage = ({
  id,
}: MatchingGameIndividualGamePageProps) => {
  return <MatchingGameCell id={id} />
}

export default MatchingGameIndividualGamePage
