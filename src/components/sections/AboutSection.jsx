import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import SectionWrapper from '../layout/SectionWrapper';
import { TextReveal } from '../ui/TextReveal';

// ── Minimalist Animated counter ──────────────────────────────────────
function StatNumber({ value, label, delay = 0 }) {
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
                setDisplay(Math.min(target * eased, target).toFixed(decimals) + suffix);
                if (step >= steps) clearInterval(iv);
            }, 1200 / steps);
        }, delay);
        return () => clearTimeout(timer);
    }, [started, value, delay]);

    return (
        <div ref={ref} className="flex flex-col relative pl-4 border-l-2 py-1" style={{ borderColor: `${theme.primary}40` }}>
            <span className="text-4xl md:text-5xl font-black tracking-tighter" style={{ color: theme.text, fontFamily: theme.fontHeading }}>
                {display}
            </span>
            <span className="text-xs md:text-sm uppercase tracking-widest mt-1 font-bold" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>
                {label}
            </span>
        </div>
    );
}

// ── CoderGyan Inspired 2-Column Layout ───────────────────────────────
export default function AboutSection() {
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    
    // Parallax for the portrait
    const avatarY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const s = { font: "'JetBrains Mono', monospace", accent: 'border border-[#FF4D00] text-[#FF4D00] px-2 py-1 text-[10px] uppercase tracking-widest' };

    return (
        <SectionWrapper id="about" ref={containerRef} className="w-full flex items-center justify-center relative overflow-hidden min-h-[90vh]">
            
            {/* Ambient Background geometry like CoderGyan */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
                <div className="w-[800px] h-[800px] rounded-full border border-dashed animate-[spin_120s_linear_infinite]" style={{ borderColor: theme.textMuted }} />
                <div className="absolute w-[600px] h-[600px] rounded-full border border-solid animate-[spin_90s_linear_infinite_reverse]" style={{ borderColor: theme.surfaceBorder }} />
            </div>

            <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                    
                    {/* ── LEFT COLUMN: Text Content (7 cols) ── */}
                    <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 pt-8 lg:pt-0">
                        
                        {/* Subtitle */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} 
                            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.6 }}
                            className="mb-8"
                        >
                            <span className={s.accent} style={{ fontFamily: s.font, fontSize: '12px' }}>
                                Introducing your engineer
                            </span>
                        </motion.div>

                        {/* Huge Typography */}
                        <div className="mb-10 flex flex-col gap-2">
                            <TextReveal delay={0.1}>
                                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.9] uppercase" 
                                    style={{ color: theme.text, fontFamily: theme.fontHeading }}>
                                    Meet
                                </h2>
                            </TextReveal>
                            <TextReveal delay={0.2}>
                                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-tighter leading-[0.9] uppercase" 
                                    style={{ color: theme.primary, fontFamily: theme.fontHeading }}>
                                    Satyajit Samal
                                </h2>
                            </TextReveal>
                            <TextReveal delay={0.3}>
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight mt-4" 
                                    style={{ color: theme.textMuted, fontFamily: theme.fontHeading }}>
                                    and the systems behind the scale.
                                </h3>
                            </TextReveal>
                        </div>

                        {/* Bio / Description */}
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}
                            className="max-w-xl text-lg md:text-xl leading-relaxed mb-16"
                            style={{ color: theme.textMuted, fontFamily: theme.fontBody }}
                        >
                            I started my engineering journey focusing on backend architectures and distributed systems. Over time, I've evolved to build LLM-powered applications and production-grade architectures. Today, I combine deep expertise in Go, Python, and cloud-native tools to craft systems that are fast, reliable, and massively scalable.
                        </motion.div>

                        {/* Stats - Horizontal Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <StatNumber value="15+" label="Projects" delay={300} />
                            <StatNumber value="5+" label="AI Models" delay={450} />
                            <StatNumber value="99.9%" label="Uptime" delay={600} />
                            <StatNumber value="8+" label="Tools" delay={750} />
                        </div>
                    </div>

                    {/* ── RIGHT COLUMN: Portrait (5 cols) ── */}
                    <div className="lg:col-span-5 relative order-1 lg:order-2 flex justify-center lg:justify-end">
                        
                        {/* Huge background glow attached to scroll */}
                        <motion.div 
                            style={{ y: glowY }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full blur-[100px] opacity-20 z-0 pointer-events-none"
                            background={theme.primary}
                        />

                        {/* Portrait Frame */}
                        <motion.div 
                            style={{ y: avatarY }}
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }} 
                            whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} 
                            viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="relative z-10 w-[85%] max-w-[450px]"
                        >
                            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden" 
                                 style={{ border: `2px solid ${theme.text}`, background: 'transparent' }}>
                                
                                {/* Inner gradient overlay */}
                                <div className="absolute inset-0 z-20 pointer-events-none" 
                                     style={{ background: `linear-gradient(to top, ${theme.bg} 0%, transparent 40%)` }} />

                                <img
                                    src="/images/avatar.png"
                                    alt="Satyajit Samal"
                                    className="w-full h-full object-cover relative z-10 object-top"
                                    style={{ filter: 'grayscale(100%) contrast(1.2)' }}
                                />
                            </div>

                            {/* Floating decorative badge */}
                            <motion.div 
                                animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                                className="absolute -bottom-6 -left-6 z-30 px-6 py-4 rounded-2xl backdrop-blur-xl border"
                                style={{ background: 'rgba(0,0,0,0.6)', borderColor: `${theme.primary}50`, color: theme.text }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-3 w-3">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: theme.primary }}></span>
                                      <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: theme.primary }}></span>
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-widest font-mono">Systems Ready</span>
                                </div>
                            </motion.div>

                        </motion.div>
                    </div>

                </div>
            </div>
        </SectionWrapper>
    );
}
