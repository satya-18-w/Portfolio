import React, { useRef, Suspense, useCallback, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import AvatarModel from '../three/AvatarModel';
import useTypewriter from '../../hooks/useTypewriter';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import FloatingParticles from '../three/FloatingParticles';
import { SkinButton, SkinTag } from '../ui/SkinRenderer';
import { TextReveal } from '../ui/TextReveal';
import { Marquee } from '../ui/Marquee';
import { MagneticButton } from '../ui/MagneticButton';
import FloatingTechIcons from '../three/FloatingTechIcons';
import ScrollGeometry from '../three/ScrollGeometry';
import WaterDropletBackground from '../three/WaterDropletBackground';
import { HoverMask } from '../ui/HoverMask';
import Container from '../layout/Container';
import SectionWrapper from '../layout/SectionWrapper';

// ── Animated stat counter ────────────────────────────────────────────
function StatCounter({ value, label, delay = 0 }) {
    const { theme } = useTheme();
    const [display, setDisplay] = useState('0');
    const [started, setStarted] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    useEffect(() => {
        if (!started) return;
        const match = value.match(/^([\d.]+)(.*)$/);
        if (!match) { setDisplay(value); return; }
        const [, numStr, suffix] = match;
        const target = parseFloat(numStr);
        const decimals = numStr.includes('.') ? (numStr.split('.')[1]?.length ?? 1) : 0;
        const steps = 40; let step = 0;
        const timer = setTimeout(() => {
            const iv = setInterval(() => {
                step++;
                const eased = 1 - Math.pow(1 - step / steps, 3);
                setDisplay((Math.min(target * eased, target)).toFixed(decimals) + suffix);
                if (step >= steps) clearInterval(iv);
            }, 1400 / steps);
            return () => clearInterval(iv);
        }, delay);
        return () => clearTimeout(timer);
    }, [started, value, delay]);
    return (
        <div ref={ref} className="flex flex-col px-2 py-1">
            <span className="text-3xl sm:text-4xl font-bold" style={{ color: theme.text, fontFamily: theme.fontHeading }}>{display}</span>
            <span className="text-[11px] sm:text-xs uppercase tracking-widest mt-2" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>{label}</span>
        </div>
    );
}

// ── 3D Scene ─────────────────────────────────────────────────────────
function AvatarScene({ mousePos, theme }) {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 5]} intensity={1.4} />
            <pointLight position={[-4, 3, 4]} intensity={0.8} color={theme.primary} distance={18} />
            <pointLight position={[4, -2, 3]} intensity={0.5} color={theme.secondary} distance={14} />
            <Suspense fallback={null}>
                <AvatarModel mousePos={mousePos} />
                <FloatingTechIcons radius={4.5} />
            </Suspense>
        </>
    );
}

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
// SKIN: CYBER — massive overlapping typography and blended avatar
// ─────────────────────────────────────────────────────────────────────
function CyberHero({ theme, role, mousePos }) {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 1000], [0, 100]);
    const yAvatar = useTransform(scrollY, [0, 1000], [0, 200]);

    return (
        <SectionWrapper id="hero" className="w-full min-h-[95vh] flex items-center pt-24 overflow-visible">
            {/* BACKGROUND MARQUEE */}
            <div className="absolute top-1/4 left-0 right-0 z-bg opacity-[0.04] pointer-events-none transform -rotate-3 overflow-hidden whitespace-nowrap">
                <Marquee text="CREATIVE DEVELOPER • AI ENGINEER • BACKEND ARCHITECT •" speed={30} className="text-[12rem] font-black" />
            </div>
            <div className="absolute bottom-1/4 left-0 right-0 z-bg opacity-[0.04] pointer-events-none transform rotate-2 overflow-hidden whitespace-nowrap">
                <Marquee direction="right" text="DISTRIBUTED SYSTEMS • REACT THREE FIBER •" speed={40} className="text-[10rem] font-black" />
            </div>

            {/* WATER DROPLET HERO BACKGROUND */}
            <WaterDropletBackground />

            <Container className="grid grid-cols-1 lg:grid-cols-2 lg:gap-0 items-center relative h-full">
                
                {/* LEFT: Text Content */}
                <motion.div style={{ y: yText }} className="flex flex-col items-start justify-center z-base w-full relative z-20">
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2 md:mb-5">
                        <TextReveal delay={0.1}>
                            <div className="px-3 py-1 md:px-5 md:py-1.5 rounded-full border-2 border-black -rotate-2 shadow-[4px_4px_0px_#000] bg-white">
                                <span className="font-mono text-xl md:text-2xl font-black uppercase text-black">The</span>
                            </div>
                        </TextReveal>
                        <TextReveal delay={0.2}>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-black" style={{ fontFamily: theme.fontHeading }}>
                                Unstoppable
                            </h1>
                        </TextReveal>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-2 md:mb-5">
                        <TextReveal delay={0.3}>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black uppercase text-black" style={{ fontFamily: theme.fontMono }}>
                                AI Engineer
                            </h1>
                        </TextReveal>
                        <TextReveal delay={0.4}>
                            <div className="px-3 py-1 md:px-5 md:py-1.5 rounded-full border-2 border-black rotate-3 shadow-[4px_4px_0px_#000] bg-white">
                                <span className="font-mono text-xl md:text-2xl font-black text-black">{'&'}</span>
                            </div>
                        </TextReveal>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-16">
                        <TextReveal delay={0.5}>
                            <div className="px-3 py-1 md:px-5 md:py-1.5 rounded-full border-2 border-black -rotate-1 shadow-[4px_4px_0px_#000] bg-white">
                                <span className="font-mono text-xl md:text-2xl font-black uppercase text-black">Backend</span>
                            </div>
                        </TextReveal>
                        <TextReveal delay={0.6}>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase text-black" style={{ fontFamily: theme.fontHeading }}>
                                Architect
                            </h1>
                        </TextReveal>
                    </div>

                    <TextReveal delay={0.7}>
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <MagneticButton intensity={0.2}>
                                <a href="#projects" className="inline-block bg-[#E0FBFC] px-6 py-3 md:px-8 md:py-4 font-bold text-black border-2 border-black rounded-full shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all uppercase tracking-wider text-center" style={{ fontFamily: theme.fontHeading }}>
                                    View Archive ↓
                                </a>
                            </MagneticButton>
                            <MagneticButton intensity={0.2}>
                                <a href="#skills" className="inline-block bg-white px-6 py-3 md:px-8 md:py-4 font-bold text-black border-2 border-black rounded-full shadow-[4px_4px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-y-[2px] hover:translate-x-[2px] transition-all uppercase tracking-wider text-center" style={{ fontFamily: theme.fontHeading }}>
                                    Skills Playground
                                </a>
                            </MagneticButton>
                        </div>
                    </TextReveal>
                </motion.div>

                {/* RIGHT: 3D Visual */}
                <motion.div style={{ y: yAvatar }} className="relative w-[120%] -ml-[10%] aspect-square md:h-[750px] flex items-center justify-center z-float scale-110 lg:scale-125 transition-transform duration-1000">
                    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
                        <AvatarScene mousePos={mousePos} theme={theme} />
                    </Canvas>
                </motion.div>
            </Container>
        </SectionWrapper>
    );
}

