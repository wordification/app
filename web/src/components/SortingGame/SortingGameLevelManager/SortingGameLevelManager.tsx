import SortingGameFinishLevelCell from 'src/components/SortingGame/Levels/SortingGameFinishLevelCell'
import SortingGameFirstLevelCell from 'src/components/SortingGame/Levels/SortingGameFirstLevelCell'
import SortingGameSecondLevelCell from 'src/components/SortingGame/Levels/SortingGameSecondLevelCell'

import SortingGameThirdLevel from '../Levels/SortingGameThirdLevel/SortingGameThirdLevel'

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
      return <SortingGameSecondLevelCell gameId={gameId} />
    case 3:
      return <SortingGameThirdLevel gameId={gameId} />
    case 4:
      return <SortingGameFinishLevelCell gameId={gameId} />
    default:
      return <div>default</div>
  }
}

export default SortingGameLevelManager
