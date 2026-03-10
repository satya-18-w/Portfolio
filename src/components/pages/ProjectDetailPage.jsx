import React, { Suspense, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';
import DemandHeatmap3D from '../three/DemandHeatmap3D';

/* ═══════════════════════════════════════════════════════════════════
   PROJECT DATA — expandable to more projects later
   ═══════════════════════════════════════════════════════════════════ */

const PROJECT_DATA = {
    'uber-demand-prediction': {
        title: 'Uber Demand Prediction',
        emoji: '🚕',
        subtitle: 'Intelligent Demand Forecasting for Ride-Hailing Systems',
        heroGradient: 'linear-gradient(135deg, #1a0533 0%, #0a1628 40%, #0d2137 100%)',
        accentColor: '#F59E0B',
        secondaryColor: '#8B5CF6',

        overview: 'A production-oriented machine learning and MLOps pipeline that predicts Uber ride demand using historical NYC taxi data. The system analyzes spatial and temporal patterns to recommend high-demand regions for drivers, improving ride allocation efficiency.',

        problem: {
            title: 'The Problem',
            items: [
                'Idle drivers in low-demand zones',
                'Longer customer wait times',
                'Inefficient fleet distribution',
                'Revenue loss from uneven demand-supply matching',
            ],
        },

        solution: {
            title: 'The Solution',
            items: [
                'Data ingestion from NYC yellow taxi datasets',
                'Feature engineering on temporal and spatial signals',
                'Model training for demand prediction',
                'Experiment tracking and model versioning',
                'Reproducible pipelines using DVC',
                'Containerized deployment using Docker',
            ],
        },

        pipeline: [
            { label: 'Raw Data', icon: '📦', desc: 'NYC taxi trip records' },
            { label: 'Ingestion', icon: '📥', desc: 'Data cleaning & validation' },
            { label: 'Feature Eng', icon: '⚙️', desc: 'Temporal + spatial features' },
            { label: 'Training', icon: '🧠', desc: 'ML model fitting' },
            { label: 'Evaluation', icon: '📊', desc: 'Metrics & validation' },
            { label: 'MLflow', icon: '📈', desc: 'Experiment tracking' },
            { label: 'DVC', icon: '🔄', desc: 'Pipeline versioning' },
            { label: 'Docker', icon: '🐳', desc: 'Containerized deploy' },
        ],

        features: [
            { title: 'Demand Forecasting', desc: 'Predict ride demand based on time, location, and historical trip patterns.', icon: '📊' },
            { title: 'Driver Optimization', desc: 'Identify high-demand zones where drivers should relocate for maximum earnings.', icon: '🗺️' },
            { title: 'Reproducible Pipelines', desc: 'Using DVC, the entire data pipeline can be reproduced consistently across environments.', icon: '🔄' },
            { title: 'Experiment Tracking', desc: 'MLflow tracks model versions, metrics, parameters, and artifacts automatically.', icon: '📈' },
            { title: 'Data Visualization', desc: 'Exploratory analysis and insights through visual dashboards and plots.', icon: '📉' },
            { title: 'Containerized Deploy', desc: 'Docker ensures consistent environments from development to production.', icon: '🐳' },
        ],

        insights: [
            'Peak demand during rush hours (7-9 AM, 5-7 PM)',
            'Increased demand in business districts on weekdays',
            'Strong correlation between time-of-day and ride demand',
            'Weekend nightlife zones show 3x demand spikes',
        ],

        techStack: {
            'Machine Learning': [
                { name: 'Python', icon: '🐍' },
                { name: 'Scikit-learn', icon: '🔬' },
                { name: 'Pandas', icon: '🐼' },
                { name: 'NumPy', icon: '🔢' },
            ],
            'MLOps': [
                { name: 'MLflow', icon: '📈' },
                { name: 'DVC', icon: '🔄' },
                { name: 'Docker', icon: '🐳' },
            ],
            'Visualization': [
                { name: 'Matplotlib', icon: '📊' },
                { name: 'Seaborn', icon: '🎨' },
                { name: 'Jupyter', icon: '📓' },
            ],
            'Monitoring': [
                { name: 'Grafana', icon: '📡' },
            ],
        },

        highlights: [
            'End-to-end ML pipeline',
            'Reproducible data workflows with DVC',
            'Experiment tracking with MLflow',
            'Containerized deployment with Docker',
            'Real-world dataset (NYC taxi trips)',
            'Production-style project structure',
        ],

        github: 'https://github.com/satya-18',
    },
};

/* ═══════════════════════════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════════════════════════ */

const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
};

const stagger = {
    animate: { transition: { staggerChildren: 0.08 } },
};

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function PipelineStep({ step, index, total, accent }) {
    return (
        <motion.div variants={fadeUp} className="flex flex-col items-center relative">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mb-3 relative z-10"
                style={{ background: `${accent}15`, border: `1px solid ${accent}40` }}>
                {step.icon}
            </div>
            <span className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accent }}>{step.label}</span>
            <span className="text-[10px] text-center max-w-[80px]" style={{ color: '#94a3b8' }}>{step.desc}</span>
            {index < total - 1 && (
                <div className="hidden md:block absolute top-8 left-[calc(100%+4px)] w-8 h-px" style={{ background: `${accent}40` }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-transparent" style={{ borderLeftColor: `${accent}60` }} />
                </div>
            )}
        </motion.div>
    );
}

