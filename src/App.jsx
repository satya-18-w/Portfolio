import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Loader from './components/ui/Loader';
import Navbar from './components/ui/Navbar';
import NeonSwitch from './components/ui/NeonSwitch';
import { Canvas } from '@react-three/fiber';
import FloatingParticles from './components/three/FloatingParticles';
import FloatingShapes from './components/three/FloatingShapes';

const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const JourneySection = lazy(() => import('./components/sections/JourneySection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));

function AppContent() {
    const [loading, setLoading] = useState(true);

    useSmoothScroll();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative noise-overlay">
            {/* 3D Global Background Canvas */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 10]} intensity={1} />
                    <FloatingParticles count={200} />
                    <FloatingShapes />
                </Canvas>
            </div>

            <AnimatePresence mode="wait">
                {loading && <Loader key="loader" />}
            </AnimatePresence>

            {!loading && (
                <>
                    <Navbar />
                    <Suspense fallback={null}>
                        <HeroSection />
                    </Suspense>
                    <Suspense fallback={null}>
                        <SkillsSection />
                    </Suspense>
                    <Suspense fallback={null}>
                        <ProjectsSection />
                    </Suspense>
                    <Suspense fallback={null}>
                        <JourneySection />
                    </Suspense>
                    <Suspense fallback={null}>
                        <ContactSection />
                    </Suspense>
                    <NeonSwitch />
                </>
            )}
        </div>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <AppContent />
        </ThemeProvider>
    );
}
