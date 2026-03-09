import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const TIMELINE = [
    {
        year: '2008 — 2019',
        title: 'Schooling',
        subtitle: 'Foundation Years',
        desc: 'Built core fundamentals. Early curiosity in computers, mathematics, and logical problem-solving that planted the seed for engineering.',
        icon: '🎓',
    },
    {
        year: '2019 — 2021',
        title: 'High School',
        subtitle: 'Science & Mathematics',
        desc: 'Deep dive into Physics & Mathematics. First exposure to programming through C/C++. Competitive exam preparation & JEE.',
        icon: '📚',
    },
    {
        year: '2022 — Present',
        title: 'IIIT Bhubaneswar',
        subtitle: 'B.Tech CSE · 6th Semester',
        desc: 'Specializing in Backend Engineering, Go, and Distributed Systems. Building production-grade projects. System design & cloud infra.',
        icon: '🚀',
    },
];

export default function JourneySection() {
    const { theme } = useTheme();

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section
            id="journey"
            className="h-screen w-screen relative overflow-hidden snap-section flex flex-col justify-center"
            style={{ background: 'var(--bg-secondary)' }}
        >
            <div className="max-w-6xl mx-auto w-full px-6 sm:px-10 md:px-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-10 md:mb-14"
                >
                    <span className="section-label block mb-3">Experience</span>
                    <h2 className="display-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter">
                        The<br />Journey
                    </h2>
                </motion.div>

                {/* Timeline rows */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                >
                    {TIMELINE.map((entry, i) => (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            className="group border-t border-white/[0.06] py-6 md:py-8"
                        >
                            <div className="flex items-start gap-4 md:gap-8">
                                {/* Icon badge */}
                                <div
                                    className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl md:text-2xl shrink-0 transition-all duration-500 group-hover:scale-110"
                                    style={{ background: `${theme.primary}10`, border: `1px solid ${theme.primary}15` }}
                                >
                                    {entry.icon}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 mb-2">
                                        <h3 className="text-lg md:text-2xl font-heading font-bold text-white group-hover:translate-x-1 transition-transform duration-500">
                                            {entry.title}
                                        </h3>
                                        <span
                                            className="text-[10px] font-mono font-semibold tracking-[0.15em] uppercase shrink-0"
                                            style={{ color: theme.primary }}
                                        >
                                            {entry.year}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-2 font-medium">{entry.subtitle}</p>
                                    <p className="text-sm text-slate-400 leading-relaxed max-w-xl">{entry.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    <div className="border-t border-white/[0.06]" />
                </motion.div>
            </div>
        </section>
    );
}
