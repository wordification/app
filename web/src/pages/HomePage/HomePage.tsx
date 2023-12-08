import { MetaTags } from '@redwoodjs/web'

const UPDATES = [
  {
    title: 'New Game: Building',
    date: '2023-12-06',
    content:
      "We've added a new game to the site: Building. In this game, you'll be given part of a word and you'll see which words you can build with it.",
  },
  {
    title: 'New Game: Matching',
    date: '2022-10-23',
    content:
      "We've added a new game to the site: Matching. In this game, you'll be given a list of words and you'll have to match them to their sounds.",
  },
  {
    title: 'New Game: Sorting',
    date: '2022-08-23',
    content:
      "We've added a new game to the site: Sorting. In this game, you'll be given a list of words and you'll have to sort them into their correct categories.",
  },
] as const

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" />
      <h1 className="hidden">Wordification</h1>
      <h2 className="text-xl font-bold">Updates</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {UPDATES.map((update) => (
          <div
            className="card shadow-xl"
            key={`${update.title}-${update.date}`}
          >
            <div className="card-body">
              <h4 className="card-title">{update.title}</h4>
              <p>{update.content}</p>
              <div className="card-actions justify-end">
                <div className="badge-outline badge">{update.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default HomePage
