import BuildingGamesCell from 'src/components/BuildingGame/BuildingGamesCell'

const IncompleteGamesPage = () => {
  return <BuildingGamesCell complete={false} type={'BUILDING'} />
}

export default IncompleteGamesPage
