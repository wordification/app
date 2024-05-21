import { MetaTags } from '@redwoodjs/web'

const PI_INFO = [
  {
    name: 'Dr. Stanley Dubinsky',
    info: 'Linguistics, USC',
    link: 'https://sc.edu/study/colleges_schools/artsandsciences/english_language_and_literature/our_people/directory/dubinsky_stanley.php',
  },
  {
    name: 'Dr. Matt Irvin',
    info: 'Child Development Research Center, USC',
    link: 'https://sc.edu/study/colleges_schools/education/faculty-staff/irvin_matt.php',
  },
  {
    name: 'Dr. Lucy Spence',
    info: 'College of Education, USC',
    link: 'https://sc.edu/study/colleges_schools/education/faculty-staff/spence_lucy.php',
  },
  {
    name: 'Dr. Biplav Srivastava',
    info: 'AI Institute, USC',
    link: 'https://sc.edu/study/colleges_schools/engineering_and_computing/faculty-staff/srivastava.php',
  },
  {
    name: 'Dr. Angie Starrett',
    info: 'College of Education, USC',
    link: 'https://sc.edu/study/colleges_schools/education/faculty-staff/starrett_angie.php',
  },
  {
    name: 'Dr. Homayoun Valafar',
    info: 'Computer Science & Engineering, USC',
    link: 'https://sc.edu/study/colleges_schools/engineering_and_computing/faculty-staff/homayounvalafar.php',
  },
  {
    name: 'Dr. Krystal Werfel',
    info: 'Boys Town National Research Hospital',
    link: 'https://www.boystownhospital.org/research/faculty/krystal-werfel',
  },
  {
    name: 'Sabrina Habib Williams',
    info: '',
    link: '',
  },
] as const

const KEY_PERSONNEL_INFO = [
  {
    name: 'Don Doggett',
    info: 'South Carolina Organization of Rural Schools',
    link: 'https://www.linkedin.com/in/don-doggett/',
  },
  {
    name: 'Dr. Tracey Weldon',
    info: 'Greenwood/Asher & Associates',
    link: 'https://www.linkedin.com/in/tracey-weldon-b7784134/',
  },
  {
    name: 'Lex Whalen',
    info: 'USC MS Computer Science, 2024',
    link: 'https://www.linkedin.com/in/lxaw/',
  },
] as const

const DEV_INFO = [
  {
    name: 'Clay Crews',
    info: 'USC MS Computer Engineering, 2024',
    link: 'https://www.linkedin.com/in/jccrews/',
  },
  {
    name: 'Jillian Brown',
    info: 'USC BA Global Studies - Minor in Linguistics, 2024',
    link: 'https://www.linkedin.com/in/jillian-brown-372585264/',
  },
  {
    name: 'Thien Le',
    info: 'USC BS Computer Science, 2025',
    link: 'https://www.linkedin.com/in/thienle210303/',
  },
] as const

