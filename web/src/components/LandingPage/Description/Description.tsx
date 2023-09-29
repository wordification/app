const Description = () => {
  return (
    <div className="flex flex-col items-center bg-base-100 py-10">
      <div className="container mx-auto">
        <div className="card mb-20 w-auto bg-base-200 shadow-xl transition hover:shadow-2xl">
          <div className="card-body">
            <p className="py-6 text-xl">
              The Wordification™ Project is developing a web-based game system
              aimed at providing a language-based (as opposed to memory based)
              tool for English spelling instruction, and one that does not rely
              on teacher training. The application will be engineered so as to
              provide individuated instruction that can accommodate a full
              spectrum of learners.{' '}
              <b>
                It will also offer dialectally enhanced instruction for speakers
                of non-mainstream English dialects and careful-casual
                pronunciation contrasts for non-native English speakers.
              </b>{' '}
              As a resource that can deliver as much or as little spelling
              instruction as any given student may need, it will provide
              students who have decoding deficits (e.g., dyslexia) a path to
              enhanced literacy that would otherwise be missing from their
              education. The goal of this project is to provide a universally
              accessible, low-cost intervention nation-wide, and thereby to have
              a substantial positive impact on literacy (and hence national
              economic welfare) in every educational jurisdiction in which it is
              utilized.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Description
