import { Section } from './Section';
import { Reveal } from './Reveal';
import { site } from '../content/site';
import '../styles/hero.css';

export function Hero() {
  return (
    <Section id="hero" bg={{ src: '/assets/elcap.jpg', alt: 'El Capitan rising from the Yosemite valley floor', speed: 0.15 }} scrim>
      <div className="content">
        <Reveal immediate className="hero-stamp">{site.heroStamp}</Reveal>
        <Reveal as="h1" immediate>
          {site.name}<br /><em>{site.role.replace(' ', ' ')}</em>
        </Reveal>
        <Reveal as="p" immediate delay={1} className="hero-role">
          Currently building at <span className="co">{site.company}</span>. {site.heroLede}
        </Reveal>
      </div>
      <div className="scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <span className="line" />
      </div>
    </Section>
  );
}
