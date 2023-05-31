import { useState } from 'react'

const ProgressionCard = ({
  phoneme,
  graphemes,
}: {
  phoneme: string
  graphemes: { label: string; active: boolean }[]
}) => {
  // TODO: this is a hacky way to make the graphemes feel interactive.
  // It should actually trigger a callback passed into the component
  // that updates the state of the parent component.
  const [hackyGraphemeState, setHackyGraphemeState] = useState(graphemes)

  const handleClick = (currentGrapheme: string) => {
    const newGraphemes = hackyGraphemeState.map((grapheme) => {
      if (grapheme.label === currentGrapheme) {
        return { ...grapheme, active: !grapheme.active }
      }
      return grapheme
    })

    setHackyGraphemeState(newGraphemes)
  }

  return (
    <div className="card-compact card bg-gradient-to-tr from-base-300 to-base-200 text-base-content shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{phoneme}</h2>
        <div className="btn-group">
          {hackyGraphemeState.map((grapheme) => (
            <button
              className={`btn-primary btn flex-1 normal-case ${
                grapheme.active ? '' : 'btn-outline'
              }`}
              key={grapheme.label}
              onClick={() => handleClick(grapheme.label)}
            >
              {grapheme.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProgressionCard
