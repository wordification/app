import BuildingGameCell from 'src/components/BuildingGame/BuildingGameCell'

type BuildingGameIndividualGamePageProps = {
  id: number
}

const BuildingGameIndividualGamePage = ({
  id,
}: BuildingGameIndividualGamePageProps) => {
  return <BuildingGameCell id={id} />
}

export default BuildingGameIndividualGamePage
