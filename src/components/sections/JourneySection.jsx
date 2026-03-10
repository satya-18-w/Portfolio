import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
    { period: '2008–2018', label: 'FOUNDATION', title: 'Foundational Years', desc: 'Logic, mathematics, science. An early fascination with how digital systems work.', tags: ['Logic', 'Mathematics', 'Science'], icon: '🌱' },
    { period: '2018–2020', label: 'HIGHER SECONDARY', title: 'Higher Secondary', desc: 'Science and Mathematics. Analytical thinking and problem-solving foundations.', tags: ['Physics', 'Analytical Thinking'], icon: '⚗' },
    { period: '2020–2024', label: 'UNIVERSITY', title: 'IIIT Bhubaneswar — B.Tech CSE', desc: 'Mastering DSA, system design, databases, and computer networks. Defined my technical identity.', tags: ['DSA', 'System Design', 'DBMS', 'Networks'], icon: '🏛' },
    { period: '2023–NOW', label: 'MAJOR PROJECTS', title: 'Major Projects', desc: 'Building Full-stack & AI solutions. From RAG systems to distributed ride-share engines.', tags: ['Go', 'Python', 'LangChain', 'AWS'], icon: '🚀' },
    { period: 'FUTURE', label: 'GROWTH', title: 'Continuous Growth', desc: 'LLMs, cloud-native architecture, distributed systems at planetary scale.', tags: ['LLMs', 'Cloud Native', 'Web3'], icon: '📡' },
];

