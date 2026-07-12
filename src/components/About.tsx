import { Section } from './Section';
import { Reveal } from './Reveal';
import { FloatPhoto } from './FloatPhoto';
import { site } from '../content/site';
import { aboutPrint } from '../content/prints';
import '../styles/about.css';

export function About() {
  return (
    <Section id="approach" bg={{ src: '/assets/gear.jpg', alt: 'Climbing helmet and rack on Joshua Tree granite, with a curious ringtail', speed: 0.07 }} scrim>
      <FloatPhoto print={aboutPrint} />
      <div className="content" style={{ maxWidth: 600 }}>
        <Reveal className="section-eyebrow">
          <span className="num">i.</span>
          <span className="name">About Me</span>
        </Reveal>
        <Reveal as="h2" delay={1}>{site.aboutHeading}</Reveal>
        {site.aboutParas.map((p, i) => (
          <Reveal as="p" key={i} delay={(i + 2) as 2 | 3}>{p}</Reveal>
        ))}
        <Reveal className="tag-row" delay={4}>
          {site.aboutTags.map((t) => <span key={t}>{t}</span>)}
        </Reveal>
      </div>
    </Section>
  );
}
