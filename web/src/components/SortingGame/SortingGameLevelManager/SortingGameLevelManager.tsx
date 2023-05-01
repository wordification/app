import SortingGameFirstLevelCell from 'src/components/SortingGame/Levels/SortingGameFirstLevelCell'

const SortingGameLevelManager = ({
  gameId,
  level,
}: {
  gameId: number
  level: number
}) => {
  switch (level) {
    case 1:
      return <SortingGameFirstLevelCell gameId={gameId} />
    case 2:
      return <div>Level 2</div>
    case 3:
      return <div>Level 3</div>
    default:
      return <div>default</div>
  }
}

export default SortingGameLevelManager
