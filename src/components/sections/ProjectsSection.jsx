import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Magnetic from '../ui/Magnetic';
import { useTheme } from '../../context/ThemeContext';
import { TextReveal } from '../ui/TextReveal';
import TiltCard from '../ui/TiltCard';

const PROJECTS = [
    {
        id: '01', category: 'AI · RAG SYSTEM', title: 'FloatChat',
        description: 'Production-grade RAG system for exploring ARGO oceanographic data. Microservice architecture, Docker + Kubernetes, sub-50ms retrieval.',
        tech: ['Go', 'Python', 'LangChain', 'AWS', 'Kafka'],
        live: '#', github: '#',
        image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=900&q=80',
        color: '#00F5FF',
    },
    {
        id: '02', category: 'BACKEND · DISTRIBUTED', title: 'Astra Platform',
        description: 'Full-stack AI platform: real-time chat, semantic search, autonomous agent orchestration. Sub-10ms latency at scale across 3 regions.',
        tech: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Docker'],
        live: '#', github: '#',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
        color: '#8B5CF6',
    },
    {
        id: '03', category: 'MOBILE · FULL STACK', title: 'Ride Share Engine',
        description: 'Real-time ride dispatch with OSRM routing proxy, driver geolocation streaming, and live ETA predictions built on Android.',
        tech: ['Go', 'WebSocket', 'OSRM', 'Android', 'PostgreSQL'],
        live: '#', github: '#',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80',
        color: '#F59E0B',
    },
    {
        id: '04', category: 'ML · MLOPS', title: 'Uber Demand Prediction',
        slug: 'uber-demand-prediction',
        description: 'ML pipeline predicting Uber ride demand using NYC taxi data. Spatial & temporal pattern analysis with MLflow tracking and DVC-managed reproducible workflows.',
        tech: ['Python', 'Scikit-learn', 'MLflow', 'DVC', 'Docker'],
        live: '#', github: 'https://github.com/satya-18',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80',
        color: '#F59E0B',
    },
];

