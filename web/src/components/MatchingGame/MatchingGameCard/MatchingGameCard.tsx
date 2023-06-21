type MatchingGameCardProps = {
  flipped: boolean
  word: string
  onClick: () => void
}
const OldMatchingGameCard = ({
  word,
  flipped,
  onClick,
}: MatchingGameCardProps) => {
  return (
    <li className="group [perspective:1000px]">
      <div className="card-compact ">
        <button
          onClick={onClick}
          className={`relative h-full w-full bg-primary text-primary-content transition-all duration-200  [transform-style:preserve-3d] ${
            flipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          <div className="card-body absolute inset-0 items-center justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <span className="card-title">{word}</span>
          </div>
        </button>
      </div>
    </li>
  )
}

/**
 * Code adapted from Tailwind CSS Snippets
 * @see https://www.youtube.com/watch?v=SJnRnQdjR0w
 * @see https://play.tailwindcss.com/gt4tkNCFyA
 */
const MatchingGameCard = ({
  word,
  flipped,
  onClick,
}: MatchingGameCardProps) => {
  return (
    <div className="group aspect-square w-32 [perspective:1000px]">
      <div
        className={`card relative h-full w-full rounded-xl bg-primary text-primary-content shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="align-center card-body absolute inset-0 justify-center text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
          {word}
        </div>
      </div>
    </div>
  )
}

export default MatchingGameCard
