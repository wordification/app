import BuildingGamesCell from 'src/components/BuildingGame/BuildingGamesCell'

type BuildingGameIndividualGamePageProps = {
  id: number
}

const BuildingGameIndividualGamePageProps = ({
  id,
}: BuildingGameIndividualGamePageProps) => {
  return <SortingGameCell id={id} />
}

export default BuildingGameIndividualGamePageProps
