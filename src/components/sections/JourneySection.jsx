import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Container from '../layout/Container';
import SectionWrapper from '../layout/SectionWrapper';
import TimelineItem from '../ui/TimelineItem';

const MILESTONES = [
    {
        period: '2005 - 2018 (Approx)',
        title: 'Early Learning Phase',
        institution: 'Saraswati Sishu Vidyamandir, Mainda, Jajpur, Odisha',
        desc: 'This phase laid the foundation of my academic journey, where curiosity and disciplined learning shaped my mindset. I developed strong fundamentals in mathematics, logic, and basic sciences, along with an early fascination for how systems work in the real world.',
        tags: ['FOUNDATIONS', 'DISCIPLINE', 'CURIOSITY'],
        icon: <span className="text-4xl md:text-5xl">📘</span>,
        photoUrl: 'https://www.google.com/search?tbm=isch&q=Saraswati+Sishu+Vidyamandir+Mainda+Jajpur+Odisha',
    },
    {
        period: '2018 - 2020',
        title: 'Secondary Education (Class 9-10)',
        institution: 'Baruneswar High School, Arei, Mainda, Jajpur, Odisha',
        desc: 'Focused on strengthening analytical thinking and problem-solving abilities. This phase sharpened my understanding of core subjects and introduced structured learning approaches that built confidence in tackling complex problems.',
        tags: ['ANALYTICAL THINKING', 'PROBLEM SOLVING', 'FUNDAMENTALS'],
        icon: <span className="text-4xl md:text-5xl">🏫</span>,
        photoUrl: 'https://www.google.com/search?tbm=isch&q=Baruneswar+High+School+Arei+Mainda+Jajpur+Odisha',
    },
    {
        period: '2020 - 2022',
        title: 'Higher Secondary (CHSE - Science)',
        institution: 'Excelsior +2 Science Residential College, Chhotraipur, Jajpur Road, Odisha',
        desc: 'Specialized in science with a focus on Physics, Chemistry, and Mathematics. Developed a strong analytical mindset and logical reasoning skills. This period played a crucial role in shaping my transition toward engineering and deep technical problem-solving.',
        tags: ['PHYSICS', 'MATHEMATICS', 'LOGICAL REASONING'],
        icon: <span className="text-4xl md:text-5xl">🧪</span>,
        photoUrl: 'https://www.google.com/search?tbm=isch&q=Excelsior+2+Science+Residential+College+Chhotraipur+Jajpur+Road+Odisha',
    },
    {
        period: '2022 - Present',
        title: 'B.Tech in Computer Science',
        institution: 'IIIT Bhubaneswar',
        desc: 'Currently pursuing Computer Science Engineering, where I built a strong foundation in Data Structures, Algorithms, DBMS, and System Design. This phase defined my technical identity and sparked my interest in building scalable systems, AI-driven applications, and distributed architectures. Actively working on real-world projects involving Machine Learning, Backend Engineering, and Distributed Systems, bridging theoretical knowledge with practical implementation.',
        tags: ['DSA', 'SYSTEM DESIGN', 'DBMS', 'BACKEND', 'AI/ML'],
        icon: <span className="text-4xl md:text-5xl">🎓</span>,
        photoUrl: 'https://www.google.com/search?tbm=isch&q=IIIT+Bhubaneswar+campus+photos',
    },
    {
        period: '2023 - Present',
        title: 'Major Projects & Technical Growth',
        institution: 'Independent + Academic Build Phase',
        desc: 'This phase represents my transition from learning to building real-world systems. I have designed and developed multiple impactful projects across domains such as AI, distributed systems, networking, and full-stack development.',
        bullets: [
            'Built MailMind, an AI-powered email assistant using LLMs',
            'Developed RapidRide, a scalable ride-booking system with microservices',
            'Created Uber Demand Prediction system using ML + MLOps',
            'Engineered a custom TCP-based chat protocol (low-level networking)',
            'Designed Todo Tasker, a full-stack productivity application',
            'Focused on production-grade backend systems, deep system design, and scalable architecture',
        ],
        tags: ['PROJECTS', 'DISTRIBUTED SYSTEMS', 'MACHINE LEARNING', 'BACKEND ENGINEERING'],
        icon: <span className="text-4xl md:text-5xl">🚀</span>,
        photoUrl: 'https://www.google.com/search?tbm=isch&q=software+engineering+projects+workspace+photos',
    },
];

export default function JourneySection() {
    const { theme } = useTheme();
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end end"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <SectionWrapper id="journey" ref={containerRef} className="relative mt-12 md:mt-24 pt-12 md:pt-24 overflow-hidden" style={{ background: theme.bg, color: theme.text }}>
            {/* Dot Grid Background matching the theme text color with 5% opacity */}
            <div className="absolute inset-0 z-0 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, ${theme.text}0D 1px, transparent 0)`, backgroundSize: '24px 24px' }} />

            <Container className="relative z-10 w-full max-w-6xl">
                {/* Header Sequence matching screenshot */}
                <div className="flex flex-col mb-24 lg:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4 font-sans" style={{ color: theme.primary }}>
                            My Evolution
                        </h2>
                        <p className="text-sm md:text-base max-w-xl font-medium leading-relaxed" style={{ color: theme.textMuted }}>
                            A journey from curiosity-driven learning to engineering scalable systems and AI-powered applications.
                        </p>
                    </motion.div>
                </div>

                {/* Timeline Architecture */}
                <div className="relative w-full pb-20">
                    {/* The Center Line track */}
                    <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ background: `linear-gradient(to bottom, ${theme.primary}80, ${theme.primary}40, transparent)` }} />

                    {/* The Animated Fill Line */}
                    <motion.div
                        className="absolute left-6 md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 origin-top"
                        style={{ height: lineHeight, background: `linear-gradient(to bottom, ${theme.primary}, ${theme.secondary || theme.primary})`, boxShadow: `0 0 10px ${theme.primary}66` }}
                    />

                    {/* Timeline Items */}
                    <div className="flex flex-col relative z-10 w-full pt-4 space-y-14 md:space-y-24">
                        {MILESTONES.map((milestone, i) => (
                            <TimelineItem
                                key={milestone.title}
                                milestone={milestone}
                                index={i}
                                isEven={i % 2 === 0}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </SectionWrapper>
    );
}