import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Container from '../layout/Container';
import SectionWrapper from '../layout/SectionWrapper';
import TimelineItem from '../ui/TimelineItem';

const MILESTONES = [
    { period: '2008 - 2018', title: 'Foundational Years', desc: 'The beginning of the journey. Cultivated a strong foundation in logic, mathematics, and science. This period was marked by an early fascination with how digital systems work.', tags: ['Logic', 'Mathematics'], icon: (<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>) },
    { period: '2018 - 2020', title: 'Higher Secondary', desc: 'Specialized in Science and Mathematics. Developed analytical thinking and problem-solving skills that would later become the core of my engineering career.', tags: ['Physics', 'Analytical Thinking'], icon: (<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>) },
    { period: '2020 - 2024', title: 'IIIT Bhubaneswar (B.Tech)', desc: 'Immersed in Computer Science Engineering. This phase defined my technical identity, mastering data structures, algorithms, and system design.', tags: ['DSA', 'System Design', 'DBMS'], icon: (<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>) },
    { period: '2023 - PRESENT', title: 'Major Projects', desc: 'Building Full-stack & AI solutions. Bridging the gap between conceptual theory and real-world deployment. Focused on scalable architectures and intuitive UX.', tags: ['React', 'Node.js', 'PyTorch'], icon: (<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.36c-5.91.03-9.74-9.26-9.74-9.26a6 6 0 017.36-5.84l.11.02c1.76-.04 4.09 1.14 5.25 2.3 1.16 1.16 2.34 3.49 2.3 5.25l.02.11z" /><path strokeLinecap="round" strokeLinejoin="round" d="M14 9l5-5c1.4-1.4 3.6-1.4 5 0s1.4 3.6 0 5l-5 5" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 15a2 2 0 11-4 0 2 2 0 014 0z" /></svg>) },
    { period: 'THE FUTURE', title: 'Technical Growth', desc: 'Continuous learning and mastery of emerging technologies. Currently exploring large language models, cloud-native architecture, and distributed systems.', tags: ['Cloud Native', 'LLMs', 'Web3'], icon: (<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>) },
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
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 font-sans" style={{ color: theme.primary }}>
                            My Evolution
                        </h2>
                        <p className="text-sm md:text-base max-w-xl font-medium leading-relaxed" style={{ color: theme.textMuted }}>
                            A chronicle of my academic path and technical progression. From basic curiosity to architecting complex AI-driven solutions.
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
                    <div className="flex flex-col relative z-10 w-full pt-4 space-y-24">
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