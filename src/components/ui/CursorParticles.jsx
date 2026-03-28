import { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Advanced cursor particle system — canvas overlay with:
 * - Velocity-based particle sizing (faster mouse = bigger particles)
 * - Smooth glow trail with fading afterimage
 * - Connection lines between nearby particles
 * - Theme-colored with dynamic opacity
 * - Desktop only (skip on touch devices)
 */
export default function CursorParticles() {
    const canvasRef = useRef(null);
    const { theme } = useTheme();
    const themeRef = useRef(theme);
    themeRef.current = theme;

    useEffect(() => {
        // Skip on touch-only devices
        if (typeof window === 'undefined') return;
        if (window.matchMedia('(hover: none)').matches) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let particles = [];
        let animId;
        let mouseX = -200, mouseY = -200;
        let prevMouseX = -200, prevMouseY = -200;
        let velocity = 0;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener('resize', resize);

        const onMove = (e) => {
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Calculate velocity
            const dx = mouseX - prevMouseX;
            const dy = mouseY - prevMouseY;
            velocity = Math.min(Math.sqrt(dx * dx + dy * dy), 50);

            // Spawn particles based on velocity
            const spawnCount = velocity > 5 ? 2 : 1;
            for (let i = 0; i < spawnCount; i++) {
                const spread = 6 + velocity * 0.3;
                particles.push({
                    x: mouseX + (Math.random() - 0.5) * spread,
                    y: mouseY + (Math.random() - 0.5) * spread,
                    vx: (Math.random() - 0.5) * 1.2 + dx * 0.05,
                    vy: (Math.random() - 0.5) * 1.2 + dy * 0.05 - 0.2,
                    size: Math.random() * 1.5 + 1 + velocity * 0.04,
                    opacity: 0.8 + Math.random() * 0.2,
                    life: 1,
                    type: Math.random() > 0.85 ? 'ring' : 'dot', // 15% chance of ring particle
                });
            }

            // Cap particles
            while (particles.length > 40) particles.shift();
        };
        window.addEventListener('mousemove', onMove);

        const hexToRgb = (hex) => {
            const h = hex.replace('#', '');
            return {
                r: parseInt(h.substring(0, 2), 16) || 0,
                g: parseInt(h.substring(2, 4), 16) || 0,
                b: parseInt(h.substring(4, 6), 16) || 0,
            };
        };

        const loop = () => {
            // Slight fade for trail effect (instead of full clear)
            ctx.fillStyle = 'rgba(0,0,0,0)';
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const color = themeRef.current.primary || '#00F5FF';
            const rgb = hexToRgb(color);

            // Draw connection lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 60) {
                        const lineAlpha = (1 - dist / 60) * 0.15 * Math.min(particles[i].life, particles[j].life);
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${lineAlpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            // Draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.98; // friction
                p.vy *= 0.98;
                p.life -= 0.02;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                const alpha = p.life * p.opacity * 0.6;
                const currentSize = p.size * p.life;

                if (p.type === 'ring') {
                    // Ring particle — hollow circle
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize * 2, 0, Math.PI * 2);
                    ctx.strokeStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.5})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                } else {
                    // Dot particle with soft glow
                    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentSize * 2);
                    gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`);
                    gradient.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.4})`);
                    gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`);

                    ctx.beginPath();
                    ctx.arc(p.x, p.y, currentSize * 2, 0, Math.PI * 2);
                    ctx.fillStyle = gradient;
                    ctx.fill();
                }
            }

            // Cursor glow halo
            if (velocity > 2) {
                const glowAlpha = Math.min(velocity * 0.008, 0.12);
                const glowSize = 20 + velocity * 0.5;
                const glow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, glowSize);
                glow.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${glowAlpha})`);
                glow.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.beginPath();
                ctx.arc(mouseX, mouseY, glowSize, 0, Math.PI * 2);
                ctx.fillStyle = glow;
                ctx.fill();
            }

            velocity *= 0.95; // Decay velocity
            animId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMove);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 9999,
                pointerEvents: 'none',
            }}
        />
    );
}
