import MatchingGameFinishLevelCell from 'src/components/MatchingGame/Levels/MatchingGameFinishLevelCell'
import MatchingGameGroupingLevelCell from 'src/components/MatchingGame/Levels/MatchingGameGroupingLevelCell'
import MatchingGamePlayLevelCell from 'src/components/MatchingGame/Levels/MatchingGamePlayLevelCell'

import type { MatchingGameType } from 'types/graphql'

const MatchingGameLevelManager = ({
  gameId,
  level,
  matchingGameType,
}: {
  gameId: number
  level: number
  matchingGameType: MatchingGameType | undefined | null
}) => {
  if (matchingGameType === 'MEMORY') {
    switch (level) {
      case 1:
        return <MatchingGamePlayLevelCell gameId={gameId} />
      case 2:
        return <MatchingGameFinishLevelCell gameId={gameId} />
      default:
        return <div>default</div>
    }
  } else if (matchingGameType === 'GROUPING') {
    switch (level) {
      case 1:
        return <MatchingGameGroupingLevelCell gameId={gameId} />
      case 2:
        return <MatchingGameFinishLevelCell gameId={gameId} />
      default:
        return <div>default</div>
    }
  } else {
    return <div>No matching game type found!</div>
  }
}

export default MatchingGameLevelManager
