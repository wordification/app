import BuildingGameFinishLevelCell from 'src/components/BuildingGame/Levels/BuildingGameFinishLevelCell'
import BuildingGameFirstLevelCell from 'src/components/BuildingGame/Levels/BuildingGameFirstLevelCell'
import BuildingGameSecondLevelCell from 'src/components/BuildingGame/Levels/BuildingGameSecondLevelCell'
import BuildingGameThirdLevelCell from 'src/components/BuildingGame/Levels/BuildingGameThirdLevelCell'

const BuildingGameLevelManager = ({
  gameId,
  level,
}: {
  gameId: number
  level: number
}) => {
  switch (level) {
    case 1:
      return <BuildingGameFirstLevelCell gameId={gameId} />
    case 2:
      return <BuildingGameSecondLevelCell gameId={gameId} />
    case 3:
      return <BuildingGameThirdLevelCell gameId={gameId} />
    case 4:
      return <BuildingGameFinishLevelCell gameId={gameId} />
    default:
      return <div>default</div>
  }
}

export default BuildingGameLevelManager
