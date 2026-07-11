import { Reveal } from './Reveal';
import { projects } from '../content/projects';
import '../styles/projects.css';

export function Projects() {
  return (
    <section id="projects">
      <div className="proj-banner">
        <img className="banner-img" src="/assets/landscape.jpg" alt="Joshua Tree desert panorama at dusk" loading="lazy" />
        <div className="proj-head">
          <Reveal className="section-eyebrow">
            <span className="num">iii.</span>
            <span className="name">Projects</span>
          </Reveal>
          <Reveal as="h2" delay={1}>Selected projects.</Reveal>
          <Reveal as="p" delay={2} className="sub">
            Side projects built for the love of the problem — most of them running on a Kubernetes cluster in my home lab.
          </Reveal>
        </div>
      </div>
      <div className="proj-grid">
        {projects.map((p, i) => (
          <Reveal className="proj-card" key={p.num} delay={(i + 1) as 1 | 2 | 3}>
            <div className="pnum">{p.num}</div>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <div className="stack">{p.stack}</div>
            <div className="where">{p.context}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
