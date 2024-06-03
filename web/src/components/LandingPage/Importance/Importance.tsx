import React, { useState } from 'react';

const ITEMS = [
  {
    title: 'The educational and societal cost of illiteracy is enormous',
    body: (
      <p>
        Adults with low literacy levels are less likely to graduate high school,
        attend college, or be employed full-time, as well as more likely to live
        in poverty, be incarcerated, and report poorer overall health. Low
        literacy has a substantial impact on national economic welfare. If US
        labor force literacy skills increased merely ¼ of a standard deviation,
        the GDP would increase by over 40 trillion dollars by 2090.
      </p>
    ),
  },
  {
    title: 'Literacy failure in the US is epidemic',
    body: (
      <p>
        The most recent National Assessment of Educational Progress (NAEP)
        reports reveal that only 35% of 4th graders and 34% of 8th graders read
        at a proficient or higher level, and students’ reading performance was
        lower in 2019 than 2017, suggesting that current methods are not
        working. Writing outcomes are worse than reading outcomes, with only 27%
        of 8th and 12th graders at a proficient or higher level. Likewise,
        teachers report that almost 30% of their students experience difficulty
        with spelling.
      </p>
    ),
  },
  {
    title:
      'Inadequate knowledge of the English spelling interferes with higher-level literacy',
    body: (
      <p>
        The ability to derive meaning from text depends on being able to{' '}
        <em>recognize words</em> and to{' '}
        <em>comprehend the language of the text</em>, and this must happen{' '}
        <em>fluently</em> for optimal performance. Inadequate knowledge of
        English spelling has a direct negative impact on word recognition and
        reading fluency, and an indirect negative impact on reading
        comprehension.{' '}
        <u>
          Therefore, spelling instruction is vital for students’ literacy and
          subsequent occupational success.
        </u>
      </p>
    ),
  },
] as const;

const Importance = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center bg-base-200 py-10">
      <div className="container mx-auto">
        <div className="flex flex-col">
          {ITEMS.map(({ title, body }, index) => (
            <div key={title} className="mb-5">
              <div
                className={`collapse mb-1 ${openIndex === index ? 'collapse-open' : 'collapse-close'} bg-base-100`}
              >
                <div
                  className="collapse-title text-xl font-medium cursor-pointer flex justify-between items-center"
                  onClick={() => toggleSection(index)}
                >
                  <span>{title}</span>
                  <span>{openIndex === index ? '-' : '+'}</span>
                </div>
                <div className="collapse-content">
                  {body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Importance;