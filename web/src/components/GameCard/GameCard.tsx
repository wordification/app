import Player from 'src/components/Player'

const GameCard = ({
  title,
  files,
  children,
}: {
  title: string
  files: string[]
  children: React.ReactNode
}) => (
  <div className="card w-full bg-base-300 shadow-xl">
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      {children}
    </div>
    <div className="card-actions justify-end p-4">
      <Player files={files} buttonLabel="Play audio again" />
    </div>
  </div>
)

export default GameCard
