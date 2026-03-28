import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SkillCard from '../ui/SkillCard';
import SectionWrapper from '../layout/SectionWrapper';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['All Skills', 'Frontend & UI', 'Backend & APIs', 'AI & ML', 'Databases', 'DevOps & Cloud', 'Tools'];

const CATEGORY_ICONS = {
    'All Skills': '✦', 'Frontend & UI': '🎨', 'Backend & APIs': '⚙',
    'AI & ML': '🧠', 'Databases': '🗄', 'DevOps & Cloud': '☁', 'Tools': '🛠'
};

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

// ══════════════════════════════════════════════════════════════════════
// THEME STYLE MAP — drives all visual differences from a single layout
// ══════════════════════════════════════════════════════════════════════
const PLAYGROUND_STYLES = {
    cyber: {
        headerTitle: (<>Skills{' '}<span className="inline-block shrink-0 mt-4 px-6 md:px-8 py-2 border-4 border-black rounded-full shadow-[8px_8px_0px_#000] rotate-2 bg-[#FAEDCD] text-wrap">Playground</span></>),
        subtitle: 'Toss the cards around. Watch them bounce.',
        subtitleClass: 'text-black text-sm md:text-xl font-bold max-w-xl mx-auto border-2 border-black inline-block px-6 py-2 rounded-full shadow-[4px_4px_0px_#000] bg-white',
        headingClass: 'text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter uppercase leading-[0.85]',
        sidebarBtnBorder: '4px solid #000',
        sidebarBtnBgActive: '#E0FBFC',
        sidebarBtnBgDefault: '#fff',
        sidebarBtnColor: '#000',
        sidebarBtnShadowActive: '4px 4px 0px #000',
        sidebarBtnShadowDefault: '8px 8px 0px #000',
        sidebarBtnRadius: '9999px',
        sidebarBtnClass: 'text-sm lg:text-base font-black uppercase tracking-widest',
        gridBg: '#fff',
        gridBorder: '4px solid #000',
        gridShadow: '16px 16px 0px #000',
        gridRadius: '3rem',
        gridPattern: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
        gridPatternSize: '40px 40px',
        gridPatternOpacity: 0.2,
    },
    minimal: {
        headerTitle: (<>Core <span style={{ color: '#e85d04' }}>Expertise</span></>),
        subtitle: 'Advanced technical proficiencies across the full engineering stack.',
        subtitleClass: 'text-sm md:text-base max-w-xl font-medium',
        headingClass: 'text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter',
        sidebarBtnBorder: '2px solid rgba(232,93,4,0.18)',
        sidebarBtnBgActive: '#e85d04',
        sidebarBtnBgDefault: 'transparent',
        sidebarBtnColorActive: '#fff',
        sidebarBtnColor: '#6b6b6b',
        sidebarBtnShadowActive: 'none',
        sidebarBtnShadowDefault: 'none',
        sidebarBtnRadius: '9999px',
        sidebarBtnClass: 'text-sm font-bold',
        gridBg: '#f8f4f0',
        gridBorder: '2px solid rgba(232,93,4,0.18)',
        gridShadow: '0 4px 20px rgba(0,0,0,0.06)',
        gridRadius: '2rem',
        gridPattern: `radial-gradient(circle at 2px 2px, rgba(232,93,4,0.08) 1px, transparent 0)`,
        gridPatternSize: '24px 24px',
        gridPatternOpacity: 1,
    },
    terminal: {
        headerTitle: (<><span style={{ color: '#00ff41' }}>$</span> skill_matrix</>),
        subtitle: 'Scanning neural stack... modules loaded.',
        subtitleClass: 'text-xs font-mono',
        headingClass: 'text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter font-mono',
        sidebarBtnBorder: '1px solid rgba(0,255,65,0.3)',
        sidebarBtnBgActive: 'rgba(0,255,65,0.15)',
        sidebarBtnBgDefault: 'transparent',
        sidebarBtnColorActive: '#00ff41',
        sidebarBtnColor: '#4caf50',
        sidebarBtnShadowActive: 'none',
        sidebarBtnShadowDefault: 'none',
        sidebarBtnRadius: '0.25rem',
        sidebarBtnClass: 'text-xs font-mono font-bold',
        gridBg: 'rgba(0,255,65,0.03)',
        gridBorder: '1px solid rgba(0,255,65,0.3)',
        gridShadow: '0 0 30px rgba(0,255,65,0.08)',
        gridRadius: '1rem',
        gridPattern: `repeating-linear-gradient(0deg, rgba(0,255,65,0.04) 0px, rgba(0,255,65,0.04) 1px, transparent 1px, transparent 4px)`,
        gridPatternSize: '100% 100%',
        gridPatternOpacity: 1,
    },
    brutalist: {
        headerTitle: (<>SKILLS</>),
        subtitle: 'Core engineering capabilities',
        subtitleClass: 'text-sm font-mono',
        headingClass: 'text-5xl md:text-7xl font-black tracking-tighter',
        sidebarBtnBorder: '1px solid rgba(255,77,0,0.4)',
        sidebarBtnBgActive: '#FF4D00',
        sidebarBtnBgDefault: 'transparent',
        sidebarBtnColorActive: '#000',
        sidebarBtnColor: '#888',
        sidebarBtnShadowActive: 'none',
        sidebarBtnShadowDefault: 'none',
        sidebarBtnRadius: '0.25rem',
        sidebarBtnClass: 'text-xs font-bold uppercase tracking-wider font-mono',
        gridBg: 'rgba(255,255,255,0.02)',
        gridBorder: '1px solid rgba(255,255,255,0.15)',
        gridShadow: 'none',
        gridRadius: '0.25rem',
        gridPattern: `repeating-linear-gradient(45deg, rgba(255,77,0,0.05) 0px, rgba(255,77,0,0.05) 1px, transparent 1px, transparent 8px)`,
        gridPatternSize: '100% 100%',
        gridPatternOpacity: 1,
    },
};

