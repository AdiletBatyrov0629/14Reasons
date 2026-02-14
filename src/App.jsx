import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import CardSection from './components/CardSection';
import Finale from './components/Finale';
import ScrollProgress from './components/ScrollProgress';
import Cursor from './components/Cursor';

import cards from './data/cards';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [lenisRef, setLenisRef] = useState(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisRef(lenis);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div className="App font-body text-dark">
      <Cursor />
      <ScrollProgress />
      <Hero />

      <main>
        {cards.map((card, index) => (
          <CardSection
            key={card.id}
            card={card}
            index={index}
          />
        ))}
      </main>

      <Finale lenis={lenisRef} />
    </div>
  );
}

export default App;
