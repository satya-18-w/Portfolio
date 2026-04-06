import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { PROJECTS_BY_SLUG } from '../../lib/projectsData';

const fadeUp = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
};

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const project = PROJECTS_BY_SLUG[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center px-6" style={{ background: theme.bg, color: theme.text }}>
                <div className="text-center max-w-md">
                    <h1 className="text-5xl font-black mb-4" style={{ fontFamily: theme.fontHeading }}>Project Not Found</h1>
                    <p className="text-sm mb-8" style={{ color: theme.textMuted }}>
                        The requested project detail page is not available yet.
                    </p>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 rounded-md font-bold text-sm uppercase tracking-wider"
                        style={{ background: theme.primary, color: '#050505' }}
                    >
                        Back to Portfolio
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ background: '#050507', color: '#f5f5f5' }}>
            <section className="max-w-6xl mx-auto px-6 lg:px-12 pt-16 pb-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <button
                        onClick={() => navigate('/')}
                        className="px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider border"
                        style={{ borderColor: '#2a2a2a', color: '#d4d4d8' }}
                    >
                        Back
                    </button>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: theme.primary }}>
                        {project.category}
                    </span>
                </div>

                <motion.div initial="initial" animate="animate" variants={fadeUp} className="grid lg:grid-cols-[1.3fr_1fr] gap-10">
                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.92] mb-4" style={{ fontFamily: theme.fontHeading }}>
                            {project.title}
                        </h1>
                        <p className="text-base sm:text-lg leading-relaxed max-w-3xl" style={{ color: '#a1a1aa' }}>
                            {project.description}
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#1f1f22' }}>
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover min-h-[220px]" />
                    </div>
                </motion.div>
            </section>

            <section className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.article initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                        className="rounded-2xl p-6 border" style={{ borderColor: '#232328', background: '#0d0d10' }}>
                        <h2 className="text-lg font-black uppercase tracking-wide mb-3" style={{ color: '#f97316' }}>
                            Problem It Solves
                        </h2>
                        <p className="text-sm leading-relaxed" style={{ color: '#c4c4cc' }}>
                            {project.problemStatement}
                        </p>
                    </motion.article>

                    <motion.article initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                        className="rounded-2xl p-6 border" style={{ borderColor: '#232328', background: '#0d0d10' }}>
                        <h2 className="text-lg font-black uppercase tracking-wide mb-3" style={{ color: '#22c55e' }}>
                            Solution Approach
                        </h2>
                        <p className="text-sm leading-relaxed" style={{ color: '#c4c4cc' }}>
                            {project.solutionOverview}
                        </p>
                    </motion.article>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
                <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                    className="rounded-2xl p-6 border" style={{ borderColor: '#232328', background: '#0d0d10' }}>
                    <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: theme.primary }}>
                        Tech Stack Used
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {project.techStack.map((stack) => (
                            <span key={stack} className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider border"
                                style={{ borderColor: '#2f2f35', color: '#e4e4e7', background: '#141418' }}>
                                {stack}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </section>

            <section className="max-w-6xl mx-auto px-6 lg:px-12 py-10">
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.article initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                        className="rounded-2xl p-6 border" style={{ borderColor: '#232328', background: '#0d0d10' }}>
                        <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#60a5fa' }}>
                            Implementation Details
                        </h2>
                        <ul className="space-y-3">
                            {project.architecture.map((item) => (
                                <li key={item} className="text-sm leading-relaxed" style={{ color: '#c4c4cc' }}>
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </motion.article>

                    <motion.article initial="initial" whileInView="animate" viewport={{ once: true }} variants={fadeUp}
                        className="rounded-2xl p-6 border" style={{ borderColor: '#232328', background: '#0d0d10' }}>
                        <h2 className="text-lg font-black uppercase tracking-wide mb-4" style={{ color: '#facc15' }}>
                            Outcomes
                        </h2>
                        <ul className="space-y-3">
                            {project.outcomes.map((item) => (
                                <li key={item} className="text-sm leading-relaxed" style={{ color: '#c4c4cc' }}>
                                    • {item}
                                </li>
                            ))}
                        </ul>
                    </motion.article>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
                <div className="flex flex-wrap gap-3">
                    {project.github !== '#' && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 rounded-md text-xs font-black uppercase tracking-wider"
                            style={{ background: theme.primary, color: '#050505' }}
                        >
                            Source Code
                        </a>
                    )}
                    {project.live !== '#' && (
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3 rounded-md text-xs font-black uppercase tracking-wider border"
                            style={{ borderColor: '#2f2f35', color: '#e5e7eb' }}
                        >
                            Live Demo
                        </a>
                    )}
                    <Link
                        to="/"
                        className="px-5 py-3 rounded-md text-xs font-black uppercase tracking-wider border"
                        style={{ borderColor: '#2f2f35', color: '#e5e7eb' }}
                    >
                        Back to Portfolio
                    </Link>
                </div>
            </section>
        </div>
    );
}
