import SortingGameCell from 'src/components/SortingGame/SortingGameCell'

type GamePageProps = {
  id: number
}

const GamePage = ({ id }: GamePageProps) => {
  return <SortingGameCell id={id} />
}

export default GamePage