const PROJECT_ALUMNI_INFO = [
  {
    name: 'Julian Amrine',
    info: 'USC BS Computer Science, 2018',
    link: 'https://www.linkedin.com/in/julian-amrine-45614790/',
  },
  {
    name: 'Yianni Angelidis',
    info: 'USC BS Computer Science, 2022',
    link: 'https://www.linkedin.com/in/yianni-angelidis/',
  },
  {
    name: 'Sydney Bassard',
    info: 'USC MSP Speech Language Pathology, 2017',
    link: 'https://www.linkedin.com/in/sydney-bassard-42417296/',
  },
  {
    name: 'Benjamin Beaver',
    info: 'Hammond School',
    link: 'https://www.linkedin.com/in/benjamin-beaver-4b7677227/',
  },
  {
    name: 'Nathan Bickel',
    info: 'USC BS Computer Science, 2025',
    link: 'https://www.linkedin.com/in/nathan-bickel/',
  },
  {
    name: 'Dr. Duncan Buell',
    info: 'USC Professor Emeritus Computer Science',
    link: 'https://www.linkedin.com/in/duncan-buell-7a5a7a/',
  },
  {
    name: 'Samyu Comandur',
    info: 'USC BS Computer Science and Statistics, 2021',
    link: 'https://www.linkedin.com/in/samyu-comandur/',
  },
  {
    name: 'Shashank Comandur',
    info: 'USC BS Computer Science, 2024',
    link: 'https://www.linkedin.com/in/shashank-comandur-94a2191b9/',
  },
  {
    name: 'Dalton Craven',
    info: 'USC BS Computer Science, 2023',
    link: 'https://www.linkedin.com/in/daltoncraven/',
  },
  {
    name: 'Dr. Lisa Fitton',
    info: 'Communication Sciences & Disorders, USC',
    link: 'https://sc.edu/study/colleges_schools/public_health/faculty-staff/fitton_lisa.php',
  },
  {
    name: 'Jackson Ginn',
    info: 'USC BS Computer Science, 2025',
    link: 'https://www.linkedin.com/in/jacksonginn/',
  },
  {
    name: 'Lindsey Hudson',
    info: 'USC MA Linguistics, 2011',
    link: 'https://www.linkedin.com/in/lindseyahudson/',
  },
  {
    name: 'Dhruv Pai',
    info: 'USC BS Computer Science, 2022',
    link: 'https://www.linkedin.com/in/dhruv-pai-2226881a2/',
  },
  {
    name: 'Jun Zhou',
    info: 'Research Computing, USC',
    link: 'https://www.linkedin.com/in/zhou-jun-45356271/',
  },
] as const

const LandingContributorsPage = () => {
  return (
    <>
      <MetaTags title="Contributors" description="Contributors page" />

      <div className="flex flex-col bg-base-100 py-10">
        <div className="container mx-auto items-center">
          <div className="mb-20">
            <div className="card mx-auto mb-10 max-w-2xl bg-base-300 text-center">
              <div className="card-body">
                <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                  PI/Co-PIs
                </h2>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {PI_INFO.map(({ name, info, link }) => (
                <li
                  key={name}
                  className="card card-side card-compact bg-base-300 shadow-lg transition hover:shadow-2xl"
                >
                  <a
                    href={link}
                    target="blank"
                    className="card-body items-center"
                  >
                    <h3 className="card-title">{name}</h3>
                    <div className="text-center text-lg">{info}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-20">
            <div className="card mx-auto mb-10 max-w-2xl bg-base-300 text-center">
              <div className="card-body">
                <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                  Key Personnel and Consultants
                </h2>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {KEY_PERSONNEL_INFO.map(({ name, info, link }) => (
                <li
                  key={name}
                  className="card card-side card-compact bg-base-300 shadow-lg transition hover:shadow-2xl"
                >
                  <a
                    href={link}
                    target="blank"
                    className="card-body items-center"
                  >
                    <h3 className="card-title">{name}</h3>
                    <div className="text-center text-lg">{info}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-20">
            <div className="card mx-auto mb-10 max-w-2xl bg-base-300 text-center">
              <div className="card-body">
                <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                  Developers
                </h2>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {DEV_INFO.map(({ name, info, link }) => (
                <li
                  key={name}
                  className="card card-side card-compact bg-base-300 shadow-lg transition hover:shadow-2xl"
                >
                  <a
                    href={link}
                    target="blank"
                    className="card-body items-center"
                  >
                    <h3 className="card-title">{name}</h3>
                    <div className="text-center text-lg">{info}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-20">
            <div className="card mx-auto mb-10 max-w-2xl bg-base-300 text-center">
              <div className="card-body">
                <h2 className="text-3xl font-bold tracking-tight text-secondary sm:text-4xl">
                  Project Alumni
                </h2>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {PROJECT_ALUMNI_INFO.map(({ name, info, link }) => (
                <li
                  key={name}
                  className="card card-side card-compact bg-base-300 shadow-lg transition hover:shadow-2xl"
                >
                  <a
                    href={link}
                    target="blank"
                    className="card-body items-center"
                  >
                    <h3 className="card-title">{name}</h3>
                    <div className="text-center text-lg">{info}</div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default LandingContributorsPage