// ── TOYFIGHT BRUTALIST POP: Overlapping layout, hard shadows ─────────────
function CyberProjects({ theme }) {
    return (
        <section id="projects" className="py-32 overflow-hidden" style={{ background: theme.bg, color: theme.text }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="flex flex-col mb-32 z-10 relative">
                    <span className="inline-block px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest border-2 border-black w-max shadow-[4px_4px_0px_#000] mb-8 bg-[#E0FBFC]"
                        style={{ color: '#000', fontFamily: theme.fontMono }}>
                        Portfolio 2024
                    </span>
                    <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-black tracking-tighter uppercase leading-[0.8]"
                        style={{ fontFamily: theme.fontHeading }}>
                        Selected<br />
                        <span className="inline-block mt-4 px-6 md:px-8 py-2 border-4 border-black rounded-full shadow-[8px_8px_0px_#000] bg-[#E2D1F9]">
                            Works
                        </span>
                    </h2>
                </motion.div>

                <div className="space-y-40">
                    {PROJECTS.map((p, i) => (
                        <motion.div key={p.id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }}>
                            <div className="group relative rounded-[2.5rem] p-6 lg:p-12 transition-transform duration-500 hover:-translate-y-2"
                                style={{
                                    background: theme.surface,
                                    border: '3px solid #000',
                                    boxShadow: '12px 12px 0px rgba(0,0,0,1)'
                                }}>

                                <div className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20 relative z-10`}>
                                    {/* Image Block */}
                                    <div data-cursor="hover" data-cursor-text="VIEW" className="w-full lg:w-1/2 relative overflow-hidden rounded-4xl border-4 border-black shadow-[8px_8px_0px_#000] bg-white group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-500">
                                        <div className="w-full aspect-4/3 pointer-events-none">
                                            <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                                        </div>
                                        {/* Number Badge */}
                                        <div className="absolute -top-4 -left-4 text-3xl font-black font-mono w-24 h-24 rounded-full flex items-center justify-center border-4 border-black text-black z-20 shadow-[4px_4px_0px_#000]"
                                            style={{ background: i % 2 === 0 ? '#FAEDCD' : '#FEFAE0' }}>
                                            {p.id}
                                        </div>
                                    </div>

                                    {/* Text Content */}
                                    <div className="w-full lg:w-1/2 flex flex-col gap-16 relative">
                                        <div className="flex items-center gap-4">
                                            <span className="px-5 py-2 rounded-full border-4 border-black font-mono text-sm font-black uppercase shadow-[4px_4px_0px_#000] bg-[#E0FBFC]" style={{ color: '#000' }}>
                                                {p.category}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-6">
                                            <h3 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase leading-none tracking-tighter" style={{ color: '#000', fontFamily: theme.fontHeading }}>{p.title}</h3>
                                            <p className="text-gray-800 text-xl md:text-2xl font-bold leading-relaxed font-body max-w-xl">{p.description}</p>
                                        </div>

                                        <div className="flex flex-wrap gap-4 md:gap-8 py-10 border-y-4 border-black/10 mt-4">
                                            {p.tech.map(t => (
                                                <span key={t} className="px-6 py-3 md:px-8 md:py-4 text-sm md:text-xl font-black font-mono leading-none rounded-full border-4 border-black shadow-[6px_6px_0px_#000] bg-white hover:translate-y-[-4px] transition-transform inline-block mb-2"
                                                    style={{ color: '#000' }}>{t}</span>
                                            ))}
                                        </div>

                                        <div className="flex flex-wrap gap-8 pt-10 mt-4">
                                            {p.slug ? (
                                                <Magnetic intensity={0.2}>
                                                    <Link to={`/project/${p.slug}`} className="px-10 py-5 md:px-14 md:py-7 rounded-full text-base md:text-xl font-black tracking-widest uppercase transition-all border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 inline-block bg-[#00F5FF]"
                                                        style={{ color: '#000', fontFamily: theme.fontHeading }}>Explore System</Link>
                                                </Magnetic>
                                            ) : (
                                                <Magnetic intensity={0.2}>
                                                    <a href={p.live} className="px-10 py-5 md:px-14 md:py-7 rounded-full text-base md:text-xl font-black tracking-widest uppercase transition-all border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 inline-block bg-[#00F5FF]"
                                                        style={{ color: '#000', fontFamily: theme.fontHeading }}>View Live</a>
                                                </Magnetic>
                                            )}
                                            <Magnetic intensity={0.2}>
                                                <a href={p.github} className="px-10 py-5 md:px-14 md:py-7 rounded-full text-base md:text-xl font-black tracking-widest uppercase transition-all border-4 border-black shadow-[10px_10px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 bg-white inline-block"
                                                    style={{ color: '#000', fontFamily: theme.fontHeading }}>Source Code</a>
                                            </Magnetic>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-48 text-center rounded-[3rem] p-16 relative overflow-hidden border-4 border-black shadow-[16px_16px_0px_#000]"
                    style={{ background: '#E2D1F9' }}>
                    <h3 className="text-6xl md:text-8xl font-black mb-8 uppercase" style={{ fontFamily: theme.fontHeading, color: '#000' }}>Build Something?</h3>
                    <p className="text-black font-medium text-2xl mb-12 max-w-2xl mx-auto font-body">Available for dedicated engineering roles, distributed systems architecture, and creative AI integration.</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Magnetic intensity={0.3}>
                            <a href="#contact" className="px-12 py-6 rounded-full text-xl font-black uppercase transition-all border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-y-1 hover:translate-x-1 bg-white"
                                style={{ color: '#000' }}>Reach Out</a>
                        </Magnetic>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ── MINIMAL / STITCH ORANGE: Scroll-driven editorial cards ──────────
function ProjectCard({ project: p, index: i, theme }) {
    const cardRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });

    // Parallax image inside card
    const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);
    const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.05]);

    const isEven = i % 2 === 0;

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`group flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-0 items-stretch rounded-2xl overflow-hidden`}
            style={{ background: theme.bg, border: `1.5px solid ${theme.surfaceBorder}` }}
        >
            {/* Image Block with parallax */}
            <div className="w-full md:w-1/2 relative overflow-hidden" style={{ minHeight: '320px' }}>
                <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
                    <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:saturate-[1.2]"
                    />
                </motion.div>
                {/* Project number overlay */}
                <div className="absolute top-6 left-6 z-10">
                    <span className="text-5xl font-black opacity-20" style={{ color: theme.primary, fontFamily: theme.fontMono }}>
                        {p.id}
                    </span>
                </div>
                {/* Gradient overlay */}
                <div className="absolute inset-0 z-[1]"
                    style={{
                        background: isEven
                            ? `linear-gradient(to right, transparent 60%, ${theme.bg})`
                            : `linear-gradient(to left, transparent 60%, ${theme.bg})`
                    }}
                />
            </div>

            {/* Text Content */}
            <div className="w-full md:w-1/2 flex flex-col justify-center gap-5 p-8 lg:p-12">
                <div className="flex items-center gap-3">
                    <div className="h-[2px] w-6 rounded-full" style={{ background: theme.primary }} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em]"
                        style={{ color: theme.primary, fontFamily: theme.fontMono }}>
                        {p.category}
                    </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight transition-colors duration-300 group-hover:translate-x-1"
                    style={{ fontFamily: theme.fontHeading, color: theme.text, transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}>
                    {p.title}
                </h3>

                <p className="text-sm leading-relaxed" style={{ color: theme.textMuted }}>
                    {p.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                    {p.tech.map((t, ti) => (
                        <motion.span
                            key={t}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * ti, duration: 0.4 }}
                            className="px-3 py-1 text-[11px] rounded-full font-semibold tracking-wide transition-all duration-300 hover:scale-105"
                            style={{ background: `${theme.primary}12`, border: `1px solid ${theme.primary}30`, color: theme.primary }}
                        >
                            {t}
                        </motion.span>
                    ))}
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t" style={{ borderColor: `${theme.primary}15` }}>
                    {p.slug ? (
                        <Magnetic intensity={0.15}>
                            <Link to={`/project/${p.slug}`}
                                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-500 hover:shadow-md hover:scale-[1.02]"
                                style={{ background: theme.primary, color: '#fff' }}>
                                Explore
                                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                            </Link>
                        </Magnetic>
                    ) : (
                        <Magnetic intensity={0.15}>
                            <a href={p.live}
                                className="group/btn inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all duration-500 hover:shadow-md hover:scale-[1.02]"
                                style={{ background: theme.primary, color: '#fff' }}>
                                View Live
                                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" /></svg>
                            </a>
                        </Magnetic>
                    )}
                    <Magnetic intensity={0.1}>
                        <a href={p.github}
                            className="px-6 py-3 rounded-full font-bold text-sm border-2 transition-all duration-500 hover:scale-[1.02]"
                            style={{ borderColor: theme.text, color: theme.text }}>
                            GitHub
                        </a>
                    </Magnetic>
                </div>
            </div>
        </motion.div>
    );
}

function MinimalProjects({ theme }) {
    return (
        <section id="projects" className="py-32 overflow-hidden" style={{ background: theme.bg, color: theme.text }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-20"
                >
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-5"
                        style={{ background: `${theme.primary}12`, border: `1px solid ${theme.primary}25`, color: theme.primary }}>
                        Portfolio 2024
                    </span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]" style={{ fontFamily: theme.fontHeading, color: theme.text }}>
                        Projects <span style={{ color: theme.primary }}>Catalog</span>
                    </h2>
                    <p className="mt-5 text-base max-w-xl leading-relaxed" style={{ color: theme.textMuted }}>
                        An immersive deep-dive into systems I've crafted — distributed, AI-powered, experimental.
                    </p>
                    {/* Animated divider */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="h-[2px] mt-8 origin-left max-w-xs"
                        style={{ background: `linear-gradient(to right, ${theme.primary}, transparent)` }}
                    />
                </motion.div>

                {/* Project Cards */}
                <div className="flex flex-col gap-16">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} theme={theme} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ── TERMINAL: ls -la / cat style ──────────────────────────────────────
function TerminalProjects({ theme }) {
    const [selected, setSelected] = useState(0);
    const p = PROJECTS[selected];
    return (
        <section id="projects" className="py-28" style={{ background: '#000', color: theme.text, fontFamily: theme.fontMono }}>
            <div className="max-w-5xl mx-auto px-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-10">
                    <p style={{ color: theme.primary }}>$ ls -la ~/projects/</p>
                    <p className="mt-1 mb-4 text-sm" style={{ color: theme.textMuted }}>total {PROJECTS.length * 128}K   |   3 repositories found</p>
                    <div className="border" style={{ borderColor: `${theme.primary}30` }}>
                        <div className="px-4 py-2 flex gap-3 border-b text-xs" style={{ background: 'rgba(0,255,65,0.05)', borderColor: `${theme.primary}20`, color: theme.textMuted }}>
                            <span className="w-8">perms</span><span className="w-24">modified</span><span className="w-16">size</span><span>name</span>
                        </div>
                        {PROJECTS.map((proj, i) => (
                            <button key={proj.id} onClick={() => setSelected(i)}
                                className="w-full px-4 py-3 flex gap-3 text-sm text-left border-b transition-all"
                                style={{
                                    borderColor: `${theme.primary}15`,
                                    background: selected === i ? `${theme.primary}10` : 'transparent',
                                    color: selected === i ? theme.primary : theme.textMuted,
                                }}>
                                <span className="w-8 opacity-60">drwx</span>
                                <span className="w-24 opacity-60">2024-03-09</span>
                                <span className="w-16 opacity-60">4.2M</span>
                                <span className="font-bold">{proj.title.toLowerCase().replace(' ', '_')}/</span>
                            </button>
                        ))}
                    </div>
                </motion.div>
                {/* cat README.md */}
                <div className="border rounded-lg overflow-hidden" style={{ borderColor: `${theme.primary}40` }}>
                    <div className="px-4 py-2 flex items-center gap-2 border-b text-xs" style={{ background: 'rgba(0,255,65,0.06)', borderColor: `${theme.primary}30`, color: theme.primary }}>
                        <span>$ cat</span>
                        <span>{p.title.toLowerCase().replace(' ', '_')}/README.md</span>
                    </div>
                    <div className="p-6">
                        <p style={{ color: theme.primary }}># {p.title}</p>
                        <p className="mt-1 text-xs mb-4" style={{ color: theme.textMuted }}>## {p.category}</p>
                        <p className="text-sm leading-relaxed mb-4" style={{ color: theme.text }}>{p.description}</p>
                        <p className="text-xs mb-2" style={{ color: theme.textMuted }}>## Tech Stack</p>
                        <div className="flex flex-wrap gap-2 mb-6">
                            {p.tech.map(t => <span key={t} className="text-xs px-2 py-0.5 border" style={{ borderColor: `${theme.primary}40`, color: theme.primary }}>[{t}]</span>)}
                        </div>
                        <div className="flex gap-3">
                            {p.slug ? (
                                <Link to={`/project/${p.slug}`} className="px-5 py-2 text-xs font-black uppercase tracking-wider"
                                    style={{ background: theme.primary, color: '#000' }}>{'>'} explore.sh</Link>
                            ) : (
                                <a href={p.live} className="px-5 py-2 text-xs font-black uppercase tracking-wider"
                                    style={{ background: theme.primary, color: '#000' }}>{'>'} open_live.sh</a>
                            )}
                            <a href={p.github} className="px-5 py-2 text-xs font-black uppercase tracking-wider border"
                                style={{ borderColor: theme.primary, color: theme.primary }}>{'>'} clone.sh</a>
                        </div>
                    </div>
                </div>
                <p className="mt-6 text-xs" style={{ color: `${theme.primary}40` }}>// Use keyboard or click rows to browse · SS_CORE_SYSTEMS</p>
            </div>
        </section>
    );
}

// ─────────────────────────────────────────────────────────────────────
// SKIN: BASEMENT — Strict grid, hairline borders, pure BW contrast
// ─────────────────────────────────────────────────────────────────────
function BasementProjects({ theme }) {
    return (
        <section id="projects" className="py-24 relative" style={{ background: theme.bg, color: theme.text }}>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="mb-16 border-b pb-8" style={{ borderColor: theme.surfaceBorder }}>
                    <h2 className="text-[clamp(4rem,10vw,10rem)] font-black tracking-tighter leading-[0.85] uppercase"
                        style={{ fontFamily: theme.fontHeading }}>
                        SELECTED <br /><span style={{ color: theme.primary }}>WORKS</span>
                    </h2>
                    <div className="flex justify-between items-end mt-8">
                        <p className="text-sm uppercase tracking-widest max-w-sm" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>
                            {PROJECTS.length} PRODUCTION SYSTEMS EXTRACTED FROM THE ARCHIVE
                        </p>
                        <a href="https://github.com/satya-18-w" className="text-xs font-bold uppercase tracking-widest border px-6 py-3 transition-colors hover:bg-white hover:text-black" style={{ borderColor: theme.surfaceBorder, fontFamily: theme.fontMono }}>
                            ALL REPOSITORIES ↗
                        </a>
                    </div>
                </div>

                <div className="flex flex-col border-t" style={{ borderColor: theme.surfaceBorder }}>
                    {PROJECTS.map((p, i) => (
                        <motion.div key={p.id}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="group flex flex-col lg:flex-row border-b relative overflow-hidden transition-colors duration-500"
                            style={{ borderColor: theme.surfaceBorder }}>

                            {/* Hover accent background slide */}
                            <div className="absolute inset-0 w-full h-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 z-0"
                                style={{ background: theme.primary }} />

                            {/* Project Image Block (Left) */}
                            <div className="w-full lg:w-1/3 border-r-0 lg:border-r p-6 relative z-10 transition-colors duration-500"
                                style={{ borderColor: theme.surfaceBorder }}>
                                <div className="w-full aspect-4/3 overflow-hidden bg-black/50">
                                    <img src={p.image} alt={p.title}
                                        className="w-full h-full object-cover filter grayscale contrast-125 opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100" />
                                </div>
                            </div>

                            {/* Project Info Block (Right) */}
                            <div className="flex-1 p-6 lg:p-10 flex flex-col justify-between relative z-10">
                                <div>
                                    <div className="flex flex-wrap items-center gap-4 mb-6">
                                        <span className="text-xs font-mono opacity-50 group-hover:text-black">{p.id}</span>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] group-hover:text-black"
                                            style={{ color: theme.primary, fontFamily: theme.fontMono }}>{p.category}</span>
                                        <div className="ml-auto flex gap-2">
                                            {p.slug ? (
                                                <Link to={`/project/${p.slug}`} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors group-hover:border-black group-hover:text-black"
                                                    style={{ borderColor: theme.surfaceBorder, fontFamily: theme.fontMono }}>EXPLORE</Link>
                                            ) : (
                                                <a href={p.live} className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border transition-colors group-hover:border-black group-hover:text-black"
                                                    style={{ borderColor: theme.surfaceBorder, fontFamily: theme.fontMono }}>LIVE ↗</a>
                                            )}
                                        </div>
                                    </div>

                                    <h3 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 group-hover:text-black transition-colors duration-500"
                                        style={{ fontFamily: theme.fontHeading }}>{p.title}</h3>

                                    <p className="text-sm leading-relaxed max-w-2xl group-hover:text-black/80 transition-colors duration-500"
                                        style={{ color: theme.textMuted }}>{p.description}</p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-8">
                                    {p.tech.map(t => (
                                        <span key={t} className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest border group-hover:border-black/30 group-hover:text-black transition-colors duration-500"
                                            style={{ borderColor: theme.surfaceBorder, fontFamily: theme.fontMono }}>{t}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function ProjectsSection() {
    const { theme, themeKey } = useTheme();
    if (themeKey === 'minimal') return <MinimalProjects theme={theme} />;
    if (themeKey === 'terminal') return <TerminalProjects theme={theme} />;
    if (themeKey === 'brutalist') return <BasementProjects theme={theme} />;
    return <CyberProjects theme={theme} />;
}
