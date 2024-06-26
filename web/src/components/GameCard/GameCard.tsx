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
      <h3 className="card-title pb-3 text-6xl">{title}</h3>
      {children}
    </div>
    {files && (
      <div className="card-actions justify-end p-4">
        <Player
          files={files}
          playingAudio={playingAudio}
          buttonLabel="Play audio again"
          onComplete={onComplete}
        />
      </div>
    )}
  </div>
)

export default GameCard
