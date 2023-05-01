// import FirstLevelCell from 'src/components/SortingGame/Levels/FirstLevelCell'

const SortingGameLevelManager = ({
  gameId: _gameId,
  level,
}: {
  gameId: number
  level: number
}) => {
  switch (level) {
    case 1:
      return <div>Level 1</div>
    case 2:
      return <div>Level 2</div>
    case 3:
      return <div>Level 3</div>
    default:
      return <div>default</div>
  }
}

export default SortingGameLevelManager
