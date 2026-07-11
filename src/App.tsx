import { TopNav } from './components/TopNav';
import { RouteRail } from './components/RouteRail';
import { Hero } from './components/Hero';

export default function App() {
  return (
    <main className="site">
      <TopNav />
      <RouteRail />
      <Hero />
    </main>
  );
}
