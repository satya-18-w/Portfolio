import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Magnetic from '../ui/Magnetic';
import { useTheme } from '../../context/ThemeContext';
import { TextReveal } from '../ui/TextReveal';
import TiltCard from '../ui/TiltCard';
import ProjectCard from '../ui/ProjectCard';
import Container from '../layout/Container';
import SectionWrapper from '../layout/SectionWrapper';

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
        <SectionWrapper id="projects" style={{ background: theme.bg, color: theme.text }}>
            <Container>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="flex flex-col mb-24 z-10 relative">
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

                <div className="flex flex-col gap-24 lg:gap-32 w-full">
                    {PROJECTS.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i} theme={theme} />
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mt-32 text-center rounded-[3rem] p-12 lg:p-16 relative overflow-hidden border-4 border-black shadow-[16px_16px_0px_#000] w-full"
                    style={{ background: '#E2D1F9' }}>
                    <h3 className="text-4xl md:text-6xl lg:text-8xl font-black mb-8 uppercase" style={{ fontFamily: theme.fontHeading, color: '#000' }}>Build Something?</h3>
                    <p className="text-black font-medium text-xl lg:text-2xl mb-12 max-w-2xl mx-auto font-body">Available for dedicated engineering roles, distributed systems architecture, and creative AI integration.</p>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Magnetic intensity={0.3}>
                            <a href="#contact" className="px-12 py-6 rounded-full text-xl font-black uppercase transition-all border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[2px_2px_0px_#000] hover:translate-y-1 hover:translate-x-1 bg-white"
                                style={{ color: '#000' }}>Reach Out</a>
                        </Magnetic>
                    </div>
                </motion.div>
            </Container>
        </SectionWrapper>
    );
}



function MinimalProjects({ theme }) {
    return (
        <section id="projects" className="py-32 overflow-hidden" style={{ background: theme.bg, color: theme.text }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
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
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
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
