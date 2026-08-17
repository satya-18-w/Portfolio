import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import SectionWrapper from '../layout/SectionWrapper';
import { PROJECTS } from '../../lib/projectsData';

const UPCOMING = [
    { title: 'Neural Compute Cluster', category: 'INFRASTRUCTURE', status: 'In Development' },
    { title: 'Distributed Graph DB', category: 'DATABASES', status: 'Decoding...' }
];

export default function ProjectsSection() {
    const { theme, themeKey } = useTheme();
    const isTerminal = themeKey === 'terminal';

    return (
        <SectionWrapper id="projects" style={{ background: theme.bg, color: theme.text }}>

            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 relative z-10 min-h-screen">

                {/* ── SECTION HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mb-14 lg:mb-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-end pb-8 border-b"
                    style={{ borderColor: theme.surfaceBorder }}
                >
                    <div>
                        <span className="inline-block px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest"
                            style={{ border: `1px solid ${theme.primary}50`, color: theme.primary }}>
                            Portfolio 2024
                        </span>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black uppercase tracking-tighter leading-[0.85]"
                            style={{ fontFamily: theme.fontHeading }}>
                            SELECTED<br /><span style={{ color: theme.primary }}>WORKS</span>
                        </h2>
                    </div>
                    <p className="max-w-xs lg:justify-self-end text-sm leading-relaxed" style={{ color: theme.textMuted, fontFamily: theme.fontBody }}>
                        An immersive deep-dive into systems I've crafted — distributed, AI-powered, and massively scalable.
                    </p>
                </motion.div>

                {/* ── PROJECTS GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 pb-12">
                    {PROJECTS.map((p) => {
                        const techPreview = p.techStack.slice(0, 3);

                        return (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="group relative flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1 h-full"
                                style={{
                                    background: '#111111',
                                    border: '1px solid #1a1a1a',
                                    borderRadius: '1rem',
                                    padding: '24px 28px',
                                }}
                            >
                                <div className="flex flex-col h-full w-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: '#7a7a7a' }}>
                                            {p.category}
                                        </span>
                                        <span className="text-xs font-bold" style={{ color: theme.primary }}>
                                            {p.id}
                                        </span>
                                    </div>

                                    <motion.h3 className="text-3xl sm:text-[2.1rem] font-black text-white leading-none tracking-tight mb-4"
                                        style={{ fontFamily: theme.fontHeading }}>
                                        {p.title}
                                    </motion.h3>

                                    <p className="text-sm leading-relaxed mb-6" style={{ color: '#a1a1aa' }}>
                                        {p.summary}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-7">
                                        {techPreview.map((tech) => (
                                            <span key={tech} className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md border"
                                                style={{ borderColor: '#2a2a2a', color: '#d4d4d8', background: '#151515' }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto border-t border-[#1a1a1a] pt-5 flex items-center justify-between gap-4">
                                        <span className="text-[11px] uppercase tracking-wider" style={{ color: '#7a7a7a' }}>
                                            Problem, solution, stack
                                        </span>
                                        <Link to={`/project/${p.slug}`}
                                            className="px-4 py-2 text-xs font-black uppercase tracking-wider rounded-md transition-colors"
                                            style={{ background: theme.primary, color: isTerminal ? '#000' : '#050505' }}>
                                            Details
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* ── COMING SOON VAULT ── */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <div className="flex items-center gap-4 mb-8 max-w-[1400px] mx-auto">
                        <div className="h-px bg-white/10 flex-1" style={{ background: theme.surfaceBorder }}></div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>Accessing Future Builds...</h4>
                        <div className="h-px bg-white/10 flex-1" style={{ background: theme.surfaceBorder }}></div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-8">
                        {UPCOMING.map((u, i) => (
                            <div key={i} className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between border border-dashed rounded-2xl relative overflow-hidden gap-4"
                                style={{ borderColor: theme.surfaceBorder, background: theme.surface }}>
                                {/* Diagonal striped background for 'under construction' feel */}
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                    style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 2px, transparent 2px, transparent 8px)', filter: 'invert(1)' }} />

                                <div>
                                    <h5 className="text-xl font-bold uppercase tracking-wide mb-1 opacity-50" style={{ color: theme.text }}>{u.title}</h5>
                                    <span className="text-[10px] uppercase font-mono tracking-widest opacity-40" style={{ color: theme.textMuted }}>{u.category}</span>
                                </div>
                                <div className="px-4 py-1 border rounded-full text-xs font-bold uppercase tracking-wider animate-pulse"
                                    style={{ borderColor: theme.primary, color: theme.primary }}>
                                    {u.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

            </div>

        </SectionWrapper>
    );
}
