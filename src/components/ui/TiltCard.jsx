import React, { useRef, useEffect } from 'react';

/**
 * TiltCard — 3D CSS perspective tilt that follows the mouse.
 * Wraps any children in a tiltable container.
 * Usage: <TiltCard className="...">...</TiltCard>
 */
export default function TiltCard({ children, className = '', style = {}, intensity = 12 }) {
    const cardRef = useRef(null);
    const raf = useRef(null);
    const current = useRef({ rotX: 0, rotY: 0, glowX: 50, glowY: 50 });

    useEffect(() => {
        const card = cardRef.current;
        if (!card) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const halfW = rect.width / 2;
            const halfH = rect.height / 2;
            const rotX = ((y - halfH) / halfH) * -intensity;
            const rotY = ((x - halfW) / halfW) * intensity;
            const glowX = (x / rect.width) * 100;
            const glowY = (y / rect.height) * 100;
            current.current = { rotX, rotY, glowX, glowY };
        };

        const handleMouseLeave = () => {
            current.current = { rotX: 0, rotY: 0, glowX: 50, glowY: 50 };
        };

        const animate = () => {
            const { rotX, rotY, glowX, glowY } = current.current;
            if (card) {
                card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.setProperty('--glow-x', `${glowX}%`);
                card.style.setProperty('--glow-y', `${glowY}%`);
            }
            raf.current = requestAnimationFrame(animate);
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        raf.current = requestAnimationFrame(animate);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(raf.current);
        };
    }, [intensity]);

    return (
        <div
            ref={cardRef}
            className={className}
            style={{
                ...style,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                transition: 'transform 0.1s ease-out',
                position: 'relative',
                // Radial glow that follows the cursor inside the card
                backgroundImage: `radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,255,255,0.04) 0%, transparent 70%), ${style.backgroundImage ?? 'none'}`,
            }}
        >
            {children}
        </div>
    );
}
