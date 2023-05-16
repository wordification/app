type MatchingGameCardProps = {
  flipped: boolean
  word: string
  onClick: () => void
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
    <li className="group h-32 w-32 [perspective:1000px]">
      <button
        onClick={onClick}
        className={`card card-compact h-full w-full bg-primary text-primary-content transition-all duration-200 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="card-body absolute inset-0 items-center justify-center text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <span className="card-title">{word}</span>
        </div>
      </button>
    </li>
  )
}

export default MatchingGameCard
