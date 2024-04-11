import Player from 'src/components/Player'

const GameCard = ({
  title,
  files,
  children,
  onComplete,
}: {
  title: string
  files: string[] | null | undefined
  children: React.ReactNode
  onComplete?: () => void
}) => (
  <div className="card w-full shadow-xl bg-w-dark-blue">
    <div className="card-body">
      <h3 className="card-title text-4xl pb-3">{title}</h3>
      {children}
    </div>
    {files && (
      <div className="card-actions justify-end p-4">
        <Player
          files={files}
          buttonLabel="Play audio again"
          onComplete={onComplete}
        />
      </div>
    )}
  </div>
)

export default GameCard
