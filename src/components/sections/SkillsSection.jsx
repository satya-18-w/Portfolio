import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import TiltCard from '../ui/TiltCard';

const SKILL_CATEGORIES = [
    {
        id: '01',
        title: 'AI / ML',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        skills: ['Python', 'PyTorch', 'TensorFlow', 'LangChain', 'OpenAI API', 'HuggingFace'],
        color: '#00F5FF'
    },
    {
        id: '02',
        title: 'Backend Engineering',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
        ),
        skills: ['Go', 'Node.js', 'gRPC', 'REST APIs', 'WebSockets', 'Gin', 'Express'],
        color: '#8B5CF6'
    },
    {
        id: '03',
        title: 'Frontend Development',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        skills: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Three.js', 'Framer Motion'],
        color: '#00F5FF'
    },
    {
        id: '04',
        title: 'Database Systems',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
        ),
        skills: ['PostgreSQL', 'Redis', 'MongoDB', 'MySQL', 'DynamoDB', 'Elasticsearch'],
        color: '#8B5CF6'
    },
    {
        id: '05',
        title: 'DevOps & Cloud',
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
        ),
        skills: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Terraform', 'Linux', 'Git'],
        color: '#10B981'
    },
];

function SkillCard({ category, idx }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''}`}
        >
            <TiltCard
                className="group relative flex flex-col p-6 rounded-2xl h-full"
                style={{
                    background: 'linear-gradient(145deg, rgba(15,15,35,0.65) 0%, rgba(6,6,17,0.92) 100%)',
                    border: `1px solid rgba(255,255,255,0.06)`,
                }}
                intensity={8}
            >
                {/* Top corner accent dot */}
                <div
                    className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full opacity-60"
                    style={{ background: category.color }}
                />

                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-5">
                    <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ background: `${category.color}18`, color: category.color }}
                    >
                        {category.icon}
                    </div>
                    <div>
                        <span className="text-[10px] font-mono text-gray-600 tracking-[0.2em]">{category.id}</span>
                        <h3 className="text-base font-display font-bold text-white">{category.title}</h3>
                    </div>
                </div>

                {/* Skill tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {category.skills.map((skill, i) => (
                        <motion.span
                            key={skill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: idx * 0.1 + i * 0.04 }}
                            className="text-xs font-medium px-3 py-1.5 rounded-full"
                            style={{
                                background: `rgba(255,255,255,0.03)`,
                                border: `1px solid ${category.color}25`,
                                color: '#CBD5E1',
                            }}
                        >
                            {skill}
                        </motion.span>
                    ))}
                </div>

                {/* Bottom accent line on hover */}
                <div
                    className="absolute bottom-0 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${category.color}60, transparent)` }}
                />
            </TiltCard>
        </motion.div>
    );
}

export default function SkillsSection() {
    const { theme } = useTheme();

    return (
        <section
            id="skills"
            className="min-h-screen w-full relative py-24 lg:py-32 snap-section overflow-hidden"
            style={{ background: 'var(--bg-dark)' }}
        >
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div
                    className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08]"
                    style={{ background: theme.primary }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, margin: '-100px' }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <span className="block mb-4 text-xs font-mono tracking-[0.3em] uppercase" style={{ color: theme.secondary }}>
                        Capabilities
                    </span>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white tracking-tighter">
                        Technical <span className="gradient-text">Arsenal</span>
                    </h2>
                    <p className="mt-4 text-gray-500 text-base max-w-md mx-auto leading-relaxed">
                        A cross-disciplinary toolkit spanning AI/ML, distributed systems, and modern web development.
                    </p>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {SKILL_CATEGORIES.map((category, idx) => (
                        <SkillCard key={category.id} category={category} idx={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}
