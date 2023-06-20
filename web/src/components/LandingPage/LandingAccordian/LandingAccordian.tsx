import Description from '../Description/Description'
import Importance from '../Importance/Importance'
import Issues from '../Issues/Issues'
import Solution from '../Solution/Solution'
import Transition from '../Transition/Transition'

const PAGES = [
  {
    title: 'The Wordification® Project Description',
    body: <Description />,
  },
  {
    title: 'The practical importance of this project cannot be overstated',
    body: <Importance />,
  },
  {
    title: 'Inadequacy of Current Typical Practice',
    body: <Issues />,
  },
  {
    title: 'Transition',
    body: <Transition />,
  },
  {
    title: 'Computerized Spelling Instruction: A Solution',
    body: <Solution />,
  },
] as const

const LandingAccordian = () => {
  return (
    <div id="about" className="flex flex-col">
      {PAGES.map(({ title, body }, index) => {
        if (title === 'Transition') {
          return (
            <div key={title} className="mb-5">
              {body}
            </div>
          )
        } else {
          return (
            <div key={title} className="container mx-auto">
              <div
                className={`collapse-plus collapse mb-1 ${
                  index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'
                }`}
              >
                <input
                  type="radio"
                  name="landing-accordion"
                  checked={index === 0 ? true : undefined}
                />
                <div className="collapse-title mb-5 text-2xl font-semibold">
                  {title}
                </div>
                <div className="collapse-content">{body}</div>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default LandingAccordian
