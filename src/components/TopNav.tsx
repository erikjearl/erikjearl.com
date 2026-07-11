import { sections, site } from '../content/site';
import '../styles/topnav.css';

export function TopNav() {
  return (
    <header id="topnav">
      <a className="brand" href="#hero">{site.name}</a>
      <nav aria-label="Main">
        <ul>
          {sections.filter((s) => s.id !== 'hero').map((s) => (
            <li key={s.id}><a href={`#${s.id}`}>{s.label}</a></li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
