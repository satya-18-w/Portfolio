import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Magnetic from '../ui/Magnetic';
import { useTheme } from '../../context/ThemeContext';
import SectionWrapper from '../layout/SectionWrapper';

const PROJECTS = [
    {
        id: '01', category: 'AI · RAG SYSTEM', title: 'FloatChat',
        description: 'Production-grade RAG system for exploring ARGO oceanographic data. Implemented a robust microservice architecture using Docker and Kubernetes, achieving sub-50ms retrieval latency for complex geospatial querying over massive datasets.',
        tech: ['Go', 'Python', 'LangChain', 'AWS', 'Kafka'],
        live: '#', github: '#',
        image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=900&q=80',
        color: '#00F5FF',
    },
    {
        id: '02', category: 'BACKEND · DISTRIBUTED', title: 'Astra Platform',
        description: 'Comprehensive full-stack AI platform: real-time chat, semantic web search, and autonomous multi-agent orchestration. Engineered for scale, handling thousands of concurrent connections with sub-10ms latency across 3 global regions.',
        tech: ['Go', 'gRPC', 'Redis', 'PostgreSQL', 'Docker'],
        live: '#', github: '#',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
        color: '#8B5CF6',
    },
    {
        id: '03', category: 'MOBILE · FULL STACK', title: 'Ride Share Engine',
        description: 'Production-ready ride dispatch system featuring a completely custom OSRM routing proxy. Built with real-time driver geolocation streaming over WebSockets and high-accuracy live ETA predictions processed by the Go backend.',
        tech: ['Go', 'WebSocket', 'OSRM', 'Android', 'PostgreSQL'],
        live: '#', github: '#',
        image: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=900&q=80',
        color: '#F59E0B',
    },
    {
        id: '04', category: 'ML · MLOPS', title: 'Uber Demand Prediction',
        slug: 'uber-demand-prediction',
        description: 'End-to-end Machine Learning pipeline designed to predict Uber ride demands utilizing massive NYC taxi datasets. Focuses heavily on spatial and temporal pattern analysis, fully integrated with MLflow model tracking and DVC-managed reproducible workflows.',
        tech: ['Python', 'Scikit-learn', 'MLflow', 'DVC', 'Docker'],
        live: '#', github: 'https://github.com/satya-18',
        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900&q=80',
        color: '#FF006E',
    },
];

const UPCOMING = [
    { title: 'Neural Compute Cluster', category: 'INFRASTRUCTURE', status: 'In Development' },
    { title: 'Distributed Graph DB', category: 'DATABASES', status: 'Decoding...' }
];

