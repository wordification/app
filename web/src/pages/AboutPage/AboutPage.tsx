import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />

      <h1 className="text-2xl font-bold">About Wordification</h1>
      <h2 className="text-xl">What is Wordification?</h2>
      <h2 className="text-xl">What is our goal?</h2>
      <h2 className="text-xl">Who made Wordification?</h2>
    </>
  )
}

export default AboutPage
