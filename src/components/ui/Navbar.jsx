import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Journey', id: 'journey' },
    { name: 'Contact', id: 'contact' },
];

export default function Navbar() {
    const { theme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Observe active section
    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
            { rootMargin: '-40% 0px -40% 0px' }
        );
        NAV_LINKS.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);

    const navBg = 'rgba(0,0,0,0.85)';

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500"
                style={{
                    background: navBg,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: `1px solid ${theme.surfaceBorder}`,
                    fontFamily: theme.fontBody,
                }}
            >
                {/* Logo */}
                <Magnetic intensity={0.15}>
                    <a href="#hero" className="flex items-center gap-2.5">
                        <div className="w-10 h-10 flex items-center justify-center font-black text-sm transition-transform hover:scale-105 overflow-hidden"
                            style={{ background: theme.primary, color: '#000', borderRadius: '12px' }}>
                            <img src="/images/image.png" alt="Satyajit Samal Logo" className="w-10 h-10 object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                            <span style={{ display: 'none' }}>SS</span>
                        </div>
                        <span className="font-bold text-base hidden sm:block" style={{ color: theme.text, fontFamily: theme.fontHeading }}>
                            Satyajit Samal
                        </span>
                    </a>
                </Magnetic>

                {/* Desktop nav links */}
                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(({ name, id }) => {
                        const isActive = activeSection === id;
                        return (
                            <li key={name}>
                                <Magnetic intensity={0.2}>
                                    <a href={`#${id}`}
                                        className="transition-all duration-200 relative flex items-center justify-center text-sm font-medium"
                                        style={{ color: isActive ? theme.primary : theme.textMuted, fontFamily: theme.fontBody }}
                                    >
                                        {name}
                                        {isActive && (
                                            <motion.span layoutId="nav-underline"
                                                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                                                style={{ background: theme.primary }} />
                                        )}
                                    </a>
                                </Magnetic>
                            </li>
                        );
                    })}
                </ul>

                <div className="flex items-center gap-4 sm:gap-6">
                    {/* CTA button */}
                    <Magnetic intensity={0.3}>
                        <a href="#contact"
                            className="hidden md:inline-flex items-center gap-2 px-8 py-3.5 text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-1"
                            style={{ background: theme.primary, color: '#000', borderRadius: '4px', fontFamily: theme.fontMono, lineHeight: '1' }}
                        >
                            LET'S TALK
                        </a>
                    </Magnetic>

                    {/* Mobile hamburger */}
                    <Magnetic intensity={0.5}>
                        <button className="md:hidden p-2 rounded-lg" style={{ color: theme.text }}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            onClick={() => setMobileOpen(p => !p)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                            </svg>
                        </button>
                    </Magnetic>
                </div>
            </nav>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-16 left-0 right-0 z-40 flex flex-col gap-1 p-4 md:hidden"
                        style={{ background: navBg, backdropFilter: 'blur(20px)', borderBottom: `1px solid ${theme.surfaceBorder}` }}
                    >
                        {NAV_LINKS.map(({ name, id }) => (
                            <a key={name} href={`#${id}`}
                                onClick={() => setMobileOpen(false)}
                                className="px-4 py-3 rounded-xl text-sm font-medium"
                                style={{ color: theme.text, fontFamily: theme.fontBody }}>
                                {name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