// ══════════════════════════════════════════════════════════════════════
// UNIFIED PLAYGROUND — single layout, all themes
// ══════════════════════════════════════════════════════════════════════
function UnifiedSkillsPlayground({ theme, themeKey }) {
    const [activeCategory, setActiveCategory] = useState('All Skills');
    const filtered = activeCategory === 'All Skills' ? SKILLS : SKILLS.filter(s => s.category === activeCategory);
    const constraintsRef = useRef(null);
    const sectionRef = useRef(null);
    const headerRef = useRef(null);

    const s = PLAYGROUND_STYLES[themeKey] || PLAYGROUND_STYLES.cyber;

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
                {/* ── HEADER ─────────────────────────────────────── */}
                <div ref={headerRef} className="text-left md:text-center mb-16 md:mb-24">
                    <h2 className={`${s.headingClass} z-10 relative`} style={{ fontFamily: theme.fontHeading, color: theme.text }}>
                        {s.headerTitle}
                    </h2>
                    <div className="mt-12 md:mt-16 lg:mt-20 relative z-20">
                        <p className={s.subtitleClass} style={{ color: theme.textMuted }}>
                            {s.subtitle}
                        </p>
                    </div>
                </div>

                {/* ── SIDEBAR + GRID ─────────────────────────────── */}
                <div className="flex flex-col lg:flex-row gap-8 mt-12">
                    {/* Filter Sidebar */}
                    <div className="flex flex-row lg:flex-col gap-3 min-w-[200px] shrink-0 overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
                        {CATEGORIES.map(cat => {
                            const isActive = activeCategory === cat;
                            return (
                                <button key={cat} onClick={() => setActiveCategory(cat)}
                                    className={`flex items-center gap-3 px-5 py-3 text-left transition-all whitespace-nowrap lg:whitespace-normal ${s.sidebarBtnClass}`}
                                    style={{
                                        border: s.sidebarBtnBorder,
                                        borderRadius: s.sidebarBtnRadius,
                                        background: isActive ? s.sidebarBtnBgActive : s.sidebarBtnBgDefault,
                                        color: isActive ? (s.sidebarBtnColorActive || s.sidebarBtnColor) : s.sidebarBtnColor,
                                        boxShadow: isActive ? s.sidebarBtnShadowActive : s.sidebarBtnShadowDefault,
                                    }}
                                >
                                    <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
                                    <span>{cat}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Grid/Physics container */}
                    <div ref={constraintsRef} className="flex-1 relative min-h-[520px] overflow-hidden"
                        style={{
                            background: s.gridBg,
                            border: s.gridBorder,
                            boxShadow: s.gridShadow,
                            borderRadius: s.gridRadius,
                        }}
                    >
                        {/* Background pattern */}
                        <div className="absolute inset-0 pointer-events-none z-0"
                            style={{
                                backgroundImage: s.gridPattern,
                                backgroundSize: s.gridPatternSize,
                                opacity: s.gridPatternOpacity,
                            }} />

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6 p-3 sm:p-5 lg:p-8 relative z-10">
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

export default function SkillsSection() {
    const { theme, themeKey } = useTheme();
    return <UnifiedSkillsPlayground theme={theme} themeKey={themeKey} />;
}
