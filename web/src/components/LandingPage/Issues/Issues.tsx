const CARDS = [
  {
    title:
      'Spelling is a linguistic skill, but spelling instruction is memory-based',
    body: (
      <p>
        The most common instructional approach used by teachers is memorization,
        with words learned several at a time (e.g., weekly spelling lists).
        However, research confirms that students’ learning of spelling is best
        gained by understanding words’ linguistic features, not memorization.
        Weiser & Mathes (2011) report significant positive effects of
        linguistic-based instruction on spelling outcomes. But despite
        theoretical and empirical support, little instructional time is spent
        developing or applying linguistic skills.
      </p>
    ),
  },
  {
    title:
      'Teachers don’t often have training in linguistic spelling principles',
    body: (
      <p>
        Most primary school teachers have little linguistic training, training
        that would prepare them for such things as counting the number of sounds
        in words, in counting the number of morphemes, and in understanding the
        rules that map sounds to letters and letters to sounds. This training
        deficit typically results in students having lower spelling skills. And
        teachers self-report frustration with both their students’ poor spelling
        abilities and with their own struggles to provide effective spelling
        instruction. Preliminary data indicates that 73% of teachers believe
        their training programs did not prepare them to provide high-quality
        spelling instruction.
      </p>
    ),
  },
  {
    title:
      'Teachers are unable to provide adaptations for struggling or dialect learners',
    body: (
      <p>
        Adapting instruction to each student’s unique needs is a primary
        characteristic of effective spelling instruction. Despite this, almost
        half of teachers are not in a position to make adjustments in their
        implementation of spelling instruction to accommodate the skill levels
        of individual students. Additionally, students’ use of language
        variation, or dialect use, is known to influence spelling in English.
      </p>
    ),
  },
] as const

const Issues = () => {
  return (
    <div className="flex flex-col items-center bg-base-100 py-10">
      <div className="container mx-auto">
        <div className="card mb-8 w-auto bg-base-200 shadow-xl transition hover:shadow-2xl">
          <div className="card-body">
            <p>
              Current methodologies for classroom spelling instruction are
              largely memorization-based and one-size-fits-all. More
              sophisticated, individualized tutoring methods are available only
              to those wealthy enough to afford them. Further, many teachers
              lack in-depth understanding of the English spelling system and
              report low confidence in their ability to teach English spelling
              effectively. As a result, typical classroom instruction of English
              spelling fails to meet the literacy needs of all students.
              Preliminary data suggests that the majority of teachers themselves
              believe that spelling is not adequately addressed in their own
              classrooms. There are three reasons for this:
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          {CARDS.map(({ title, body }) => (
            <div
              key={title}
              className="collapse-plus collapse mb-1 bg-base-200"
            >
              <input type="radio" name="issues-accordion" />
              <div className="collapse-title text-xl font-medium">{title}</div>
              <div className="collapse-content">{body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Issues
