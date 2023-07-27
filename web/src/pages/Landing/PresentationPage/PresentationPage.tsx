import { MetaTags } from '@redwoodjs/web'

const LandingPresentationPage = () => {
  return (
    <>
      <MetaTags title="Presentation" description="Presentation page" />

      <div className="divider">
        <h1 className="text-xl font-semibold">CSCE 2023 Conference</h1>
      </div>
      <div className="hero mb-10 mt-10 rounded-lg bg-base-200">
        <div className="hero-content flex-col-reverse lg:flex-row-reverse">
          {/** --vvv-- INSERT DOC LINK HERE WHE PUBLISHED --vvv-- */}
          {/* <Link to="">
            <div className="card image-full w-72 flex-shrink-0 bg-base-100 shadow-xl transition hover:shadow-2xl">
              <figure>

                <img
                  src="https://placehold.co/560x560"
                  alt="Wordification Paper"
                />
              </figure>
            </div>
          </Link> */}
          {/** --^^^-- INSERT DOC LINK HERE WHE PUBLISHED --^^^-- */}

          {/** --vvv-- REMOVE WHEN INSERTING DOC --vvv-- */}
          <div className="card flex h-72 w-72 items-center justify-center bg-base-100 shadow-xl transition hover:shadow-2xl">
            <p className="text-center text-xl font-semibold">
              Link to Publication Coming Soon!
            </p>
          </div>
          {/** --^^^-- REMOVE WHEN INSERTING DOC --^^^-- */}

          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-semibold">Wordification:</h1>
            <h1 className="text-5xl font-bold">
              A New Way of Teaching English Spelling Patterns [CSCE &apos;23]
            </h1>
            <div className="py-6">
              <p className="py-2 italic">
                2023 World Congress in Computer Science, Computer Engineering, &
                Applied Computing (CSCE&apos;23)
              </p>
              <p className="py-1 italic">Las Vegas, 26 July 2023</p>
              <p className="py-2 font-bold">
                Lexington Whalen<sup>1</sup>, Dalton Craven<sup>1</sup>,
                Shashank Comandur<sup>1</sup>, Nathan Bickel<sup>1</sup>,
                Jackson Ginn<sup>1</sup>, Clay Crews<sup>1</sup>, Homayoun
                Valafar<sup>1</sup>, & Stanley Dubinsky<sup>2</sup>
              </p>
              <p className="py-1">
                <sup>1</sup>Department of Computer Science & Engineering,
                <sup>2</sup>Linguistics Program
              </p>
              <p className="font-semibold">University of South Carolina</p>
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
                src="https://www.youtube.com/embed/w6DAqp-X7Y0"
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
