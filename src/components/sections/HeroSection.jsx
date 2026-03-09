import React, { useRef, Suspense, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import AvatarModel from '../three/AvatarModel';
import useTypewriter from '../../hooks/useTypewriter';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import FloatingParticles from '../three/FloatingParticles';

function AvatarScene({ mousePos }) {
    const { theme } = useTheme();
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[3, 5, 5]} intensity={1.4} color="#ffffff" />
            <pointLight position={[-4, 3, 4]} intensity={0.8} color={theme.primary} distance={18} />
            <pointLight position={[4, -2, 3]} intensity={0.5} color={theme.secondary} distance={14} />

            <Suspense fallback={null}>
                <AvatarModel mousePos={mousePos} />
            </Suspense>

            <FloatingParticles count={60} spread={20} />

            <EffectComposer>
                <Bloom luminanceThreshold={0.3} luminanceSmoothing={0.9} intensity={0.5} mipmapBlur />
            </EffectComposer>
        </>
    );
}

export default function HeroSection() {
    const { theme } = useTheme();
    const mousePos = useRef({ x: 0, y: 0 });

    // Typewriter effect
    const roles = ['AI Engineer', 'Backend Developer', 'Distributed Systems Engineer'];
    const role = useTypewriter(roles, 80, 40, 2500);

    const handleMouseMove = useCallback((e) => {
        mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mousePos.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }, []);

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section
            id="hero"
            className="relative w-full min-h-screen flex items-center justify-center overflow-hidden snap-section"
            onMouseMove={handleMouseMove}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.2]"
                    style={{ background: theme.primary }}
                />
                <div
                    className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.2]"
                    style={{ background: theme.secondary }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 flex flex-col-reverse lg:flex-row items-center justify-between mt-16 md:mt-0 h-full w-full">

                {/* ── LEFT COLUMN (Content) ── */}
                <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                    className="w-full lg:w-[55%] flex flex-col justify-center pt-8 lg:pt-0"
                >
                    <motion.div variants={fadeUp} className="mb-4">
                        <span className="text-sm md:text-md uppercase tracking-[0.3em] font-semibold" style={{ color: theme.secondary }}>
                            Welcome to my universe
                        </span>
                    </motion.div>

                    <motion.h1 variants={fadeUp} className="font-display text-5xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tighter mb-4">
                        Satyajit<br />
                        <span className="gradient-text">Samal</span>
                    </motion.h1>

                    <motion.div variants={fadeUp} className="h-10 sm:h-12 mb-6">
                        <h2 className="text-xl sm:text-2xl font-mono text-gray-300">
                            {role}<span className="animate-pulse" style={{ color: theme.primary }}>_</span>
                        </h2>
                    </motion.div>

                    <motion.p variants={fadeUp} className="text-gray-400 text-lg max-w-lg mb-10 leading-relaxed">
                        A full-stack developer passionate about building distributed systems and scalable backends.
                        I construct the invisible machinery that powers the future of intelligent architecture.
                    </motion.p>

                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center">
                        {/* Glow Button */}
                        <a
                            href="#projects"
                            className="relative w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 rounded-full"
                            style={{
                                background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
                                boxShadow: `0 0 20px -5px ${theme.primary}`
                            }}
                        >
                            <span className="absolute inset-0 w-full h-full bg-white opacity-0 hover:opacity-20 rounded-full transition-opacity"></span>
                            View Projects
                        </a>

                        {/* Glass Outline Button */}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto inline-flex glass items-center justify-center px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 rounded-full border hover:bg-white/5"
                            style={{ borderColor: theme.primary }}
                        >
                            Download Resume
                        </a>

                        <a
                            href="#contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-gray-300 transition-all duration-300 rounded-full hover:text-white"
                        >
                            Contact
                        </a>
                    </motion.div>
                </motion.div>

                {/* ── RIGHT COLUMN (3D Avatar) ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="w-full lg:w-[45%] h-[350px] md:h-[500px] lg:h-[600px] relative mt-10 lg:mt-0"
                >
                    {/* Radial Glow Container behind the avatar */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div
                            className="w-[80%] h-[80%] rounded-full opacity-30 blur-[60px]"
                            style={{ background: `radial-gradient(circle, ${theme.secondary} 0%, transparent 70%)` }}
                        />
                    </div>

                    <div className="absolute inset-0 cursor-grab active:cursor-grabbing z-10 block">
                        <Canvas
                            camera={{ position: [0, 0.8, 4.2], fov: 52 }}
                            gl={{ antialias: true, alpha: true }}
                            dpr={[1, 1.5]}
                        >
                            <AvatarScene mousePos={mousePos} />
                        </Canvas>
                    </div>
                </motion.div>

            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-[1px] h-8"
                    style={{ background: `linear-gradient(to bottom, ${theme.primary}, transparent)` }}
                />
            </motion.div>
        </section>
    );
}
