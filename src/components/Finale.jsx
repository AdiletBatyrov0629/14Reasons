import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Mail, X, Heart, Gem, Gift } from 'lucide-react';
import HeartParticles from './HeartParticles';

export default function Finale({ lenis }) {
    const [isOpen, setIsOpen] = useState(false);
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const btnRef = useRef(null);
    const overlayRef = useRef(null);
    const letterRef = useRef(null);
    const letterContentRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to([titleRef.current, btnRef.current], {
                opacity: 1,
                y: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%',
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleOpen = () => {
        setIsOpen(true);
        if (lenis) lenis.stop();
        document.body.style.overflow = 'hidden';

        if (particlesRef.current) particlesRef.current.burst();

        const tl = gsap.timeline();
        tl.to(overlayRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' });
        tl.to(letterRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.3');

        if (letterContentRef.current) {
            const children = letterContentRef.current.children;
            gsap.fromTo(children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out', delay: 0.5 }
            );
        }
    };

    const handleClose = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setIsOpen(false);
                if (lenis) lenis.start();
                document.body.style.overflow = '';
                if (particlesRef.current) particlesRef.current.stop();
            }
        });
        tl.to(letterRef.current, { opacity: 0, y: 50, scale: 0.95, duration: 0.4, ease: 'power2.in' });
        tl.to(overlayRef.current, { opacity: 0, duration: 0.4 }, '-=0.2');
    };

    return (
        <section ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden py-16 px-8 bg-bg">
            <HeartParticles ref={particlesRef} />

            <div className="text-center z-[2] w-full flex flex-col items-center">
                <h2 ref={titleRef} className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold text-dark mb-8 opacity-0 translate-y-[30px]">
                    И последнее...
                </h2>
                <button
                    ref={btnRef}
                    className="mx-auto font-display text-[clamp(1rem,1.5vw,1.2rem)] font-semibold uppercase tracking-widest text-white bg-primary py-4 px-12 rounded-full transition-all duration-400 ease-out-quart relative overflow-hidden opacity-0 translate-y-[30px] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,26,0,0.3)] group flex items-center justify-center gap-3"
                    onClick={handleOpen}
                >
                    <Mail size={20} className="relative z-10" />
                    <span className="relative z-10">Открыть письмо</span>
                    <div className="absolute top-0 left-0 w-full h-full bg-white/20 scale-x-0 origin-right transition-transform duration-400 ease-out-quart group-hover:scale-x-100 group-hover:origin-left" />
                </button>
            </div>

            <div
                ref={overlayRef}
                className={`fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-800 ease-out-expo ${isOpen ? '!opacity-100 !pointer-events-auto' : ''} p-4 md:p-8`}
                onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
                data-lenis-prevent
            >
                <div ref={letterRef} className="bg-[#f5f3ef] w-full max-w-2xl max-h-[85vh] flex flex-col rounded md:rounded-lg shadow-2xl translate-y-[100px] scale-90 opacity-0 relative overflow-hidden">

                    <button className="absolute top-4 right-4 text-text-light hover:text-primary transition-colors duration-300 z-10 p-2" onClick={handleClose}>
                        <X size={28} />
                    </button>

                    <div ref={letterContentRef} className="flex-1 overflow-y-auto p-8 md:p-12 font-display italic text-dark text-left scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
                        <span className="text-[clamp(1.6rem,2.5vw,2.2rem)] font-bold mb-6 block text-primary not-italic">Моей булочке,</span>

                        <p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed mb-6">
                            Я всю жизнь и после буду напоминать тебе какая ты невероятная.
                            Эти 14 причин не составляют и тысячной доли того, за что я тебя обожаю.
                        </p>
                        <p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed mb-6">
                            Каждый день рядом с тобой уже как праздник. Твоя улыбка греет мне сердце,
                            а твой смех всегда так меня успокаивает.
                        </p>
                        <p className="text-[clamp(1rem,1.5vw,1.25rem)] leading-relaxed mb-6">
                            Спасибо, что ты есть. Я люблю тебя, Пухнастя.
                        </p>

                        <span className="text-[clamp(1.2rem,2vw,1.8rem)] font-bold text-right block mt-8 text-primary not-italic">
                            Твой Катлет
                        </span>

                        <div className="flex justify-center gap-6 text-primary/60">
                            <Heart size={28} />
                            <Gem size={28} />
                            <Gift size={28} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
