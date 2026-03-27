import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillCard from '../ui/SkillCard';
import SectionWrapper from '../layout/SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All Skills', 'Frontend & UI', 'Backend & APIs', 'AI & ML', 'Databases', 'DevOps & Cloud', 'Tools'];

const SKILLS = [
    { name: 'HTML5', category: 'Frontend & UI', icon: '🌐', level: 95 },
    { name: 'CSS3', category: 'Frontend & UI', icon: '💅', level: 90 },
    { name: 'JavaScript', category: 'Frontend & UI', icon: 'JS', level: 95 },
    { name: 'TypeScript', category: 'Frontend & UI', icon: 'TS', level: 88 },
    { name: 'React.js', category: 'Frontend & UI', icon: '⚛', level: 90 },
    { name: 'Next.js', category: 'Frontend & UI', icon: '▲', level: 85 },
    { name: 'Tailwind CSS', category: 'Frontend & UI', icon: '🎨', level: 95 },

    { name: 'Go (Golang) ⭐', category: 'Backend & APIs', icon: '🐹', level: 95 },
    { name: 'Python', category: 'Backend & APIs', icon: '🐍', level: 90 },
    { name: 'Node.js', category: 'Backend & APIs', icon: '⬢', level: 85 },
    { name: 'Echo', category: 'Backend & APIs', icon: '🎛', level: 85 },
    { name: 'Fiber', category: 'Backend & APIs', icon: '⚡', level: 88 },
    { name: 'FastAPI', category: 'Backend & APIs', icon: '🚀', level: 90 },
    { name: 'REST APIs', category: 'Backend & APIs', icon: '🔗', level: 95 },
    { name: 'gRPC', category: 'Backend & APIs', icon: '🚄', level: 85 },
    { name: 'WebSockets', category: 'Backend & APIs', icon: '🔌', level: 80 },
    { name: 'GraphQL', category: 'Backend & APIs', icon: '🕸', level: 75 },
    { name: 'JWT Auth', category: 'Backend & APIs', icon: '🔑', level: 90 },
    { name: 'OAuth 2.0', category: 'Backend & APIs', icon: '🛡', level: 85 },

    { name: 'NumPy', category: 'AI & ML', icon: '🔢', level: 85 },
    { name: 'Pandas', category: 'AI & ML', icon: '🐼', level: 85 },
    { name: 'Scikit-learn', category: 'AI & ML', icon: '🧪', level: 80 },
    { name: 'TensorFlow', category: 'AI & ML', icon: '🧠', level: 75 },
    { name: 'PyTorch', category: 'AI & ML', icon: '🔥', level: 82 },
    { name: 'MLflow ⭐', category: 'AI & ML', icon: '📈', level: 85 },
    { name: 'Streamlit', category: 'AI & ML', icon: '👑', level: 80 },
    { name: 'DVC', category: 'AI & ML', icon: '🗂', level: 75 },
    { name: 'Jupyter', category: 'AI & ML', icon: '📓', level: 90 },

    { name: 'PostgreSQL ⭐', category: 'Databases', icon: '🐘', level: 95 },
    { name: 'MongoDB', category: 'Databases', icon: '🍃', level: 85 },
    { name: 'Redis', category: 'Databases', icon: '🔴', level: 88 },
    { name: 'MySQL', category: 'Databases', icon: '🐬', level: 80 },
    { name: 'Pinecone', category: 'Databases', icon: '🌲', level: 85 },
    { name: 'Waviate', category: 'Databases', icon: '🌊', level: 75 },
    { name: 'Neo4j', category: 'Databases', icon: '🕸', level: 70 },

    { name: 'Docker ⭐', category: 'DevOps & Cloud', icon: '🐳', level: 95 },
    { name: 'GitHub Actions', category: 'DevOps & Cloud', icon: '▶', level: 85 },
    { name: 'AWS (EC2, S3)', category: 'DevOps & Cloud', icon: '☁', level: 85 },
    { name: 'Vercel', category: 'DevOps & Cloud', icon: '▲', level: 90 },
    { name: 'Sevalla', category: 'DevOps & Cloud', icon: '▲', level: 70 },
    { name: 'Prometheus', category: 'DevOps & Cloud', icon: '🔭', level: 75 },

    { name: 'Git & GitHub ⭐', category: 'Tools', icon: '🐙', level: 95 },
    { name: 'VS Code', category: 'Tools', icon: '💻', level: 95 },
    { name: 'Postman', category: 'Tools', icon: '📬', level: 90 },
    { name: 'Linux', category: 'Tools', icon: '🐧', level: 85 },
];

