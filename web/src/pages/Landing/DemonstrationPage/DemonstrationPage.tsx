import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LandingDemonstrationPage = () => {
  return (
    <>
      <MetaTags title="Demonstration" description="Demonstration page" />

      <div className="hero flex h-full flex-col bg-gradient-to-b from-primary from-50% via-secondary shadow-inner">
        <div className="hero-content">
          <div className="card glass w-72 shadow-xl hover:shadow-xl md:w-full">
            <div className="card-body text-center text-primary-content">
              <h1 className="card-title text-3xl font-bold md:text-5xl">
                Try Wordification
              </h1>
              <p className="py-6">Watch our demo video or sign in!</p>

              <Link className="font-bold normal-case" to={routes.login()}>
                <button className="btn-primary btn w-full md:w-96">
                  Sign In
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card w-auto bg-base-200 shadow-xl transition hover:shadow-2xl">
          <div className="card-body text-center">
            <p className="text-xl">
              For log-in credentials, please contact <b>Stanley Dubinsky</b> at
              dubinsky@sc.edu
              <br />
              <br />
              Or just watch our demo!
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-box mx-auto mt-20 bg-neutral p-4 shadow-inner">
        <iframe
          className="md:w-1120 h-630 w-full"
          width="1120"
          height="630"
          src="https://www.youtube-nocookie.com/embed/qmGYTPTPBSo"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </>
  )
}

export default LandingDemonstrationPage
