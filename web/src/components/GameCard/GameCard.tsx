import Player from 'src/components/Player'

const GameCard = ({
  title,
  files,
  playingAudio,
  children,
  onComplete,
}: {
  title: string
  files: string[] | null | undefined
  playingAudio?: boolean
  children: React.ReactNode
  onComplete?: () => void
}) => (
  <div className="bg-w-dark-blue card w-full shadow-xl">
    <div className="card-body">
      <div className="mb-4 flex items-center justify-between">
        <h3 style={{ fontSize: '3.5rem', marginRight: 'auto' }}>{title}</h3>
        {files && (
          <Player
            files={files}
            playingAudio={playingAudio}
            buttonLabel="Play audio again"
            onComplete={onComplete}
          />
        )}
      </div>
      {children}
    </div>
  </div>
)

export default GameCard
