import { MetaTags } from '@redwoodjs/web'

const LandingDemonstrationPage = () => {
  return (
    <>
      <MetaTags title="Demonstration" description="Demonstration page" />

      <div className="hero h-full bg-gradient-to-b from-primary from-50% via-secondary shadow-inner">
        <div className="hero-content">
          <div className="card glass max-w-md shadow-xl hover:shadow-xl">
            <div className="card-body text-center text-primary-content">
              <h1 className="card-title text-5xl font-bold">
                Try Wordification
              </h1>
              <p className="py-6">Watch our demo video or sign in!</p>
              <button className="btn-primary btn">Sign In</button>
            </div>
          </div>

          <div className="card w-auto bg-base-200 shadow-xl transition hover:shadow-2xl">
            <div className="card-body text-center">
              <p className="text-xl">
                For log-in credentials, please contact <b>Stanley Dubinsky</b>{' '}
                at dubinsky@sc.edu
                <br />
                <br />
                Or just watch our demo!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-box mx-auto mt-20 w-fit bg-neutral p-4 shadow-inner">
        {/** TODO: Create demo video */}
      </div>
    </>
  )
}

export default LandingDemonstrationPage
