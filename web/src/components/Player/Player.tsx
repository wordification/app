import { Howl } from 'howler'
import { useState, useMemo, useEffect, memo } from 'react'

const Player = ({
  files,
  buttonLabel,
  playingAudio,
  onComplete,
}: {
  files: readonly string[]
  buttonLabel?: string
  playingAudio?: boolean
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
    if (
      (playingAudio !== undefined && playingAudio === true) ||
      playingAudio === undefined
    ) {
      sound?.play()
    } // else don't play audio

    return () => {
      sound?.stop()
    }
  }, [sound, playingAudio])

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

    if (
      (playingAudio !== undefined && playingAudio === true) ||
      playingAudio === undefined
    ) {
      sound?.play()
    } // else don't play audio
  }

  if (!buttonLabel) return null
  return (
    <button
      className="btn-game-yellow btn-lg btn text-lg"
      type="button"
      onClick={handleRestart}
    >
      {buttonLabel}
    </button>
  )
}

export default memo(Player)