// ─────────────────────────────────────────────────────────────────────
// SKIN: MINIMAL — Stitch orange/light editorial layout
// ─────────────────────────────────────────────────────────────────────
function MinimalHero({ theme, role, mousePos }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

    // Multi-layer parallax for depth
    const yText = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yAvatar = useTransform(scrollYProgress, [0, 1], [0, -180]);
    const avatarScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.08]);
    const avatarRotate = useTransform(scrollYProgress, [0, 1], [0, -3]);
    const geometryY = useTransform(scrollYProgress, [0, 1], [0, -60]);

    return (
        <div ref={containerRef} className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 w-full min-h-[95vh] flex items-center pt-24 pb-16">

            {/* 3D Scroll-Reactive Floating Geometry */}
            <motion.div style={{ y: geometryY }} className="absolute inset-0 z-[1] pointer-events-none">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]} style={{ pointerEvents: 'none' }}>
                    <ScrollGeometry scrollProgress={scrollYProgress} primaryColor={theme.primary} secondaryColor={theme.secondary} />
                </Canvas>
            </motion.div>

            {/* Main Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full relative z-10">

                {/* LEFT: Text Content (7 cols) */}
                <div className="lg:col-span-7 flex flex-col">

                    {/* Availability Badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-8 inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.25em] w-max"
                        style={{ background: `${theme.primary}15`, border: `1px solid ${theme.primary}40`, color: theme.primary }}>
                        <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.primary }} />
                        Available for new architecture
                    </motion.div>

                    {/* Name - Staggered reveal */}
                    <motion.div style={{ y: yText }}>
                        <TextReveal delay={0.15}>
                            <h1 className="font-black leading-[0.85] tracking-tighter uppercase"
                                style={{ fontSize: 'clamp(2.5rem, 11vw, 11rem)', fontFamily: theme.fontHeading, color: theme.text }}>
                                Satyajit
                            </h1>
                        </TextReveal>
                        <TextReveal delay={0.25}>
                            <h1 className="font-black leading-[0.85] tracking-tighter uppercase"
                                style={{ fontSize: 'clamp(2.5rem, 11vw, 11rem)', fontFamily: theme.fontHeading, color: theme.primary }}>
                                Samal
                            </h1>
                        </TextReveal>
                    </motion.div>

                    {/* Role + Description */}
                    <div className="mt-10 flex flex-col gap-3 max-w-md">
                        <TextReveal delay={0.35}>
                            <h2 className="text-lg sm:text-xl font-bold uppercase tracking-[0.15em] italic"
                                style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>
                                {role}
                            </h2>
                        </TextReveal>
                        <TextReveal delay={0.4}>
                            <p className="text-sm leading-relaxed" style={{ color: theme.text, opacity: 0.8 }}>
                                Architecting the intelligence of tomorrow. I build high-performance distributed systems and LLM-powered applications that scale beyond limits.
                            </p>
                        </TextReveal>
                    </div>

                    {/* CTAs */}
                    <TextReveal delay={0.5}>
                        <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full">
                            <MagneticButton intensity={0.25}>
                                <a href="#projects" className="group inline-flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-5 text-[11px] sm:text-sm font-black tracking-widest uppercase rounded-full transition-all duration-500 hover:shadow-lg hover:scale-[1.03] w-full sm:w-auto"
                                    style={{ background: theme.primary, color: '#000' }}>
                                    View Projects
                                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </a>
                            </MagneticButton>
                            <MagneticButton intensity={0.15}>
                                <a href="#skills" className="flex items-center justify-center px-6 py-4 md:px-10 md:py-5 text-[11px] sm:text-sm font-black tracking-widest uppercase rounded-full border-2 transition-all duration-500 hover:scale-[1.03] backdrop-blur-sm w-full sm:w-auto"
                                    style={{ borderColor: theme.text, color: theme.text, background: 'rgba(255,255,255,0.4)' }}>
                                    Explore Skills
                                </a>
                            </MagneticButton>
                        </div>
                    </TextReveal>

                    {/* Stats - proper grid */}
                    <TextReveal delay={0.6}>
                        <div className="grid grid-cols-3 gap-8 sm:gap-12 mt-16 pt-10 border-t-2" style={{ borderColor: `${theme.primary}25` }}>
                            <StatCounter value="15+" label="Projects Built" delay={200} />
                            <StatCounter value="5+" label="AI Models Deployed" delay={400} />
                            <StatCounter value="99.9%" label="System Uptime" delay={600} />
                        </div>
                    </TextReveal>
                </div>

                {/* RIGHT: Avatar (5 cols) */}
                <motion.div
                    style={{ y: yAvatar, scale: avatarScale, rotate: avatarRotate }}
                    className="lg:col-span-5 relative flex items-center justify-center"
                >
                    <motion.div
                        initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
                        animate={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
                        transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-lg mx-auto"
                    >
                        <motion.img
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
                            src="/images/avatar.png"
                            alt="Satyajit Samal"
                            className="w-full h-auto object-cover relative z-10"
                            style={{
                                filter: 'contrast(1.08) saturate(1.15)',
                                WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 35%, transparent 72%)',
                                maskImage: 'radial-gradient(ellipse at 50% 40%, black 35%, transparent 72%)',
                            }}
                        />
                        {/* Decorative accent ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-10%] rounded-full border-2 border-dashed opacity-15 z-0"
                            style={{ borderColor: theme.primary }}
                        />
                        {/* Secondary accent ring */}
                        <motion.div
                            animate={{ rotate: -360 }}
                            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[-5%] rounded-full border opacity-10 z-0"
                            style={{ borderColor: theme.secondary }}
                        />
                        {/* Glow behind avatar */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full blur-[80px] opacity-20 z-0"
                            style={{ background: theme.primary }} />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// SKIN: TERMINAL — command-line glitch aesthetic
// ─────────────────────────────────────────────────────────────────────
function TerminalHero({ theme, role, mousePos }) {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 1000], [0, 150]);
    const yAvatar = useTransform(scrollY, [0, 1000], [0, 350]);

    const [cmdLine, setCmdLine] = useState('');
    const intro = '> satyajit_samal.exe --role architect --system online';
    useEffect(() => {
        let i = 0;
        const iv = setInterval(() => { if (i <= intro.length) { setCmdLine(intro.slice(0, i)); i++; } else clearInterval(iv); }, 35);
        return () => clearInterval(iv);
    }, []);

    return (
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 flex flex-col justify-center min-h-[95vh] w-full pt-20">
            {/* BACKGROUND ASCII/BLENDED AVATAR */}
            <motion.div style={{ y: yAvatar }} className="absolute right-0 lg:-right-10 top-1/2 -translate-y-1/2 w-[150vw] sm:w-[80vw] lg:w-[65vw] h-screen pointer-events-none z-0 overflow-hidden mix-blend-color-dodge opacity-20">
                <motion.img
                    animate={{ y: [0, -20, 0], scale: [1, 1.02, 1] }}
                    transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
                    src="/images/avatar.png"
                    alt="Satyajit Samal"
                    className="w-full h-full object-cover lg:object-contain object-center lg:object-right"
                    style={{
                        WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 25%, transparent 70%)',
                        maskImage: 'radial-gradient(ellipse at 50% 40%, black 25%, transparent 70%)',
                        filter: `sepia(100%) hue-rotate(80deg) saturate(400%) contrast(1.5) brightness(0.8)` // Hacker green tint
                    }}
                />
            </motion.div>

            {/* MASSIVE TYPOGRAPHY BUT TERMINAL FLAVORED */}
            <motion.div style={{ y: yText }} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 flex flex-col text-left">

                <TextReveal delay={0.1}>
                    <h1 className="font-bold leading-[0.85] tracking-tight uppercase mb-2 break-all sm:break-normal"
                        style={{ fontSize: 'clamp(2.5rem, 12vw, 11rem)', fontFamily: theme.fontMono, color: theme.text }}>
                        {"{"}SATYAJIT
                    </h1>
                </TextReveal>
                <TextReveal delay={0.2}>
                    <h1 className="font-bold leading-[0.85] tracking-tight uppercase mb-12 break-all sm:break-normal"
                        style={{ fontSize: 'clamp(2.5rem, 12vw, 11rem)', fontFamily: theme.fontMono, color: theme.primary }}>
                        SAMAL{"}"}
                    </h1>
                </TextReveal>

                {/* THE TERMINAL ITSELF */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                    className="w-full max-w-3xl mt-4"
                    style={{ border: `1px solid ${theme.primary}40`, borderRadius: '8px', overflow: 'hidden' }}>
                    {/* Title bar */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.6)', borderColor: `${theme.primary}30` }}>
                        <div className="flex gap-1.5">
                            {['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} className="w-3 h-3 rounded-full" style={{ background: c }} />)}
                        </div>
                        <span className="text-xs" style={{ color: theme.primary, fontFamily: theme.fontMono }}>SS_CORE_SYSTEMS — bash — 120×35</span>
                    </div>
                    {/* Terminal body */}
                    <div className="p-6 min-h-[250px] backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.85)', fontFamily: theme.fontMono }}>
                        <p style={{ color: theme.primary }}>{cmdLine}<span className="cursor-blink">█</span></p>
                        <p className="mt-3" style={{ color: theme.textMuted }}>[INFO] Initializing SS_CORE_SYSTEMS v2.0...</p>
                        <p className="mt-1" style={{ color: theme.primary }}>{'>'} Role: <span style={{ color: '#fff' }}>{role || 'AI Engineer'}</span></p>
                        <p className="mt-4" style={{ color: theme.textMuted }}>/* Projects built: 15+ | AI models: 5+ | Uptime: 99.9% */</p>
                        <div className="flex gap-4 mt-8 flex-wrap">
                            <MagneticButton intensity={0.2}>
                                <a href="#projects" className="px-5 py-3 text-xs font-black uppercase tracking-widest transition-all hover:translate-x-1"
                                    style={{ background: theme.primary, color: '#000', fontFamily: theme.fontMono }}>
                                    {'> '} VIEW_PROJECTS.sh
                                </a>
                            </MagneticButton>
                            <MagneticButton intensity={0.15}>
                                <a href="#contact" className="px-5 py-3 text-xs font-black uppercase tracking-widest border transition-all hover:bg-white/5"
                                    style={{ borderColor: theme.primary, color: theme.primary, fontFamily: theme.fontMono }}>
                                    {'> '} INIT_CONTACT.sh
                                </a>
                            </MagneticButton>
                        </div>
                    </div>
                </motion.div>

                {/* Matrix rain hint */}
                <p className="mt-12 text-xs" style={{ color: `${theme.primary}50`, fontFamily: theme.fontMono }}>
                    // Scroll to explore · MATRIX_RENDER=ON
                </p>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// SKIN: BASEMENT — inspired by basement.studio (heavy grid, big type, marquee)
// ─────────────────────────────────────────────────────────────────────
function BasementHero({ theme, role, mousePos }) {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 1000], [0, 150]);
    const yAvatar = useTransform(scrollY, [0, 1000], [0, 420]);

    return (
        <div className="w-full flex justify-center items-center min-h-screen pt-16 relative">
            {/* Full-width structural grid frame */}
            <div className="absolute inset-0 z-0 pointer-events-none border-x border-b" style={{ borderColor: theme.surfaceBorder, margin: '0 2rem' }}>
                <div className="absolute top-1/4 left-0 w-full h-px" style={{ background: theme.surfaceBorder }} />
                <div className="absolute bottom-1/4 left-0 w-full h-px" style={{ background: theme.surfaceBorder }} />
                <div className="absolute top-0 left-1/3 w-px h-full" style={{ background: theme.surfaceBorder }} />
            </div>

            {/* MARQUEE TOP */}
            <div className="absolute top-[80px] left-0 w-full z-10 border-y py-3 bg-black flex overflow-hidden" style={{ borderColor: theme.surfaceBorder }}>
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

            <div className="max-w-7xl w-full mx-auto px-6 lg:px-12 relative z-10 flex flex-col justify-center min-h-[90vh]">

                {/* BACKGROUND AVATAR */}
                <motion.div style={{ y: yAvatar }} className="absolute right-0 top-[20%] w-[120vw] sm:w-[90vw] lg:w-[60vw] h-screen pointer-events-none z-0 overflow-hidden mix-blend-luminosity opacity-[0.35]">
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
                <motion.div style={{ y: yText }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
                    className="relative z-10 flex flex-col mt-20">

                    <div className="w-max px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6 border"
                        style={{ borderColor: theme.surfaceBorder, color: theme.textMuted, fontFamily: theme.fontMono }}>
                        Available / 2024
                    </div>

                    <h1 className="font-black tracking-tighter leading-[0.8] mb-1 uppercase"
                        style={{ fontSize: 'clamp(3rem, 15vw, 15rem)', fontFamily: theme.fontHeading, color: theme.text }}>
                        SATYAJIT
                    </h1>
                    <h1 className="font-black tracking-tighter leading-[0.8] mb-10 uppercase"
                        style={{ fontSize: 'clamp(3rem, 15vw, 15rem)', fontFamily: theme.fontHeading, color: theme.text }}>
                        SAMAL
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t pt-10" style={{ borderColor: theme.surfaceBorder }}>
                        <div>
                            <p className="text-3xl font-black uppercase mb-3 leading-none" style={{ color: theme.primary, fontFamily: theme.fontHeading }}>
                                {role || 'AI Engineer'}
                            </p>
                            <p className="text-base font-medium leading-relaxed max-w-sm" style={{ color: theme.textMuted, fontFamily: theme.fontBody }}>
                                Engineering distributed systems and LLM-powered applications. Raw performance, robust architecture.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4 h-max self-end md:justify-end border-l pl-0 md:pl-10" style={{ borderColor: theme.surfaceBorder }}>
                            <MagneticButton intensity={0.3}>
                                <a href="#projects" className="flex items-center justify-center px-6 py-4 md:px-10 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all hover:invert w-full sm:w-auto"
                                    style={{ background: theme.primary, color: '#000', fontFamily: theme.fontMono }}>
                                    View Work
                                </a>
                            </MagneticButton>
                            <MagneticButton intensity={0.15}>
                                <a href="#contact" className="flex items-center justify-center px-6 py-4 md:px-10 md:py-5 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] border transition-all hover:bg-white hover:text-black w-full sm:w-auto"
                                    style={{ borderColor: theme.text, color: theme.text, fontFamily: theme.fontMono }}>
                                    Contact
                                </a>
                            </MagneticButton>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* MARQUEE BOTTOM */}
            <div className="absolute bottom-0 left-0 w-full z-10 border-y py-3 bg-black flex overflow-hidden" style={{ borderColor: theme.surfaceBorder }}>
                <div className="flex w-full overflow-hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.text, opacity: 0.5, fontFamily: theme.fontMono }}>
                    <motion.div
                        className="flex min-w-full shrink-0"
                        animate={{ x: ['-100%', '0%'] }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    >
                        {Array(8).fill("SCROLL TO EXPLORE · NO EXCESS · PURE LOGIC · ").map((txt, i) => <span key={i} className="pl-4">{txt}</span>)}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────
// Root hero — picks the right skin layout
// ─────────────────────────────────────────────────────────────────────
export default function HeroSection() {
    const { theme, themeKey } = useTheme();
    const mousePos = useRef({ x: 0, y: 0 });
    const roles = ['AI Engineer', 'Backend Developer', 'Distributed Systems Engineer'];
    const role = useTypewriter(roles, 80, 40, 2500);
    const handleMouseMove = useCallback(e => {
        mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, []);

    // Background per skin
    const bgStyle = {
        background: theme.bg,
        color: theme.text,
        transition: 'background 0.6s ease, color 0.4s ease',
    };

    return (
        <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden snap-section"
            style={bgStyle} onMouseMove={handleMouseMove}>
            <ScrollProgress />

            {/* Skin-specific background decoration */}
            {themeKey === 'cyber' && (
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-25" style={{ background: theme.primary }} />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[130px] opacity-20" style={{ background: theme.secondary }} />
                </div>
            )}
            {themeKey === 'terminal' && (
                <div className="absolute inset-0 z-0 pointer-events-none"
                    style={{ backgroundImage: `repeating-linear-gradient(0deg, rgba(0,255,65,0.04) 0, rgba(0,255,65,0.04) 1px, transparent 1px, transparent 5px)` }} />
            )}
            {themeKey === 'minimal' && (
                <div className="absolute inset-0 z-0 pointer-events-none opacity-40"
                    style={{
                        backgroundImage: `linear-gradient(${theme.primary}10 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}10 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }} />
            )}
            {/* Basement theme background relies on the grid lines inside the component */}

            {/* Skin layout */}
            {themeKey === 'cyber' && <CyberHero theme={theme} role={role} mousePos={mousePos} />}
            {themeKey === 'minimal' && <MinimalHero theme={theme} role={role} mousePos={mousePos} />}
            {themeKey === 'terminal' && <TerminalHero theme={theme} role={role} mousePos={mousePos} />}
            {themeKey === 'brutalist' && <BasementHero theme={theme} role={role} mousePos={mousePos} />}

            {/* Scroll arrow (only on cyber/minimal) */}
            {(themeKey === 'cyber' || themeKey === 'minimal') && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-px h-8" style={{ background: `linear-gradient(to bottom, ${theme.primary}, transparent)` }} />
                </motion.div>
            )}
        </section>
    );
}
