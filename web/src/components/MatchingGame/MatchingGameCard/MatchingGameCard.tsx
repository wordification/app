import { useEffect, useState } from 'react'

import Player from 'src/components/Player/Player'

type MatchingGameCardProps = {
  flipped: boolean
  word: string
  check: boolean
  disabled: boolean
  files: string[] | null | undefined
  onClick: () => void
  onComplete: () => void
}

/**
 * Code adapted from Tailwind CSS Snippets
 * @see https://www.youtube.com/watch?v=SJnRnQdjR0w
 * @see https://play.tailwindcss.com/gt4tkNCFyA
 */
const MatchingGameCard = ({
  word,
  flipped,
  check,
  disabled,
  files,
  onClick,
  onComplete,
}: MatchingGameCardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(flipped)
  const [oldCheck, setOldCheck] = useState<boolean>(check)

  useEffect(() => {
    setIsFlipped(flipped)
  }, [flipped])

  const handleFlip = async () => {
    setIsFlipped(!isFlipped)

    onClick()
  }

  if (check !== oldCheck) {
    setTimeout(() => {
      if (flipped !== isFlipped) {
        setIsFlipped(flipped)
      }
    }, 2000)
    setOldCheck(check)
  }

  return (
    <>
      <button
        className="group aspect-square w-32 [perspective:1000px]"
        onClick={handleFlip}
        disabled={flipped || disabled}
      >
        <div
          className={`card relative h-full w-full rounded-xl bg-primary text-primary-content shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
            isFlipped || flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <div className="align-center card-body absolute inset-0 justify-center text-center [backface-visibility:hidden]"></div>
          <div className="align-center card-body absolute inset-0 justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            {word}
          </div>
        </div>
      </button>
      {files && <Player files={files} onComplete={onComplete} />}
    </>
  )
}

export default MatchingGameCard