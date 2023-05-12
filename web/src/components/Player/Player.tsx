import { useState, useMemo, useEffect } from 'react'

import { Howl } from 'howler'

const Player = ({
  files,
  buttonLabel,
}: {
  files: readonly string[]
  buttonLabel?: string
}) => {
  const [currentFileIndex, setCurrentFileIndex] = useState(0)
  const sound = useMemo(
    () =>
      new Howl({
        src: [files[currentFileIndex]],
        onend: () => {
          if (currentFileIndex < files.length - 1) {
            setCurrentFileIndex(currentFileIndex + 1)
          }
        },
      }),
    [currentFileIndex, files]
  )

  const handleRestart = () => {
    if (currentFileIndex === 0) {
      sound?.stop()
    } else {
      sound?.unload()
      setCurrentFileIndex(0)
    }

    sound?.play()
  }

  useEffect(() => {
    sound?.play()
    return () => {
      sound?.stop()
    }
  }, [sound])

  if (!buttonLabel) return null
  return (
    <button className="btn-accent btn" type="button" onClick={handleRestart}>
      {buttonLabel}
    </button>
  )
}

export default Player
