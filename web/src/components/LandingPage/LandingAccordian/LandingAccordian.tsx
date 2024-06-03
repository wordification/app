import React, { useState } from 'react';

import Description from '../Description/Description'
import Importance from '../Importance/Importance'
import Issues from '../Issues/Issues'
import Solution from '../Solution/Solution'
import Transition from '../Transition/Transition'

const PAGES = [
  {
    title: 'The Wordification™ Project Description',
    body: <Description />,
  },
  {
    title: 'The practical importance of this project cannot be overstated',
    body: <Importance />,
  },
  {
    title: 'Inadequacy of Current Typical Practice',
    body: <Issues />,
  },
  {
    title: 'Transition',
    body: <Transition />,
  },
  {
    title: 'Computerized Spelling Instruction: A Solution',
    body: <Solution />,
  },
] as const;

const LandingAccordian = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="about" className="flex flex-col">
      {PAGES.map(({ title, body }, index) => (
        <div key={title} className="container mx-auto mb-5">
          <div
            className={`collapse mb-1 ${openIndex === index ? 'collapse-open' : 'collapse-close'} ${
              index % 2 === 0 ? 'bg-base-100' : 'bg-base-200'
            } shadow-lg` }
          >
            <div
              className="collapse-title mb-5 text-2xl font-semibold cursor-pointer flex justify-between items-center"
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
  );
};

export default LandingAccordian
