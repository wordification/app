// 25 test words

import MatchingGameCard from '../MatchingGameCard/MatchingGameCard'

// 5x5 grid
const WORDS = [
  'Apple',
  'Banana',
  'Carrot',
  'Dog',
  'Elephant',
  'Fish',
  'Grape',
  'Hamburger',
  'Ice Cream',
  'Jelly Bean',
  'Kiwi',
  'Lemon',
  'Mango',
  'Nut',
  'Orange',
  'Pineapple',
  'Quiche',
  'Raspberry',
  'Strawberry',
  'Tangerine',
  'Umbrella',
  'Vanilla',
  'Watermelon',
  'Xylophone',
  'Yogurt',
] as const

const MatchingGameGrid = () => {
  return (
    <div className="card bg-base-100 text-base-content shadow-2xl">
      <div className="card-body items-center justify-center">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {WORDS.map((word) => {
            return (
              <MatchingGameCard
                key={word}
                word={word}
                flipped
                onClick={() => {}}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default MatchingGameGrid
