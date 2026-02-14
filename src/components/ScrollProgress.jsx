import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function ScrollProgress() {
    const barRef = useRef(null);

    useEffect(() => {
        gsap.to(barRef.current, {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 0.1,
            }
        });
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-[9999] pointer-events-none">
            <div
                ref={barRef}
                className="w-full h-full bg-primary origin-left scale-x-0"
            />
        </div>
    );
}
