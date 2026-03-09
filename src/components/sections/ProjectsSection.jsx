import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import TiltCard from '../ui/TiltCard';

const PROJECTS = [
    {
        id: '01',
        title: 'Astra AI',
        desc: 'A premium AI-driven engine built for high-scale processing and automated decision making. Features a distributed task queue and real-time inference pipeline.',
        tech: ['Python', 'Go', 'Redis', 'Docker', 'gRPC'],
        github: 'https://github.com/satya-18-w',
        live: '#',
        accent: '#00F5FF',
        image: 'https://images.unsplash.com/photo-1620712948343-00842a5a0435?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '02',
        title: 'FloatChat',
        desc: 'Real-time WebSocket based communication platform with end-to-end encryption, presence indicators, and ultra-low latency message delivery.',
        tech: ['Go', 'React', 'WebSockets', 'PostgreSQL', 'Redis'],
        github: 'https://github.com/satya-18-w/Chat_Protocol',
        live: 'https://github.com/satya-18-w/Chat_Protocol',
        accent: '#8B5CF6',
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: '03',
        title: 'OSRM Proxy Route',
        desc: 'Highly optimized Go backend routing proxy for Open Source Routing Machine. Centralizes geospatial logic and eliminates CORS issues from client-facing apps.',
        tech: ['Go', 'OSRM', 'Docker', 'REST API', 'Gin'],
        github: 'https://github.com/satya-18-w',
        live: '#',
        accent: '#10B981',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop'
    },
];

function ProjectCard({ project, idx }) {
    const { theme } = useTheme();
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
            <TiltCard
                className="group flex flex-col rounded-3xl overflow-hidden h-full"
                style={{
                    background: 'linear-gradient(180deg, rgba(15,15,35,0.7) 0%, rgba(6,6,17,0.92) 100%)',
                    border: `1px solid rgba(255,255,255,0.06)`,
                    boxShadow: `0 10px 40px -10px ${project.accent}18`,
                }}
                intensity={10}
            >
                {/* Image */}
                <div className="relative w-full h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#060611] via-transparent to-transparent z-10" />
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Accent overlay */}
                    <div
                        className="absolute inset-0 opacity-15 mix-blend-overlay z-0"
                        style={{ background: project.accent }}
                    />
                    {/* Number badge */}
                    <span
                        className="absolute top-4 right-4 z-20 font-mono text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}40` }}
                    >
                        {project.id}
                    </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 flex flex-col">
                    <h3
                        className="text-xl font-display font-bold text-white mb-2 transition-colors duration-300"
                        style={{ '--accent': project.accent }}
                    >
                        {project.title}
                    </h3>

                    <p className="text-sm text-gray-400 mb-5 flex-1 leading-relaxed">{project.desc}</p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                        {project.tech.map((t) => (
                            <span
                                key={t}
                                className="text-[10px] font-medium px-2.5 py-1 rounded-full"
                                style={{
                                    background: `rgba(255,255,255,0.04)`,
                                    border: `1px solid rgba(255,255,255,0.09)`,
                                    color: '#94A3B8',
                                }}
                            >
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* Glowing divider */}
                    <div className="w-full h-px mb-5 rounded-full" style={{ background: `linear-gradient(90deg, ${project.accent}00, ${project.accent}50, ${project.accent}00)` }} />

                    {/* Buttons */}
                    <div className="flex items-center gap-3 mt-auto">
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 text-center text-[11px] font-bold tracking-widest uppercase rounded-xl transition-all duration-300"
                            style={{
                                background: project.accent,
                                color: '#030014',
                                boxShadow: `0 0 18px ${project.accent}40`,
                            }}
                        >
                            Live Demo
                        </a>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-2.5 text-center text-[11px] font-bold tracking-widest uppercase rounded-xl border transition-all duration-300 hover:bg-white/5"
                            style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'white' }}
                        >
                            GitHub ↗
                        </a>
                    </div>
                </div>
            </TiltCard>
        </motion.div>
    );
}

export default function ProjectsSection() {
    const { theme } = useTheme();
    const { scrollYProgress } = useScroll();
    const labelY = useTransform(scrollYProgress, [0, 1], [0, -30]);

    return (
        <section
            id="projects"
            className="min-h-screen w-full relative py-24 lg:py-32 snap-section overflow-hidden"
            style={{ background: 'var(--bg-dark)' }}
        >
            {/* Subtle background glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.08]"
                    style={{ background: theme.primary }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <motion.span
                        style={{ y: labelY, color: theme.secondary }}
                        className="section-label block mb-4 text-xs font-mono tracking-[0.3em] uppercase"
                    >
                        Work Showcase
                    </motion.span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="mt-4 text-gray-500 text-base max-w-lg mx-auto leading-relaxed">
                        A selection of systems I've engineered — from real-time backends to AI-driven pipelines.
                    </p>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((project, idx) => (
                        <ProjectCard key={project.id} project={project} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
