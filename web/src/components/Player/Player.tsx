import { Howl } from 'howler'
import { useState, useMemo, useEffect } from 'react'

const Player = ({
  files,
  buttonLabel,
  onComplete,
}: {
  files: readonly string[]
  buttonLabel?: string
  onComplete?: () => void
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const sound = useMemo(
    () =>
      new Howl({
        src: [files[currentFileIndex]],
        onend: () => {
          if (currentFileIndex < files.length - 1) {
            setCurrentFileIndex(currentFileIndex + 1)
          } else {
            onComplete?.()
          }
        },
      }),
    [currentFileIndex, files, onComplete]
  )

  // handle autoplay
  useEffect(() => {
    sound?.play()
    return () => {
      sound?.stop()
    }
  }, [sound])

  // handle reset when files change
  useEffect(() => {
    setCurrentFileIndex(0)
  }, [files])

  const handleRestart = () => {
    if (currentFileIndex === 0) {
      sound?.stop()
    } else {
      sound?.unload()
      setCurrentFileIndex(0)
    }

    sound?.play()
  }

  if (!buttonLabel) return null
  return (
    <button className="btn-primary btn" type="button" onClick={handleRestart}>
      {buttonLabel}
    </button>
  )
}

export default Player
