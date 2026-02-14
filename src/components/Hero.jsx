import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Heart, Sparkles, Star } from 'lucide-react';

export default function Hero() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const subtitleRef = useRef(null);
    const scrollRef = useRef(null);
    const wordsRef = useRef([]);
    const decosRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 });

            tl.to(labelRef.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' });
            tl.to(
                wordsRef.current,
                { y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.08 },
                '-=0.6'
            );
            tl.to(
                subtitleRef.current,
                { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                '-=0.5'
            );
            tl.to(
                scrollRef.current,
                { opacity: 1, duration: 1, ease: 'power2.out' },
                '-=0.3'
            );
            tl.to(
                decosRef.current,
                { opacity: 0.3, scale: 1, duration: 1.5, ease: 'power2.out', stagger: 0.15 },
                '-=1'
            );

            decosRef.current.forEach((el, i) => {
                if (el) {
                    gsap.to(el, {
                        y: `${(i % 2 === 0 ? -1 : 1) * 15}px`,
                        rotation: (i % 2 === 0 ? 1 : -1) * 10,
                        duration: 3 + i * 0.5,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                        delay: i * 0.3,
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const titleWords = ['14 причин', 'любить тебя'];

    return (
        <section ref={sectionRef} className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden" id="hero">
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_50%_50%,rgba(255,26,0,0.06)_0%,transparent_60%)] animate-hero-pulse" />
            </div>

            {[{ Icon: Heart }, { Icon: Sparkles }, { Icon: Star }, { Icon: Heart }].map((item, i) => {
                const positions = [
                    'top-[15%] left-[10%]',
                    'top-[20%] right-[12%]',
                    'bottom-[25%] left-[15%]',
                    'bottom-[20%] right-[10%]'
                ];
                const Comp = item.Icon;

                return (
                    <span
                        key={i}
                        ref={(el) => (decosRef.current[i] = el)}
                        className={`absolute z-[1] opacity-0 pointer-events-none hidden md:block ${positions[i]}`}
                        style={{ transform: 'scale(0)' }}
                    >
                        <Comp size={i % 2 === 0 ? 32 : 48} strokeWidth={1} />
                    </span>
                );
            })}

            <div className="relative z-[2] text-center max-w-[900px]">
                <p
                    ref={labelRef}
                    className="font-display text-[clamp(0.7rem,1.2vw,0.9rem)] font-semibold tracking-[0.35em] uppercase text-primary mb-8 opacity-0 translate-y-5 flex items-center justify-center"
                >
                    <Heart size={14} className="inline-block mr-3 fill-primary" />
                    14 февраля • С днем святого Валентина
                    <Heart size={14} className="inline-block ml-3 fill-primary" />
                </p>

                <h1 className="font-display text-[clamp(2.5rem,10vw,4rem)] md:text-[clamp(3rem,8vw,7rem)] font-bold leading-[1.05] text-dark mb-6 overflow-hidden">
                    {titleWords.map((line, i) => (
                        <span key={i} className="block overflow-hidden">
                            <span
                                ref={(el) => (wordsRef.current[i] = el)}
                                className="inline-block translate-y-[110%]"
                            >
                                {line}
                            </span>
                        </span>
                    ))}
                </h1>

                <p
                    ref={subtitleRef}
                    className="font-display italic text-[clamp(1.5rem,2.2vw,1.8rem)] text-text-light max-w-[400px] mx-auto leading-relaxed opacity-0 translate-y-8 mb-16"
                >
                    Сегодня наш праздник, моя любимая.
                </p>
            </div>

            <div ref={scrollRef} className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[2] opacity-0">
                <span className="font-display text-[0.7rem] font-medium tracking-[0.2em] uppercase text-text-light">Листай</span>
                <div className="w-px h-[60px] bg-text-light relative overflow-hidden">
                    <div className="absolute -top-full left-0 w-full h-full bg-primary animate-scroll-line" />
                </div>
            </div>
        </section>
    );
}
