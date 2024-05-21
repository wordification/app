import { useEffect, useState } from 'react'

type MatchingGameCardProps = {
  flipped: boolean
  word: string
  check: boolean
  disabled: boolean
  onClick: () => void
  grouping?: boolean
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
  onClick,
  grouping,
}: MatchingGameCardProps) => {
  const [isFlipped, setIsFlipped] = useState<boolean>(flipped)
  const [oldCheck, setOldCheck] = useState<boolean>(check)
  const [color, setColor] = useState<string>('bg-w-yellow')

  useEffect(() => {
    setIsFlipped(flipped)
  }, [flipped])

  const handleFlip = async () => {
    setIsFlipped(!isFlipped)

    onClick()
  }

  if (check !== oldCheck) {
    flipped !== isFlipped ? setColor('bg-red-500') : setColor('bg-w-yellow')
    setTimeout(() => {
      if (flipped !== isFlipped) {
        setIsFlipped(flipped)
        setColor('bg-w-yellow')
      }
    }, 2000)
    setOldCheck(check)
  }

  return (
    <>
      {grouping ? (
        <button
          className="group aspect-square w-48 [perspective:1000px]"
          onClick={handleFlip}
          disabled={flipped || disabled}
        >
          <div
            className={`card relative h-full w-full rounded-xl text-primary-content shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
              isFlipped || flipped ? '[transform:rotateY(180deg)]' : ''
            } ${flipped ? 'bg-green-500' : color}`}
          >
            <div
              className={`align-center card-body absolute inset-0 justify-center text-center ${
                grouping ? '[transform:rotateY(180deg)]' : ''
              } [backface-visibility:hidden]`}
            >
              <div className="flex min-h-full flex-col items-center justify-center">
                <div className="text-6xl">{word}</div>
              </div>
            </div>
            <div
              className={`${
                grouping ? '' : '[transform:rotateY(180deg)]'
              } card-body absolute inset-0 h-full w-full text-center [backface-visibility:hidden]`}
            >
              <div className="flex min-h-full flex-col items-center justify-center">
                <div className="text-6xl">{word}</div>
              </div>
            </div>
          </div>
        </button>
      ) : (
        <button
          className="group aspect-square w-48 [perspective:1000px]"
          onClick={handleFlip}
          disabled={flipped || disabled}
        >
          <div
            className={`card relative h-full w-full rounded-xl text-primary-content shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
              isFlipped || flipped ? '[transform:rotateY(180deg)]' : ''
            } ${flipped ? 'bg-green-500' : color}`}
          >
            <div
              className={`align-center card-body absolute inset-0 justify-center text-center ${
                grouping ? '[transform:rotateY(180deg)]' : ''
              } [backface-visibility:hidden]`}
            ></div>
            <div
              className={`${
                grouping ? '' : '[transform:rotateY(180deg)]'
              } card-body absolute inset-0 h-full w-full text-center [backface-visibility:hidden]`}
            >
              <div className="flex min-h-full flex-col items-center justify-center">
                <div className="text-6xl">{word}</div>
              </div>
            </div>
          </div>
        </button>
      )}
    </>
  )
}

export default MatchingGameCard
