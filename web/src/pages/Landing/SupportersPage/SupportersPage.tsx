import { MetaTags } from '@redwoodjs/web'

const SUPPORTER_INFO = [
  {
    name: 'College of Arts and Sciences, USC',
    link: 'https://www.sc.edu/study/colleges_schools/artsandsciences/index.php',
  },
  {
    name: 'Office of Undergraduate Research, USC',
    link: 'https://sc.edu/about/offices_and_divisions/undergraduate_research/',
  },
  {
    name: 'South Carolina Honors College, USC',
    link: 'https://sc.edu/study/colleges_schools/honors_college/',
  },
  {
    name: 'Vice President for Research, USC',
    link: 'https://sc.edu/about/offices_and_divisions/research/',
  },
  {
    name: 'ScholasTech, LLC',
    link: '',
  },
] as const

const LandingSupportersPage = () => {
  return (
    <>
      <MetaTags title="Supporters" description="Supporters page" />

      <div className="flex flex-col bg-base-100 py-10">
        <div className="container mx-auto items-center">
          <div className="card mx-auto mb-10 max-w-2xl bg-base-300 text-center">
            <div className="card-body">
              <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                Our Supporters
              </h2>
              <p className="text-ls">Funding Provided By</p>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {SUPPORTER_INFO.map(({ name, link }) => (
              <li
                key={name}
                className="card card-side card-compact bg-base-300 shadow-lg transition hover:shadow-2xl"
              >
                {link === '' ? (
                  <div className="card-body items-center">
                    <h3 className="card-title">{name}</h3>
                  </div>
                ) : (
                  <a
                    href={link}
                    target="blank"
                    className="card-body items-center"
                  >
                    <h3 className="card-title">{name}</h3>
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default LandingSupportersPage
