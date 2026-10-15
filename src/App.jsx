import React, { useState, useEffect, Suspense, lazy } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Loader from './components/ui/Loader';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import CursorParticles from './components/ui/CursorParticles';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import TechMarquee from './components/ui/TechMarquee';

const HeroSection = lazy(() => import('./components/sections/HeroSection'));
const SkillsSection = lazy(() => import('./components/sections/SkillsSection'));
const ProjectsSection = lazy(() => import('./components/sections/ProjectsSection'));
const JourneySection = lazy(() => import('./components/sections/JourneySection'));
const AboutSection = lazy(() => import('./components/sections/AboutSection'));
const ContactSection = lazy(() => import('./components/sections/ContactSection'));
const ProjectDetailPage = lazy(() => import('./components/pages/ProjectDetailPage'));

function AppContent() {
    const [loading, setLoading] = useState(true);

    useSmoothScroll();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative noise-overlay">
            <AnimatePresence mode="wait">
                {loading && <Loader key="loader" />}
            </AnimatePresence>

            {!loading && (
                <Routes>
                    <Route
                        path="/"
                        element={
                                <>
                                    <Navbar />
                                    <ScrollProgress />
                                    <CursorParticles />
                                    <CustomCursor />
                                    <Suspense fallback={null}>
                                        <HeroSection />
                                    </Suspense>
                                    <TechMarquee direction="left" />
                                    <Suspense fallback={null}>
                                        <SkillsSection />
                                    </Suspense>
                                    <TechMarquee direction="right" />
                                    <Suspense fallback={null}>
                                        <AboutSection />
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
                                    <Footer />
                                </>
                        }
                    />
                    <Route
                        path="/project/:slug"
                        element={
                            <Suspense fallback={null}>
                                <ProjectDetailPage />
                            </Suspense>
                        }
                    />
                </Routes>
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