/* ── CYBER: Clean alternating timeline ──────────────────────────── */
function CyberJourney({ theme }) {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const milestoneRefs = useRef([]);

    React.useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(lineRef.current,
                { height: '0%' },
                {
                    height: '100%',
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                        end: 'bottom 50%',
                        scrub: true,
                    }
                }
            );

            milestoneRefs.current.forEach((el) => {
                if (!el) return;
                const dot = el.querySelector('.milestone-dot');
                const card = el.querySelector('.milestone-card');

                gsap.fromTo([dot, card],
                    { opacity: 0, scale: 0.92, y: 40 },
                    {
                        opacity: 1, scale: 1, y: 0,
                        duration: 0.7,
                        stagger: 0.08,
                        ease: 'back.out(1.4)',
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 75%',
                        }
                    }
                );
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const CARD_COLORS = ['#FAEDCD', '#E0FBFC', '#FEFAE0', '#E0FBFC', '#FAEDCD'];

    return (
        <section id="journey" ref={sectionRef} className="py-24 md:py-32 overflow-hidden" style={{ background: theme.bg, color: theme.text }}>
            <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">

                {/* Section Header */}
                <div className="mb-16 md:mb-24 text-center flex flex-col items-center gap-6">
                    <span className="inline-block px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest border-2 border-black w-max shadow-[3px_3px_0px_#000] bg-[#FEFAE0]"
                        style={{ color: '#000', fontFamily: theme.fontMono }}>
                        Experience
                    </span>

                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85]"
                        style={{ fontFamily: theme.fontHeading, color: '#000' }}>
                        My{' '}
                        <span className="inline-block px-6 md:px-8 py-2 border-3 border-black rounded-full shadow-[6px_6px_0px_#000] -rotate-2 bg-[#E0FBFC]">
                            Journey
                        </span>
                    </h2>

                    <p className="text-sm md:text-base font-medium mt-2 max-w-md" style={{ color: '#555' }}>
                        Every step led here — an architect of intelligent systems.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Background line */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2"
                        style={{ background: 'rgba(0,0,0,0.12)' }} />
                    {/* Animated fill line */}
                    <div ref={lineRef} className="absolute left-6 md:left-1/2 top-0 w-0.5 md:-translate-x-1/2"
                        style={{ background: '#000', height: '0%' }} />

                    <div className="space-y-12 md:space-y-16">
                        {MILESTONES.map((m, i) => {
                            const isLeft = i % 2 === 0;
                            const cardColor = CARD_COLORS[i % CARD_COLORS.length];

                            return (
                                <div key={m.period} ref={el => milestoneRefs.current[i] = el}
                                    className="relative flex items-start md:items-center">

                                    {/* Timeline Dot */}
                                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
                                        <div className="milestone-dot w-5 h-5 rounded-full border-2 border-black bg-white shadow-[2px_2px_0px_#000]" />
                                    </div>

                                    {/* Card — mobile: always right of line, desktop: alternating */}
                                    <div className={`ml-14 md:ml-0 w-full md:w-[46%] ${isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                                        <div className="milestone-card p-6 md:p-8 rounded-2xl border-2 border-black shadow-[6px_6px_0px_#000] transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
                                            style={{ background: cardColor }}>

                                            <div className="flex items-center gap-3 mb-4">
                                                <span className="text-2xl md:text-3xl shrink-0">{m.icon}</span>
                                                <span className="text-[10px] md:text-xs font-black font-mono tracking-widest px-3 py-1.5 border-2 border-black shadow-[2px_2px_0px_#000] bg-white rounded-full uppercase"
                                                    style={{ color: '#000' }}>
                                                    {m.period}
                                                </span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-black uppercase leading-tight mb-3"
                                                style={{ fontFamily: theme.fontHeading, color: '#000' }}>
                                                {m.title}
                                            </h3>

                                            <p className="text-sm leading-relaxed mb-4" style={{ color: '#333' }}>
                                                {m.desc}
                                            </p>

                                            <div className="flex flex-wrap gap-2">
                                                {m.tags.map(t => (
                                                    <span key={t} className="px-3 py-1 text-[10px] font-bold uppercase rounded-full border border-black/30 bg-white/70"
                                                        style={{ color: '#000' }}>
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── MINIMAL: Horizontal orange progress road ────────────────────── */
function MinimalJourney({ theme }) {
    return (
        <section id="journey" className="py-28 overflow-x-hidden" style={{ background: theme.bg, color: theme.text }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16">
                    <h2 className="text-7xl md:text-9xl font-black tracking-tighter" style={{ fontFamily: theme.fontHeading }}>
                        My <span style={{ color: theme.primary }}>Journey</span>
                    </h2>
                    <p className="mt-4 text-lg" style={{ color: theme.textMuted }}>Every step led here — an architect of intelligent systems.</p>
                    <div className="h-1 w-20 mt-6" style={{ background: theme.primary }} />
                </motion.div>
                {/* Horizontal scroll timeline */}
                <div className="relative mb-8">
                    <div className="h-1 w-full" style={{ background: `${theme.primary}30` }} />
                    <div className="absolute top-0 left-0 h-1" style={{ background: theme.primary, width: '80%' }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {MILESTONES.map((m, i) => (
                        <motion.div key={m.period}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="relative p-5 rounded-2xl group hover:shadow-xl transition-all"
                            style={{ background: 'white', border: `2px solid ${theme.surfaceBorder}` }}
                            onMouseEnter={e => e.currentTarget.style.borderColor = theme.primary}
                            onMouseLeave={e => e.currentTarget.style.borderColor = theme.surfaceBorder}>
                            <div className="text-3xl mb-3">{m.icon}</div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: theme.primary, fontFamily: theme.fontMono }}>{m.period}</p>
                            <h3 className="font-black text-sm mb-2" style={{ fontFamily: theme.fontHeading, color: theme.text }}>{m.title}</h3>
                            <p className="text-xs leading-relaxed mb-3" style={{ color: theme.textMuted }}>{m.desc}</p>
                            <div className="flex flex-wrap gap-1">{m.tags.slice(0, 2).map(t => <span key={t} className="px-2 py-0.5 text-[9px] rounded-full" style={{ background: `${theme.primary}15`, color: theme.primary }}>{t}</span>)}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── TERMINAL: git log style ─────────────────────────────────────── */
function TerminalJourney({ theme }) {
    return (
        <section id="journey" className="py-20" style={{ background: '#000', color: theme.text, fontFamily: theme.fontMono }}>
            <div className="max-w-4xl mx-auto px-6">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <p style={{ color: theme.primary }}>$ git log --all --oneline --graph --author=satyajit</p>
                    <p className="text-xs mb-6 mt-1" style={{ color: theme.textMuted }}>Tracing commit history of Satyajit Samal...</p>
                    {MILESTONES.map((m, i) => (
                        <motion.div key={m.period} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            className="flex gap-4 mb-0">
                            <div className="flex flex-col items-center">
                                <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ background: i === 3 ? '#ffd700' : theme.primary, boxShadow: `0 0 8px ${theme.primary}` }} />
                                {i < MILESTONES.length - 1 && <div className="w-px flex-1 min-h-[80px]" style={{ background: `${theme.primary}30` }} />}
                            </div>
                            <div className="pb-10">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-[10px] px-2 py-0.5" style={{ background: `${theme.primary}15`, color: theme.primary }}>commit {Math.random().toString(16).slice(2, 9)}</span>
                                    {i === 3 && <span className="text-[10px] px-2 py-0.5 font-bold" style={{ background: '#ffd700', color: '#000' }}>{'HEAD -> main'}</span>}
                                </div>
                                <p className="text-xs mb-0.5" style={{ color: theme.textMuted }}>{'Author: Satyajit Samal <satya@iiitbbs.ac.in>'}</p>
                                <p className="text-xs mb-2" style={{ color: theme.textMuted }}>Date: {m.period}</p>
                                <p className="font-bold mb-1 text-sm" style={{ color: theme.primary }}>{m.title}</p>
                                <p className="text-xs leading-relaxed mb-2" style={{ color: theme.text }}>{m.desc}</p>
                                <p className="text-[10px]" style={{ color: `${theme.primary}60` }}>
                                    +{m.tags.join(' +')}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    <p className="text-xs" style={{ color: `${theme.primary}50` }}>{'// End of git log · SS_CORE_SYSTEMS · v2.0.0'}</p>
                </motion.div>
            </div>
        </section>
    );
}

/* ── BRUTALIST: Clean vertical list ─────────────────────────────── */
function BrutalistJourney({ theme }) {
    return (
        <section id="journey" className="py-24" style={{ background: theme.bg }}>
            <div className="max-w-6xl mx-auto px-6 lg:px-16">
                <div className="mb-12">
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-2"
                        style={{ fontFamily: theme.fontHeading, color: theme.text }}>STORY</h2>
                    <div className="h-1 w-20 mb-4" style={{ background: theme.primary }} />
                    <p className="text-sm" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>Growth timeline</p>
                </div>
                <div style={{ borderTop: `1px solid ${theme.primary}20` }}>
                    {MILESTONES.map((m, i) => (
                        <motion.div key={m.period}
                            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="flex gap-6 py-6 transition-all hover:bg-white/[0.02]"
                            style={{ borderBottom: `1px solid ${theme.primary}15`, borderLeft: `3px solid ${theme.primary}40`, paddingLeft: '1.5rem' }}>
                            <div className="text-3xl shrink-0">{m.icon}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: theme.primary, fontFamily: theme.fontMono }}>{m.period}</span>
                                </div>
                                <h3 className="text-xl font-black mb-1" style={{ fontFamily: theme.fontHeading, color: theme.text }}>{m.title}</h3>
                                <p className="text-sm leading-relaxed mb-3" style={{ color: theme.textMuted }}>{m.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {m.tags.map(t => <span key={t} className="px-2 py-0.5 text-[10px] font-mono" style={{ border: `1px solid ${theme.primary}30`, color: theme.primary }}>{t}</span>)}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default function JourneySection() {
    const { theme, themeKey } = useTheme();
    if (themeKey === 'minimal') return <MinimalJourney theme={theme} />;
    if (themeKey === 'terminal') return <TerminalJourney theme={theme} />;
    if (themeKey === 'brutalist') return <BrutalistJourney theme={theme} />;
    return <CyberJourney theme={theme} />;
}