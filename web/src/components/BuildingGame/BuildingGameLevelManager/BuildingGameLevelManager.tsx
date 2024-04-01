import BuildingGameFinishLevelCell from 'src/components/BuildingGame/Levels/BuildingGameFinishLevelCell'
import BuildingGamePlayLevelCell from 'src/components/BuildingGame/Levels/BuildingGamePlayLevelCell'

const BuildingGameLevelManager = ({
  gameId,
  level,
}: {
  gameId: number
  level: number
}) => {
  switch (level) {
    case 1:
      return <BuildingGamePlayLevelCell gameId={gameId} />
    case 2:
      return <BuildingGameFinishLevelCell gameId={gameId} />
    default:
      return <div>default</div>
  }
}

export default BuildingGameLevelManager
