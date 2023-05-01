import { useState } from 'react'

const Player = ({
  files,
  buttonLabel,
}: {
  files: string[]
  buttonLabel?: string
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0)

  const handleFinish = () => {
    if (currentFileIndex < files.length - 1) {
      setCurrentFileIndex(currentFileIndex + 1)
    }
  }

  const handleRestart = () => {
    setCurrentFileIndex(0)
  }

  return (
    <>
      {buttonLabel && (
        <button
          className="btn-accent btn"
          type="button"
          onClick={handleRestart}
        >
          {buttonLabel}
        </button>
      )}
      {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
      <audio src={files[currentFileIndex]} onEnded={handleFinish} autoPlay />
    </>
  )
}

export default Player
