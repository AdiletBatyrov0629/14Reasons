import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const HeartParticles = forwardRef((props, ref) => {
    const canvasRef = useRef(null);
    const heartsRef = useRef([]);
    const animationFrameRef = useRef(null);
    const isActiveRef = useRef(false);

    useImperativeHandle(ref, () => ({
        burst: () => {
            isActiveRef.current = true;
            createHearts();
            animate();
        },
        stop: () => {
            isActiveRef.current = false;
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            const ctx = canvasRef.current?.getContext('2d');
            if (ctx && canvasRef.current) {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        return () => {
            window.removeEventListener('resize', resize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    const createHearts = () => {
        const heartCount = window.innerWidth < 768 ? 60 : 100;
        heartsRef.current = [];

        for (let i = 0; i < heartCount; i++) {
            heartsRef.current.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2 + 100,
                size: Math.random() * 20 + 10,
                speedX: (Math.random() - 0.5) * 15,
                speedY: -Math.random() * 15 - 5,
                gravity: 0.1,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10,
                opacity: 1,
                color: `hsl(${340 + Math.random() * 20}, 100%, ${60 + Math.random() * 20}%)`
            });
        }
    };

    const drawHeart = (ctx, x, y, size, rotation, color, opacity) => {
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(x, y);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.fillStyle = color;

        ctx.beginPath();
        const topCurveHeight = size * 0.3;
        ctx.moveTo(0, topCurveHeight);

        ctx.bezierCurveTo(
            0, 0,
            -size / 2, 0,
            -size / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
            -size / 2, (size + topCurveHeight) / 2,
            0, size,
            0, size
        );
        ctx.bezierCurveTo(
            0, size,
            size / 2, (size + topCurveHeight) / 2,
            size / 2, topCurveHeight
        );
        ctx.bezierCurveTo(
            size / 2, 0,
            0, 0,
            0, topCurveHeight
        );

        ctx.fill();
        ctx.restore();
    };

    const animate = () => {
        if (!isActiveRef.current || !canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        let activeHearts = 0;

        heartsRef.current.forEach((heart) => {
            if (heart.opacity <= 0) return;
            activeHearts++;

            heart.x += heart.speedX;
            heart.y += heart.speedY;
            heart.speedY += heart.gravity;
            heart.rotation += heart.rotationSpeed;
            heart.opacity -= 0.005;

            drawHeart(
                ctx,
                heart.x,
                heart.y,
                heart.size,
                heart.rotation,
                heart.color,
                heart.opacity
            );
        });

        if (activeHearts > 0) {
            animationFrameRef.current = requestAnimationFrame(animate);
        } else {
            isActiveRef.current = false;
        }
    };

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999,
            }}
        />
    );
});

export default HeartParticles;
