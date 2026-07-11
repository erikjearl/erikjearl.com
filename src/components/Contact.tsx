import { Section } from './Section';
import { Reveal } from './Reveal';
import { FloatPhoto } from './FloatPhoto';
import { Starfield } from './Starfield';
import { site } from '../content/site';
import { contactPrints } from '../content/prints';
import '../styles/contact.css';

export function Contact() {
  return (
    <Section id="contact" bg={{ src: '/assets/introck.jpg', alt: 'Joshua Tree rock formation at dusk with the moon rising', speed: 0.1 }} scrim>
      <Starfield />
      <div className="content">
        <Reveal className="section-eyebrow">
          <span className="num">iv.</span>
          <span className="name">Contact</span>
        </Reveal>
        <Reveal as="h2" delay={1}>Get in <em>touch.</em></Reveal>
        <Reveal as="p" delay={2} className="lede">
          Whether it's about work, climbing, or anything in between — my inbox is open.
        </Reveal>
        <Reveal className="contact-card" delay={3}>
          <div className="contact-row"><span className="k">Email</span><a href={`mailto:${site.email}`}>{site.email}</a></div>
          <div className="contact-row"><span className="k">GitHub</span><a href={site.github} target="_blank" rel="noopener noreferrer">github.com/erikjearl</a></div>
          <div className="contact-row"><span className="k">LinkedIn</span><a href={site.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/erikjearl</a></div>
        </Reveal>
        <Reveal as="span" delay={4} className="reveal-inline">
          <a className="resume-btn" href={site.resumeHref}>Download Resume</a>
        </Reveal>
        <footer>© 2026 Erik Earl</footer>
      </div>
      {contactPrints.map((p) => <FloatPhoto key={p.caption} print={p} />)}
    </Section>
  );
}