export default function ProjectsSection() {
    const { theme, themeKey } = useTheme();
    const [selectedId, setSelectedId] = useState(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedId) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedId]);

    const disableModal = themeKey === 'terminal';

    // Theme adapters for the section styling
    const isBasement = themeKey === 'brutalist';
    const isCyber = themeKey === 'cyber';
    
    // Grid card styling based on theme
    const cardBorder = isCyber ? '4px solid #000' : isBasement ? `1px solid ${theme.surfaceBorder}` : `1px solid ${theme.primary}30`;
    const cardShadow = isCyber ? '12px 12px 0px #000' : 'none';
    const cardRadius = (isCyber || themeKey === 'minimal') ? '1.5rem' : '0.5rem';
    
    // Find selected project
    const selectedProject = PROJECTS.find(p => p.id === selectedId);

    return (
        <SectionWrapper id="projects" style={{ background: theme.bg, color: theme.text }}>
            
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 relative z-10 min-h-screen">
                
                {/* ── SECTION HEADER ── */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b"
                    style={{ borderColor: theme.surfaceBorder }}
                >
                    <div>
                        <span className="inline-block px-3 py-1 mb-6 text-xs font-bold uppercase tracking-widest" 
                            style={{ border: `1px solid ${theme.primary}50`, color: theme.primary }}>
                            Portfolio 2024
                        </span>
                        <h2 className="text-6xl sm:text-7xl md:text-[6rem] lg:text-[8rem] font-black uppercase tracking-tighter leading-[0.85]"
                            style={{ fontFamily: theme.fontHeading }}>
                            SELECTED<br/><span style={{ color: theme.primary }}>WORKS</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-sm leading-relaxed" style={{ color: theme.textMuted, fontFamily: theme.fontBody }}>
                        An immersive deep-dive into systems I've crafted — distributed, AI-powered, and massively scalable.
                    </p>
                </motion.div>

                {/* ── PROJECTS GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12 w-full mb-32">
                    {PROJECTS.map((p) => (
                        <motion.div 
                            key={p.id}
                            layoutId={`project-container-${p.id}`}
                            onClick={() => !disableModal && setSelectedId(p.id)}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="group relative flex flex-col cursor-pointer overflow-hidden transition-all duration-500"
                            style={{ 
                                background: isCyber ? '#fff' : theme.bgAlt,
                                border: cardBorder,
                                boxShadow: cardShadow,
                                borderRadius: cardRadius
                            }}
                        >
                            {/* Card Image */}
                            <motion.div layoutId={`project-image-box-${p.id}`} className="w-full aspect-video overflow-hidden relative">
                                {/* Hover overlay for cinematic effect */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                                    <span className="px-6 py-3 border border-white/30 text-white font-bold tracking-widest uppercase text-xs backdrop-blur-sm rounded-full scale-90 group-hover:scale-100 transition-transform duration-500 delay-100">
                                        View Case Study
                                    </span>
                                </div>
                                <motion.img 
                                    layoutId={`project-image-${p.id}`}
                                    src={p.image} 
                                    alt={p.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110"
                                    style={{ 
                                        filter: isBasement ? 'grayscale(100%) contrast(1.2)' : isCyber ? 'contrast(1.2)' : 'none'
                                    }}
                                />
                            </motion.div>

                            {/* Card Content Top */}
                            <motion.div layoutId={`project-content-${p.id}`} className="p-6 md:p-8 flex flex-col flex-1 relative z-20" style={{ background: isCyber ? '#fff' : 'transparent' }}>
                                <motion.div layoutId={`project-meta-${p.id}`} className="flex items-center gap-3 mb-4">
                                    <span className="text-xs font-mono font-bold px-2 py-1" style={{ color: '#000', background: p.color }}>{p.id}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: isCyber ? '#000' : theme.textMuted }}>{p.category}</span>
                                </motion.div>
                                
                                <motion.h3 layoutId={`project-title-${p.id}`} className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4"
                                    style={{ color: isCyber ? '#000' : theme.text, fontFamily: theme.fontHeading }}>
                                    {p.title}
                                </motion.h3>

                                <motion.p layoutId={`project-desc-${p.id}`} className="text-sm md:text-base leading-relaxed line-clamp-2"
                                    style={{ color: isCyber ? '#444' : theme.textMuted, fontFamily: theme.fontBody }}>
                                    {p.description}
                                </motion.p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* ── COMING SOON VAULT ── */}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-px bg-white/10 flex-1" style={{ background: theme.surfaceBorder }}></div>
                        <h4 className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>Accessing Future Builds...</h4>
                        <div className="h-px bg-white/10 flex-1" style={{ background: theme.surfaceBorder }}></div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* ── FULL SCREEN MODAL TRANSITION ── */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-12 lg:p-24"
                    >
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ backdropFilter: 'blur(0px)', background: 'rgba(0,0,0,0)' }}
                            animate={{ backdropFilter: 'blur(20px)', background: 'rgba(0,0,0,0.85)' }}
                            exit={{ backdropFilter: 'blur(0px)', background: 'rgba(0,0,0,0)' }}
                            className="absolute inset-0 cursor-[url('/images/cursor-close.png'),pointer]"
                            onClick={() => setSelectedId(null)}
                        />

                        {/* Modal Container */}
                        <motion.div
                            layoutId={`project-card-${selectedProject.id}`}
                            className="w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl relative z-100 flex flex-col md:flex-row bg-[#0a0a0a] cursor-[url('/images/cursor-close.png'),pointer]"
                            style={{ 
                                border: isCyber ? '4px solid #000' : isTerminal ? `1px solid ${theme.primary}` : `1px solid ${theme.surfaceBorder}`,
                                boxShadow: isCyber ? '12px 12px 0px #000' : isBasement ? `0 0 40px ${theme.primary}20` : '0 25px 50px -12px rgba(0,0,0,0.5)'
                            }}>
                            {/* Close Button Top Right (Mobile Sticky) */}
                            <motion.button 
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ delay: 0.2 }}
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 lg:hidden w-12 h-12 bg-black text-white rounded-full flex items-center justify-center z-50 text-xl font-bold"
                            >
                                ✕
                            </motion.button>

                            {/* Modal Left: Image */}
                            <motion.div layoutId={`project-image-box-${selectedProject.id}`} className="w-full lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[600px] relative">
                                <motion.img 
                                    layoutId={`project-image-${selectedProject.id}`}
                                    src={selectedProject.image} 
                                    alt={selectedProject.title} 
                                    className="w-full h-full object-cover"
                                />
                                {/* Gradient overlay for text readability */}
                                <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent pointer-events-none mix-blend-multiply" />
                            </motion.div>

                            {/* Modal Right: Content */}
                            <motion.div layoutId={`project-content-${selectedProject.id}`} className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-transparent z-10 -mt-10 lg:mt-0">
                                
                                <motion.div layoutId={`project-meta-${selectedProject.id}`} className="flex items-center gap-3 mb-6">
                                    <span className="text-sm font-mono font-black px-3 py-1" style={{ color: '#000', background: selectedProject.color }}>{selectedProject.id}</span>
                                    <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 border" 
                                        style={{ color: isCyber ? '#000' : theme.primary, borderColor: isCyber ? '#000' : theme.primary }}>
                                        {selectedProject.category}
                                    </span>
                                </motion.div>
                                
                                <motion.h3 layoutId={`project-title-${selectedProject.id}`} className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]"
                                    style={{ color: isCyber ? '#000' : theme.text, fontFamily: theme.fontHeading }}>
                                    {selectedProject.title}
                                </motion.h3>

                                <motion.p layoutId={`project-desc-${selectedProject.id}`} className="text-base lg:text-xl leading-relaxed mb-12"
                                    style={{ color: isCyber ? '#333' : theme.textMuted, fontFamily: theme.fontBody }}>
                                    {selectedProject.description}
                                </motion.p>

                                {/* Delayed Fade-in content strictly inside Modal */}
                                <motion.div 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                >
                                    <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: isCyber ? '#000' : theme.textMuted }}>Tech Stack</h4>
                                    <div className="flex flex-wrap gap-2 mb-12">
                                        {selectedProject.tech.map(t => (
                                            <span key={t} className="px-4 py-2 text-xs font-bold uppercase tracking-wider border"
                                                style={{ 
                                                    borderColor: isCyber ? '#000' : theme.surfaceBorder, 
                                                    color: isCyber ? '#000' : theme.text,
                                                    background: isCyber ? '#f0f0f0' : 'rgba(255,255,255,0.03)'
                                                }}>
                                                {t}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                                        {selectedProject.slug ? (
                                            <Link to={`/project/${selectedProject.slug}`} 
                                                className="w-full sm:flex-1 text-center px-6 py-4 lg:px-8 lg:py-5 text-xs lg:text-sm font-black uppercase tracking-widest transition-transform hover:scale-105"
                                                style={{ background: theme.primary, color: '#000', border: isCyber ? '3px solid #000' : 'none' }}>
                                                Read Case Study
                                            </Link>
                                        ) : (
                                            <a href={selectedProject.live} target="_blank" rel="noopener noreferrer"
                                                className="w-full sm:flex-1 text-center px-6 py-4 lg:px-8 lg:py-5 text-xs lg:text-sm font-black uppercase tracking-widest transition-transform hover:scale-105"
                                                style={{ background: theme.primary, color: '#000', border: isCyber ? '3px solid #000' : 'none' }}>
                                                View Live Link
                                            </a>
                                        )}
                                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                                            className="w-full sm:w-auto text-center px-6 py-4 lg:px-8 lg:py-5 text-xs lg:text-sm font-black uppercase tracking-widest border transition-colors hover:bg-white hover:text-black"
                                            style={{ borderColor: isCyber ? '#000' : theme.surfaceBorder, color: isCyber ? '#000' : theme.text }}>
                                            Source
                                        </a>
                                    </div>
                                </motion.div>

                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </SectionWrapper>
    );
}