/* ── TOYFIGHT BRUTALIST POP: Draggable floating blocky cards ─────────────────────────── */
function CyberSkills({ theme }) {
    const [activeCategory, setActiveCategory] = useState('All Skills');
    const filtered = activeCategory === 'All Skills' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);
    const constraintsRef = useRef(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current,
                { opacity: 0, y: 100, rotateX: -30 },
                {
                    opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "power4.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <SectionWrapper id="skills" ref={sectionRef} style={{ background: theme.bg, color: theme.text }} className="overflow-hidden">

            <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
                <div ref={headerRef} className="text-left md:text-center mb-16 md:mb-24">
                    <h2 className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.85] z-10 relative" style={{ fontFamily: theme.fontHeading }}>
                        Skills{' '}
                        <span className="inline-block shrink-0 mt-4 px-6 md:px-8 py-2 border-4 border-black rounded-full shadow-[8px_8px_0px_#000] rotate-2 bg-[#FAEDCD] text-wrap">
                            Playground
                        </span>
                    </h2>
                    <div className="mt-16 md:mt-20 lg:mt-28 relative z-20">
                        <p className="text-black text-sm md:text-xl font-bold max-w-xl mx-auto border-2 border-black inline-block px-6 py-2 rounded-full shadow-[4px_4px_0px_#000] bg-white">
                            Toss the cards around. Watch them bounce.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mt-12">
                    {/* Filter Sidebar */}
                    <div className="flex flex-row lg:flex-col gap-3 min-w-[200px] shrink-0 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                        {CATEGORIES.map(cat => (
                            <button key={cat} onClick={() => setActiveCategory(cat)}
                                className={`flex items-center gap-3 px-6 py-4 rounded-full text-sm lg:text-base font-black uppercase tracking-widest text-left transition-all border-4 border-black whitespace-nowrap lg:whitespace-normal
                                    ${activeCategory === cat ? 'shadow-[4px_4px_0px_#000] translate-y-0 translate-x-0' : 'shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1'}`}
                                style={{
                                    background: activeCategory === cat ? '#E0FBFC' : '#fff',
                                    color: '#000'
                                }}>
                                <span className="text-xl">
                                    {cat === 'All Skills' ? '✦' : cat === 'Frontend & UI' ? '🎨' : cat === 'Backend & APIs' ? '⚙' : cat === 'AI & ML' ? '🧠' : cat === 'Databases' ? '🗄' : cat === 'DevOps & Cloud' ? '☁' : '🛠'}
                                </span>
                                <span>{cat}</span>
                            </button>
                        ))}
                    </div>

                    {/* Grid/Physics container */}
                    <div ref={constraintsRef} className="flex-1 relative min-h-[520px] rounded-[3rem] border-4 border-black shadow-[16px_16px_0px_#000] overflow-hidden bg-white">
                        {/* Internal grid pattern */}
                        <div className="absolute inset-0 pointer-events-none opacity-20 z-0"
                            style={{ backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 lg:gap-8 p-8 relative z-10">
                            <AnimatePresence mode="popLayout">
                                {filtered.map((skill, i) => (
                                    <SkillCard 
                                        key={`${skill.name}-${activeCategory}`} 
                                        skill={skill} 
                                        index={i} 
                                        constraintsRef={constraintsRef} 
                                        activeCategory={activeCategory} 
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}

/* ── MINIMAL: Orange icon grid with proficiency dots ──────────────── */
function MinimalSkills({ theme }) {
    const [active, setActive] = useState('All Skills');
    const filtered = active === 'All Skills' ? SKILLS : SKILLS.filter(s => s.category === active);
    return (
        <section id="skills" className="py-28" style={{ background: theme.bgAlt, color: theme.text }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                    <h2 className="text-7xl md:text-9xl font-black tracking-tighter" style={{ fontFamily: theme.fontHeading, color: theme.text }}>
                        Core <span style={{ color: theme.primary }}>Expertise</span>
                    </h2>
                    <p className="mt-3 text-lg" style={{ color: theme.textMuted }}>Advanced technical proficiencies across the full engineering stack.</p>
                    <div className="h-px mt-6 w-16" style={{ background: theme.primary }} />
                </motion.div>
                {/* Category tabs */}
                <div className="flex gap-3 flex-wrap mb-10">
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActive(cat)}
                            className="px-5 py-2 rounded-full text-sm font-bold border-2 transition-all hover:scale-105"
                            style={{ background: active === cat ? theme.primary : 'transparent', borderColor: active === cat ? theme.primary : `${theme.textMuted}50`, color: active === cat ? '#fff' : theme.textMuted }}>
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {filtered.map((skill, i) => (
                        <motion.div key={skill.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="p-5 rounded-2xl flex items-center gap-4 group transition-all hover:shadow-lg"
                            style={{ background: 'white', border: `2px solid ${theme.surfaceBorder}` }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = theme.primary}
                            onMouseLeave={e => e.currentTarget.style.borderColor = theme.surfaceBorder}>
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                                style={{ background: `${theme.primary}12` }}>{skill.icon}</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <span className="font-bold text-sm" style={{ color: theme.text }}>{skill.name}</span>
                                    <span className="text-xs font-mono font-bold" style={{ color: theme.primary }}>{skill.level}%</span>
                                </div>
                                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: `${theme.primary}20` }}>
                                    <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 0.8, delay: i * 0.05 }}
                                        className="h-full rounded-full" style={{ background: theme.primary }} />
                                </div>
                                <span className="text-[10px] mt-1 block" style={{ color: theme.textMuted }}>{skill.category}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── TERMINAL: htop-style resource monitor ────────────────────────── */
function TerminalSkills({ theme }) {
    const [active, setActive] = useState('All Skills');
    const filtered = active === 'All Skills' ? SKILLS : SKILLS.filter(s => s.category === active);
    return (
        <section id="skills" className="py-28" style={{ background: '#000', color: theme.text, fontFamily: theme.fontMono }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <p className="mb-1" style={{ color: theme.primary }}>$ skill_matrix --user=satyajit --format=htop</p>
                    <p className="text-xs mb-6" style={{ color: theme.textMuted }}>Scanning neural stack... 19 modules loaded.</p>
                    {/* htop-style header */}
                    <div className="border rounded-t-lg overflow-hidden" style={{ borderColor: `${theme.primary}40` }}>
                        <div className="px-4 py-2 flex items-center gap-2 border-b text-xs" style={{ background: 'rgba(0,255,65,0.06)', borderColor: `${theme.primary}30`, color: theme.primary }}>
                            <div className="flex gap-1.5">{['#ff5f57', '#febc2e', '#28c840'].map(c => <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />)}</div>
                            SS_SKILL_MONITOR — htop 3.2.0 — 19 processes
                        </div>
                        {/* Filter tabs */}
                        <div className="flex border-b text-xs" style={{ borderColor: `${theme.primary}20` }}>
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setActive(cat)}
                                    className="px-4 py-2 transition-colors"
                                    style={{ background: active === cat ? `${theme.primary}15` : 'transparent', color: active === cat ? theme.primary : theme.textMuted, borderRight: `1px solid ${theme.primary}20` }}>
                                    {cat === 'All Skills' ? '[ALL]' : `[${cat.toUpperCase().replace(' & ', '+')}]`}
                                </button>
                            ))}
                        </div>
                        {/* Column headers */}
                        <div className="px-4 py-2 flex gap-4 text-xs border-b" style={{ background: theme.primary, color: '#000', borderColor: `${theme.primary}40` }}>
                            <span className="w-6">PID</span><span className="w-36">MODULE</span><span className="flex-1">PROFICIENCY_BAR</span><span className="w-12 text-right">%LOAD</span>
                        </div>
                        <AnimatePresence>
                            {filtered.map((skill, i) => (
                                <motion.div key={skill.name}
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ delay: i * 0.03 }}
                                    className="px-4 py-2 flex gap-4 items-center text-xs border-b transition-colors"
                                    style={{ borderColor: `${theme.primary}10`, background: i % 2 === 0 ? 'rgba(0,255,65,0.02)' : 'transparent' }}>
                                    <span className="w-6 opacity-50" style={{ color: theme.textMuted }}>{100 + i}</span>
                                    <span className="w-36 font-bold" style={{ color: theme.primary }}>{skill.icon} {skill.name}</span>
                                    <div className="flex-1 h-3 rounded-sm overflow-hidden" style={{ background: 'rgba(0,255,65,0.1)' }}>
                                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${skill.level}%` }} transition={{ duration: 1, delay: i * 0.04 }}
                                            className="h-full relative" style={{ background: skill.level > 88 ? '#00ff41' : skill.level > 75 ? '#7fff00' : '#ffd700' }}>
                                            <span className="absolute right-1 top-0 text-[8px] font-black text-black leading-3">{skill.level > 40 ? '█'.repeat(Math.floor(skill.level / 10)) : ''}</span>
                                        </motion.div>
                                    </div>
                                    <span className="w-12 text-right font-bold" style={{ color: skill.level > 88 ? '#00ff41' : '#7fff00' }}>{skill.level}.0</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    <p className="mt-4 text-xs" style={{ color: `${theme.primary}50` }}>// Press [F5] to refresh · [q] to quit · CPU: 4.2% · RAM: 1.4GB</p>
                </motion.div>
            </div>
        </section>
    );
}

/* ── BRUTALIST: Clean numbered list ──────────────────────────────── */
function BrutalistSkills({ theme }) {
    const [active, setActive] = useState('All Skills');
    const filtered = active === 'All Skills' ? SKILLS : SKILLS.filter(s => s.category === active);
    return (
        <section id="skills" className="py-28" style={{ background: theme.bg }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="mb-10">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2"
                        style={{ fontFamily: theme.fontHeading, color: theme.text }}>SKILLS</h2>
                    <div className="h-1 w-20 mb-4" style={{ background: theme.primary }} />
                    <p className="text-sm" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>Core engineering capabilities</p>
                </div>
                {/* Category filter */}
                <div className="flex gap-2 flex-wrap mb-8">
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActive(cat)}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all"
                            style={{
                                background: active === cat ? theme.primary : 'transparent',
                                color: active === cat ? '#000' : theme.textMuted,
                                border: `1px solid ${active === cat ? theme.primary : `${theme.textMuted}30`}`,
                                fontFamily: theme.fontMono,
                            }}>
                            {cat}
                        </button>
                    ))}
                </div>
                {/* Clean list */}
                <div style={{ borderTop: `1px solid ${theme.primary}20` }}>
                    {filtered.map((skill, i) => (
                        <motion.div key={skill.name}
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                            className="flex items-center justify-between py-4 px-2 group transition-all hover:bg-white/[0.02]"
                            style={{ borderBottom: `1px solid ${theme.primary}15` }}>
                            <div className="flex items-center gap-5">
                                <span className="text-sm font-mono w-8 opacity-30" style={{ color: theme.textMuted }}>{String(i + 1).padStart(2, '0')}</span>
                                <span className="text-xl">{skill.icon}</span>
                                <span className="text-lg font-bold" style={{ color: theme.text, fontFamily: theme.fontHeading }}>{skill.name}</span>
                                <span className="text-xs px-2 py-0.5 hidden sm:inline-block" style={{ color: theme.textMuted, fontFamily: theme.fontMono, border: `1px solid ${theme.primary}20` }}>{skill.category}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-24 h-1 hidden sm:block" style={{ background: `${theme.primary}15` }}>
                                    <div className="h-full" style={{ width: `${skill.level}%`, background: theme.primary, transition: 'width 0.6s ease' }} />
                                </div>
                                <span className="text-sm font-bold font-mono" style={{ color: theme.primary }}>{skill.level}%</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function SkillsSection() {
    const { theme, themeKey } = useTheme();
    if (themeKey === 'minimal') return <MinimalSkills theme={theme} />;
    if (themeKey === 'terminal') return <TerminalSkills theme={theme} />;
    if (themeKey === 'brutalist') return <BrutalistSkills theme={theme} />;
    return <CyberSkills theme={theme} />;
}
