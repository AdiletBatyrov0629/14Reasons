import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CardSection({ card, index }) {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const visualRef = useRef(null);
    const dividerRef = useRef(null);
    const floatsRef = useRef([]);
    const bgTextRef = useRef(null);
    const numberRef = useRef(null);

    const isReverse = index % 2 !== 0;

    const IconComponent = card.Icon;

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    end: 'bottom 25%',
                    toggleActions: 'play none none reverse',
                },
            });

            tl.to(contentRef.current, { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' });
            tl.to(visualRef.current, { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power3.out' }, '-=1');
            tl.to(dividerRef.current, { scaleX: 1, duration: 0.8, ease: 'power3.out' }, '-=0.8');
            tl.to(
                floatsRef.current,
                { opacity: 0.6, scale: 1, duration: 1, ease: 'power2.out', stagger: 0.2 },
                '-=0.6'
            );

            gsap.to(bgTextRef.current, {
                yPercent: -20,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                },
            });

            if (numberRef.current) {
                gsap.to(numberRef.current, {
                    color: '#FF1A00',
                    webkitTextStrokeColor: '#FF1A00',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 60%',
                        end: 'top 30%',
                        scrub: true,
                    }
                });
            }

            floatsRef.current.forEach((el, i) => {
                if (el) {
                    gsap.to(el, {
                        y: `${(i % 2 === 0 ? -1 : 1) * 12}px`,
                        rotation: (i % 2 === 0 ? 1 : -1) * 8,
                        duration: 2.5 + i * 0.5,
                        ease: 'sine.inOut',
                        repeat: -1,
                        yoyo: true,
                    });
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [isReverse]);

    const num = String(card.id).padStart(2, '0');

    const contentOrder = isReverse ? 'md:order-2' : 'md:order-1';
    const visualOrder = 'order-first ' + (isReverse ? 'md:order-1' : 'md:order-2');

    const contentInitialX = isReverse ? 'translate-x-[80px]' : '-translate-x-[80px]';
    const visualInitialX = isReverse ? '-translate-x-[80px]' : 'translate-x-[80px]';

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex items-center justify-center py-16 px-6 md:px-8 relative overflow-hidden group"
            id={`card-${card.id}`}
            style={{ '--card-accent': card.color }}
        >
            <span
                ref={bgTextRef}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,20vw,18rem)] font-black text-dark opacity-[0.03] whitespace-nowrap pointer-events-none z-0 select-none"
            >
                {num}
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 max-w-[1200px] w-full items-center">
                <div
                    ref={contentRef}
                    className={`opacity-0 ${contentInitialX} ${contentOrder}`}
                >
                    <span
                        ref={numberRef}
                        className="block font-display text-[clamp(4rem,8vw,7rem)] font-extrabold leading-none mb-2 transition-colors duration-300 ease-out-expo text-stroke-2 text-transparent"
                        style={{ WebkitTextStrokeColor: 'var(--color-dark)' }}
                    >
                        {num}
                    </span>

                    <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-dark mb-6 leading-[1.1] flex flex-wrap items-center gap-3 md:gap-4">
                        {card.quality}
                        <IconComponent size={36} strokeWidth={2} className="text-primary inline-block flex-shrink-0" />
                    </h2>

                    <div ref={dividerRef} className="w-[60px] h-[3px] bg-primary mb-6 scale-x-0 origin-left" />
                    <p className="font-display italic text-[clamp(1.1rem,1.6vw,1.4rem)] text-text-light leading-relaxed max-w-[450px]">
                        {card.story}
                    </p>
                </div>

                <div
                    ref={visualRef}
                    className={`relative opacity-0 scale-90 ${visualInitialX} ${visualOrder}`}
                >
                    <div className="relative w-full aspect-[16/10] md:aspect-[3/4] rounded-2xl overflow-hidden bg-dark shadow-2xl">
                        {card.image ? (
                            <img src={card.image} alt={card.quality} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-[clamp(4rem,10vw,8rem)] bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] relative overflow-hidden">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,var(--card-accent,var(--color-primary)),transparent_60%)] opacity-15" />
                                <IconComponent size={80} strokeWidth={1} className="text-white/20" />
                            </div>
                        )}

                        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />
                    </div>

                    {['✦', '✦'].map((e, i) => {
                        const positions = [
                            '-top-[8%] right-[10%]',
                            '-bottom-[5%] -left-[5%]'
                        ];
                        return (
                            <span
                                key={i}
                                ref={(el) => (floatsRef.current[i] = el)}
                                className={`absolute z-[2] text-2xl opacity-0 pointer-events-none text-primary ${positions[i]}`}
                                style={{ transform: 'scale(0)' }}
                            >
                                {e}
                            </span>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