function FeatureCard({ feature, accent }) {
    return (
        <motion.div variants={fadeUp}
            whileHover={{ y: -4, boxShadow: `0 8px 30px ${accent}15` }}
            className="p-6 rounded-2xl transition-all"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-3xl block mb-3">{feature.icon}</span>
            <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: '#94a3b8' }}>{feature.desc}</p>
        </motion.div>
    );
}

function TechCard({ name, icon, accent }) {
    return (
        <motion.div variants={fadeUp}
            whileHover={{ scale: 1.05, borderColor: `${accent}60` }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span className="text-xl">{icon}</span>
            <span className="text-sm font-bold text-white">{name}</span>
        </motion.div>
    );
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export default function ProjectDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const project = PROJECT_DATA[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ background: '#030014', color: '#fff' }}>
                <div className="text-center">
                    <h1 className="text-6xl font-black mb-4">404</h1>
                    <p className="text-gray-400 mb-8">Project not found</p>
                    <button onClick={() => navigate('/')} className="px-6 py-3 rounded-full font-bold" style={{ background: theme.primary, color: '#000' }}>
                        ← Back to Portfolio
                    </button>
                </div>
            </div>
        );
    }

    const accent = project.accentColor;

    return (
        <div className="min-h-screen" style={{ background: '#030014', color: '#fff' }}>
            {/* ── BACK BUTTON ──────────────────────────────────────────── */}
            <motion.button
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                onClick={() => navigate('/')}
                className="fixed top-6 left-6 z-50 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold backdrop-blur-lg transition-all hover:scale-105"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}>
                ← Portfolio
            </motion.button>

            {/* ════════════════════════════════════════════════════════════
                SECTION 1: CINEMATIC HERO
               ════════════════════════════════════════════════════════════ */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden"
                style={{ background: project.heroGradient }}>
                {/* Ambient glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-20" style={{ background: accent }} />
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] opacity-15" style={{ background: project.secondaryColor }} />
                </div>

                <motion.div initial="initial" animate="animate" variants={stagger} className="text-center relative z-10 px-6">
                    <motion.span variants={fadeUp} className="text-8xl block mb-6">{project.emoji}</motion.span>
                    <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter mb-4"
                        style={{ fontFamily: theme.fontHeading }}>
                        {project.title.split(' ').map((word, i) => (
                            <span key={i}>
                                {i === 0 ? word : <span style={{ background: `linear-gradient(135deg, ${accent}, ${project.secondaryColor})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}> {word}</span>}
                            </span>
                        ))}
                    </motion.h1>
                    <motion.p variants={fadeUp} className="text-lg md:text-xl max-w-2xl mx-auto mb-8" style={{ color: '#94a3b8' }}>
                        {project.subtitle}
                    </motion.p>
                    <motion.div variants={fadeUp} className="flex gap-4 justify-center">
                        <a href={project.github} target="_blank" rel="noopener noreferrer"
                            className="px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:scale-105"
                            style={{ background: accent, color: '#000' }}>
                            View on GitHub ↗
                        </a>
                        <a href="#overview"
                            className="px-8 py-3.5 rounded-full font-bold text-sm transition-all hover:bg-white/5"
                            style={{ border: `1px solid ${accent}60`, color: accent }}>
                            Explore ↓
                        </a>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full flex items-start justify-center pt-2"
                    style={{ border: `2px solid ${accent}40` }}>
                    <div className="w-1 h-2 rounded-full" style={{ background: accent }} />
                </motion.div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                SECTION 2: OVERVIEW + 3D HEATMAP
               ════════════════════════════════════════════════════════════ */}
            <section id="overview" className="py-24 lg:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text */}
                        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: accent }}>
                                Overview
                            </motion.span>
                            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-6" style={{ fontFamily: theme.fontHeading }}>
                                Predicting Where Riders Need Drivers
                            </motion.h2>
                            <motion.p variants={fadeUp} className="text-lg leading-relaxed mb-8" style={{ color: '#94a3b8' }}>
                                {project.overview}
                            </motion.p>
                            <motion.div variants={fadeUp} className="flex gap-6">
                                {[['64', 'NYC Zones'], ['8', 'ML Features'], ['95%', 'Accuracy']].map(([num, label]) => (
                                    <div key={label}>
                                        <span className="text-3xl font-black" style={{ color: accent }}>{num}</span>
                                        <span className="text-xs block mt-1" style={{ color: '#64748b' }}>{label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </motion.div>
                        {/* 3D Demand Heatmap */}
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }} transition={{ duration: 0.8 }}
                            className="relative rounded-3xl overflow-hidden" style={{ height: '450px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <Canvas camera={{ position: [4, 5, 6], fov: 45 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
                                <Suspense fallback={null}>
                                    <DemandHeatmap3D />
                                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} enablePan={false} maxPolarAngle={Math.PI / 2.5} minPolarAngle={Math.PI / 6} />
                                </Suspense>
                            </Canvas>
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4 py-2 rounded-xl"
                                style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}>
                                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: accent }}>3D Demand Heatmap · NYC Zones</span>
                                <span className="text-[10px]" style={{ color: '#64748b' }}>Drag to rotate</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                SECTION 3: PROBLEM → SOLUTION
               ════════════════════════════════════════════════════════════ */}
            <section className="py-24" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Problem */}
                        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}
                            className="p-8 rounded-3xl" style={{ background: 'rgba(239,68,68,0.04)', border: '1px solid rgba(239,68,68,0.15)' }}>
                            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: '#ef4444' }}>
                                🔴 {project.problem.title}
                            </motion.span>
                            <motion.div variants={stagger} className="space-y-4">
                                {project.problem.items.map((item, i) => (
                                    <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                                        <span className="text-red-400 text-lg mt-0.5">✕</span>
                                        <span className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Solution */}
                        <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}
                            className="p-8 rounded-3xl" style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.15)' }}>
                            <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: '#22c55e' }}>
                                🟢 {project.solution.title}
                            </motion.span>
                            <motion.div variants={stagger} className="space-y-4">
                                {project.solution.items.map((item, i) => (
                                    <motion.div key={i} variants={fadeUp} className="flex items-start gap-3">
                                        <span className="text-green-400 text-lg mt-0.5">✓</span>
                                        <span className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{item}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                SECTION 4: PIPELINE ARCHITECTURE
               ════════════════════════════════════════════════════════════ */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: accent }}>Architecture</motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: theme.fontHeading }}>
                            ML Pipeline Flow
                        </motion.h2>
                    </motion.div>
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}
                        className="flex flex-wrap justify-center gap-6 md:gap-4">
                        {project.pipeline.map((step, i) => (
                            <PipelineStep key={step.label} step={step} index={i} total={project.pipeline.length} accent={accent} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                SECTION 5: KEY FEATURES
               ════════════════════════════════════════════════════════════ */}
            <section className="py-24" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: accent }}>Capabilities</motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: theme.fontHeading }}>
                            Key Features
                        </motion.h2>
                    </motion.div>
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {project.features.map(f => (
                            <FeatureCard key={f.title} feature={f} accent={accent} />
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                SECTION 6: INSIGHTS
               ════════════════════════════════════════════════════════════ */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: accent }}>
                            Data Insights
                        </motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-12" style={{ fontFamily: theme.fontHeading }}>
                            What the Model Reveals
                        </motion.h2>
                        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.insights.map((insight, i) => (
                                <motion.div key={i} variants={fadeUp}
                                    className="flex items-center gap-4 p-5 rounded-2xl transition-all hover:bg-white/[0.02]"
                                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <span className="text-2xl font-black shrink-0" style={{ color: accent }}>{String(i + 1).padStart(2, '0')}</span>
                                    <span className="text-sm leading-relaxed" style={{ color: '#d1d5db' }}>{insight}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                SECTION 7: TECH STACK
               ════════════════════════════════════════════════════════════ */}
            <section className="py-24" style={{ background: 'rgba(255,255,255,0.01)' }}>
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger} className="text-center mb-16">
                        <motion.span variants={fadeUp} className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: accent }}>Technologies</motion.span>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl font-black tracking-tight" style={{ fontFamily: theme.fontHeading }}>
                            Tech Stack
                        </motion.h2>
                    </motion.div>
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {Object.entries(project.techStack).map(([category, techs]) => (
                            <motion.div key={category} variants={fadeUp}>
                                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: accent }}>{category}</h3>
                                <div className="space-y-3">
                                    {techs.map(t => <TechCard key={t.name} {...t} accent={accent} />)}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════════════════
                SECTION 8: HIGHLIGHTS + CTA
               ════════════════════════════════════════════════════════════ */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <motion.div initial="initial" whileInView="animate" viewport={{ once: true }} variants={stagger}>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-black tracking-tight mb-12" style={{ fontFamily: theme.fontHeading }}>
                            Project Highlights
                        </motion.h2>
                        <motion.div variants={stagger} className="flex flex-wrap justify-center gap-3 mb-12">
                            {project.highlights.map(h => (
                                <motion.span key={h} variants={fadeUp}
                                    className="px-5 py-2.5 rounded-full text-sm font-bold"
                                    style={{ background: `${accent}12`, border: `1px solid ${accent}30`, color: accent }}>
                                    ✔ {h}
                                </motion.span>
                            ))}
                        </motion.div>
                        <motion.div variants={fadeUp} className="flex gap-4 justify-center">
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="px-10 py-4 rounded-full font-bold text-sm transition-all hover:scale-105"
                                style={{ background: accent, color: '#000' }}>
                                View on GitHub ↗
                            </a>
                            <button onClick={() => navigate('/')}
                                className="px-10 py-4 rounded-full font-bold text-sm transition-all hover:bg-white/5"
                                style={{ border: `1px solid ${accent}60`, color: accent }}>
                                ← Back to Portfolio
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Footer spacer */}
            <div className="h-12" />
        </div>
    );
}
