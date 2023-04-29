import { MetaTags } from '@redwoodjs/web'

type SortingGameLayoutProps = {
  children?: React.ReactNode
}

const SortingGameLayout = ({ children }: SortingGameLayoutProps) => {
  return (
    <>
      <MetaTags title="Sorting Game" description="Sorting game page" />
      <h1 className="text-2xl font-bold">Sorting Game</h1>
      {children}
    </>
  )
}

export default SortingGameLayout
