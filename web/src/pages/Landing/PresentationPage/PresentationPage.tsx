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
          <div className="flex flex-col">
            <a href="https://american-cse.org/csce2023-ieee/pdfs/CSCE2023-5LlpKs7cpb4k2UysbLCuOx/275900b151/275900b151.pdf">
              <div className="card w-72 flex-shrink-0 bg-base-100 shadow-xl transition hover:shadow-2xl">
                <img
                  className="h-auto w-full max-w-sm rounded-lg"
                  src="CSCE2023_paper.png"
                  alt="Wordification CSCE 2023 Conference Paper"
                />
              </div>
            </a>
            <p className="ml-2 italic">Click to view!</p>
          </div>

          <div className="py-6 text-center lg:text-left">
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
