import { Section } from './Section';
import { Reveal } from './Reveal';
import { jobs } from '../content/jobs';
import '../styles/experience.css';

export function Experience() {
  return (
    <Section id="experience" bg={{ src: '/assets/topo.jpg', alt: 'Climbing routes drawn over a granite face', speed: 0.05 }}>
      <div className="exp-head">
        <Reveal className="section-eyebrow">
          <span className="num">ii.</span>
          <span className="name">Experience</span>
        </Reveal>
        <Reveal as="h2" delay={1}>Where I've worked.</Reveal>
        <Reveal as="p" delay={2} className="sub">
          Four years of building platforms, automating infrastructure, and shipping tools other engineers rely on.
        </Reveal>
      </div>
      {jobs.map((job) => (
        <Reveal className="job" key={`${job.company}-${job.year}`}>
          <div className="years">{job.year}<small>{job.yearNote}</small></div>
          <div>
            <div className="co">{job.company}</div>
            <h3>{job.title}</h3>
            <p>{job.description}</p>
          </div>
          <div className="stack">
            {job.stack.map((line) => <span key={line}>{line}<br /></span>)}
          </div>
        </Reveal>
      ))}
    </Section>
  );
}
