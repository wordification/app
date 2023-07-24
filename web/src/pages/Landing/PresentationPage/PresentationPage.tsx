import { Link } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

const LandingPresentationPage = () => {
  return (
    <>
      <MetaTags title="Presentation" description="Presentation page" />

      <div className="divider">
        <h1 className="text-xl font-semibold">CSCE 2023 Conference</h1>
      </div>
      <div className="hero mb-10 mt-10 rounded-lg bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/** Insert doc link here */}
          <Link to="">
            <div className="card image-full w-72 flex-shrink-0 bg-base-100 shadow-xl transition hover:shadow-2xl">
              <figure>
                {/** Insert doc image link here */}
                <img
                  src="https://placehold.co/560x560"
                  alt="Wordification Paper"
                />
              </figure>
            </div>
          </Link>
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-semibold">Wordification:</h1>
            <h1 className="text-5xl font-bold">
              A New Way of Teaching English Spelling Patterns [CSCE &apos;23]
            </h1>
            <div className="py-6 italic">
              <p className="py-2">
                2023 World Congress in Computer Science, Computer Engineering, &
                Applied Computing (CSCE&apos;23)
              </p>
              <p className="py-1">Las Vegas, 26 July 2023</p>
              <p>
                Lexington Whalen, Dalton Craven, Shashank Comandur, Nathan
                Bickel, Homayoun Valafar, Stanley Dubinsky
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title italic">
            Wordification: A New Way of Teaching English Spelling Patterns [CSCE
            &apos;23] Presentation
          </h2>
          <div>
            <div className="rounded-box card-body mx-auto mt-5 bg-neutral p-2 shadow-inner">
              <iframe
                className="md:w-1120 h-630 w-full"
                width="1120"
                height="630"
                src=""
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingPresentationPage
