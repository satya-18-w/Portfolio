import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { useTheme } from '../../context/ThemeContext';

const NAV_LINKS = ['Home', 'About', 'Skills', 'Projects', 'Journey', 'Contact'];

export default function Navbar() {
    const { theme } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');

    // Observe active section
    useEffect(() => {
        const ids = ['hero', 'about', 'skills', 'projects', 'journey', 'contact'];
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
            { rootMargin: '-40% 0px -40% 0px' }
        );
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);

    const isLight = theme.sectionStyle === 'light';
    const isPop = theme.sectionStyle === 'pop';
    const navBg = isLight
        ? 'rgba(248,244,240,0.9)'
        : isPop
            ? 'rgba(239,237,231,0.95)' // Cream
            : theme.sectionStyle === 'terminal'
                ? 'rgba(0,0,0,0.92)'
                : 'rgba(3,0,20,0.85)';

    const textColor = theme.text;
    const mutedColor = theme.textMuted;

    return (
        <>
            <nav
                className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between transition-all duration-500"
                style={{
                    background: navBg,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderBottom: isPop ? '2px solid #000' : `1px solid ${theme.surfaceBorder}`,
                    fontFamily: theme.fontBody,
                }}
            >
                {/* Logo */}
                <Magnetic intensity={0.15}>
                    <a href="#hero" className="flex items-center gap-2.5">
                        <div className="w-10 h-10 flex items-center justify-center font-black text-sm transition-transform hover:scale-105 overflow-hidden"
                            style={{
                                background: theme.primary,
                                color: '#000',
                                borderRadius: isPop ? '50%' : '12px',
                                border: isPop ? '2px solid #000' : 'none',
                                boxShadow: isPop ? '3px 3px 0px #000' : 'none'
                            }}>
                            <img src="/images/image.png" alt="Satyajit Samal Logo" className="w-10 h-10 object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }} />
                            <span style={{ display: 'none' }}>SS</span>
                        </div>
                        <span className="font-bold text-base hidden sm:block" style={{ color: textColor, fontFamily: theme.fontHeading }}>
                            Satyajit Samal
                        </span>
                    </a>
                </Magnetic>

                {/* Desktop nav links */}
                <ul className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map(name => {
                        const id = name.toLowerCase();
                        const isActive = activeSection === id;
                        return (
                            <li key={name}>
                                <Magnetic intensity={0.2}>
                                    <a href={`#${id}`}
                                        className={`transition-all duration-200 relative flex items-center justify-center ${isPop
                                            ? 'text-sm font-black uppercase tracking-widest px-4 py-2 border-2 rounded-xl hover:-translate-y-1'
                                            : 'text-sm font-medium'
                                            }`}
                                        style={{
                                            color: isPop ? '#000' : (isActive ? theme.primary : mutedColor),
                                            fontFamily: isPop ? theme.fontHeading : theme.fontBody,
                                            background: isPop && isActive ? '#E0FBFC' : (isPop ? 'transparent' : 'transparent'),
                                            borderColor: isPop ? (isActive ? '#000' : 'transparent') : 'transparent',
                                            boxShadow: isPop && isActive ? '4px 4px 0px #000' : (isPop ? 'none' : 'none'),
                                        }}
                                        onMouseEnter={(e) => {
                                            if (isPop && !isActive) {
                                                e.currentTarget.style.borderColor = '#000';
                                                e.currentTarget.style.background = '#fff';
                                                e.currentTarget.style.boxShadow = '4px 4px 0px #000';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            if (isPop && !isActive) {
                                                e.currentTarget.style.borderColor = 'transparent';
                                                e.currentTarget.style.background = 'transparent';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }
                                        }}
                                    >
                                        {/* Terminal prefix */}
                                        {theme.sectionStyle === 'terminal' && <span style={{ color: theme.primary }}>$ </span>}
                                        {name}
                                        {isActive && !isPop && (
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

                {/* Right: CTA */}
                <div className="flex items-center gap-4 sm:gap-6">
                    {/* CTA button */}
                    <Magnetic intensity={0.3}>
                        <a href="#contact"
                            className="hidden md:inline-flex items-center gap-2 px-8 py-3.5 text-sm md:text-base font-black uppercase  pl-3    tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
                            style={{
                                background: isPop ? '#E2D1F9' : theme.primary,
                                color: '#000',
                                borderRadius: theme.btnStyle === 'sharp' ? '4px' : theme.btnStyle === 'pill' ? '9999px' : '6px',
                                border: isPop ? '2px solid #000' : 'none',
                                boxShadow: isPop ? '4px 4px 0px #000' : 'none',
                                fontFamily: isPop ? theme.fontHeading : theme.fontMono,
                                lineHeight: '1',
                            }}
                        >
                            {theme.sectionStyle === 'terminal' ? '> Hire Me' : "LET'S TALK ⚡"}
                        </a>
                    </Magnetic>

                    {/* Mobile hamburger */}
                    <Magnetic intensity={0.5}>
                        <button className="md:hidden p-2 rounded-lg" style={{ color: theme.text }}
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
                        {NAV_LINKS.map(name => (
                            <a key={name} href={`#${name.toLowerCase()}`}
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
