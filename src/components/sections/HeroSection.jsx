import React, { useRef, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import useTypewriter from '../../hooks/useTypewriter';

// ── Scroll Progress Bar ───────────────────────────────────────────────
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    useMotionValueEvent(scrollYProgress, 'change', v => {
        const el = document.getElementById('scroll-progress');
        if (el) el.style.width = `${v * 100}%`;
    });
    return <div id="scroll-progress" className="fixed top-0 left-0 h-[2px] z-50 transition-all origin-left" style={{ background: 'currentColor' }} />;
}

// ─────────────────────────────────────────────────────────────────────
// SKIN: BASEMENT — inspired by basement.studio (heavy grid, big type, marquee)
// ─────────────────────────────────────────────────────────────────────
function BasementHero({ theme, role, mousePos }) {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 1000], [0, 90]);
    const yAvatar = useTransform(scrollY, [0, 1000], [0, 240]);
    return (
        <div className="w-full flex justify-center items-center min-h-screen pt-16 relative">
            {/* Full-width structural grid frame */}
            <div className="absolute inset-0 z-0 pointer-events-none border-x border-b" style={{ borderColor: theme.surfaceBorder, margin: '0 2rem' }}>
                <div className="absolute top-1/4 left-0 w-full h-px" style={{ background: theme.surfaceBorder }} />
                <div className="hidden md:block absolute top-0 left-1/3 w-px h-full" style={{ background: theme.surfaceBorder }} />
            </div>

            {/* MARQUEE TOP */}
            <div className="hidden md:flex absolute top-[80px] left-0 w-full z-10 border-y py-3 bg-black overflow-hidden" style={{ borderColor: theme.surfaceBorder }}>
                <div className="flex w-full overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.primary, fontFamily: theme.fontMono }}>
                    <motion.div
                        className="flex min-w-full shrink-0"
                        animate={{ x: ['0%', '-100%'] }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    >
                        {Array(8).fill("SYSTEM ARCHITECT · SCALABLE INFRASTRUCTURE · LLM DEPLOYMENT · FULL STACK · ").map((txt, i) => <span key={i} className="pl-4">{txt}</span>)}
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 relative z-10 flex flex-col justify-center min-h-[88vh] md:min-h-[90vh]">

                {/* Soft text backing for mobile readability over portrait image */}
                <div className="absolute inset-y-0 left-0 w-full md:w-[72%] pointer-events-none"
                    style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.75), rgba(0,0,0,0.38), rgba(0,0,0,0))' }} />

                {/* BACKGROUND AVATAR */}
                <motion.div style={{ y: yAvatar }} className="absolute right-0 top-[18%] sm:top-[16%] w-[130vw] sm:w-[90vw] lg:w-[56vw] h-screen pointer-events-none z-0 overflow-hidden mix-blend-luminosity opacity-[0.12] sm:opacity-[0.16] md:opacity-[0.25]">
                    <motion.img
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                        src="/images/avatar.png"
                        alt="Satyajit Samal"
                        className="w-full h-full object-cover lg:object-contain object-bottom"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to top, transparent, black 90%)',
                            maskImage: 'linear-gradient(to top, transparent, black 90%)',
                            filter: 'grayscale(100%) contrast(1.5) brightness(0.8)'
                        }}
                    />
                </motion.div>

                {/* FOREGROUND CONTENT */}
                <motion.div style={{ y: yText }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
                    className="relative z-10 flex flex-col mt-14 md:mt-20 max-w-4xl pr-1 sm:pr-0">

                    <div className="w-max px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6 border"
                        style={{ borderColor: theme.surfaceBorder, color: theme.textMuted, fontFamily: theme.fontMono }}>
                        Available for internships • 2026
                    </div>

                    <h1 className="font-black tracking-tighter leading-[0.92] mb-5 md:mb-8 uppercase max-w-4xl"
                        style={{ fontSize: 'clamp(1.9rem, 9vw, 6.8rem)', fontFamily: theme.fontHeading, color: theme.text }}>
                        <span className="block">BUILDING SCALABLE SYSTEMS</span>
                        <span className="block" style={{ color: theme.primary }}>& AI APPLICATIONS</span>
                    </h1>

                    <div className="border-t pt-6 md:pt-8" style={{ borderColor: theme.surfaceBorder }}>
                        <p className="text-[15px] md:text-lg font-medium leading-relaxed max-w-2xl" style={{ color: theme.textMuted, fontFamily: theme.fontBody }}>
                            I engineer distributed systems, real-time architectures, and ML-powered platforms with a focus on performance, reliability, and scalability. From low-level networking to production-grade ML systems, I build software that actually works at scale.
                        </p>

                        <div className="mt-5 md:mt-6 inline-flex items-center px-3.5 py-2 border rounded-full"
                            style={{ borderColor: `${theme.primary}55`, color: theme.primary }}>
                            <p className="text-[9px] md:text-xs uppercase tracking-[0.18em] font-bold" style={{ fontFamily: theme.fontMono }}>
                                {role || 'Distributed Systems Engineer'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>
    );
}

export default function HeroSection() {
    const { theme } = useTheme();
    const mousePos = useRef({ x: 0, y: 0 });
    const roles = ['AI Engineer', 'Backend Developer', 'Distributed Systems Engineer'];
    const role = useTypewriter(roles, 80, 40, 2500);
    const handleMouseMove = useCallback(e => {
        mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, []);

    return (
        <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden snap-section"
            style={{ background: theme.bg, color: theme.text }} onMouseMove={handleMouseMove}>
            <ScrollProgress />
            <BasementHero theme={theme} role={role} mousePos={mousePos} />
        </section>
    );
}
