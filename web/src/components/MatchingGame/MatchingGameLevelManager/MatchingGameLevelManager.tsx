import MatchingGameFinishLevelCell from 'src/components/MatchingGame/Levels/MatchingGameFinishLevelCell'
import MatchingGamePlayLevelCell from 'src/components/MatchingGame/Levels/MatchingGamePlayLevelCell'

const MatchingGameLevelManager = ({
  gameId,
  level,
}: {
  gameId: number
  level: number
}) => {
  switch (level) {
    case 1:
      return <MatchingGamePlayLevelCell gameId={gameId} />
    case 2:
      return <MatchingGameFinishLevelCell gameId={gameId} />
    default:
      return <div>default</div>
  }
}

export default MatchingGameLevelManager
