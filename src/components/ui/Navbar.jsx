import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../ui/Magnetic';
import { useTheme, SKINS } from '../../context/ThemeContext';

const NAV_LINKS = ['Home', 'Skills', 'Projects', 'Journey', 'Contact'];

export default function Navbar() {
    const { theme, themeKey, setThemeKey } = useTheme();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const panelRef = useRef(null);

    // Observe active section
    useEffect(() => {
        const ids = ['hero', 'skills', 'projects', 'journey', 'contact'];
        const obs = new IntersectionObserver(
            (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
            { rootMargin: '-40% 0px -40% 0px' }
        );
        ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
        return () => obs.disconnect();
    }, []);

    // Close theme panel on outside click
    useEffect(() => {
        const handler = (e) => {
            if (panelRef.current && !panelRef.current.contains(e.target)) setThemeOpen(false);
        };
        if (themeOpen) document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [themeOpen]);

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

                {/* Right: theme switcher + CTA */}
                <div className="flex items-center gap-4 sm:gap-6" ref={panelRef}>
                    {/* Theme picker button */}
                    <div className="relative">
                        <button
                            onClick={() => setThemeOpen(p => !p)}
                            className="flex items-center gap-2 px-3 py-2 text-xs font-bold transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000] relative"
                            style={{
                                background: isPop ? '#FEFAE0' : theme.surface,
                                border: isPop ? '2px solid #000' : `1px solid ${theme.surfaceBorder}`,
                                borderRadius: isPop ? '12px' : '12px',
                                color: isPop ? '#000' : theme.primary,
                                fontFamily: isPop ? theme.fontHeading : theme.fontMono,
                                boxShadow: isPop ? '4px 4px 0px #000' : 'none',
                            }}
                            title="Switch UI Skin"
                        >
                            {/* "New Themes Available" Indicator */}
                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full animate-ping" style={{ background: theme.primary, opacity: 0.6 }} />
                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full" style={{ background: theme.primary, border: isPop ? '1px solid #000' : 'none' }} />

                            <div className="hidden sm:flex flex-col items-start pr-2 border-r" style={{ borderColor: isPop ? '#000' : theme.surfaceBorder }}>
                                <span className="text-[8px] leading-none opacity-60 uppercase tracking-widest block mb-0.5" style={{ fontFamily: theme.fontMono }}>Theme</span>
                                <span className="leading-none uppercase tracking-widest">{SKINS[themeKey].name}</span>
                            </div>
                            <span className="text-sm">{SKINS[themeKey].emoji}</span>
                            <svg className={`w-3 h-3 transition-transform duration-200 ${themeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Theme dropdown panel */}
                        <AnimatePresence>
                            {themeOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-12 w-72 rounded-2xl p-3 z-50"
                                    style={{
                                        background: isLight ? 'rgba(248,244,240,0.97)' : 'rgba(8,4,28,0.96)',
                                        backdropFilter: 'blur(24px)',
                                        border: `1px solid ${theme.surfaceBorder}`,
                                        boxShadow: `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px ${theme.primary}15`,
                                        fontFamily: theme.fontBody,
                                    }}
                                >
                                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3 px-1"
                                        style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>
                                        — UI SKIN
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {Object.values(SKINS).map(skin => (
                                            <button
                                                key={skin.key}
                                                onClick={() => { setThemeKey(skin.key); setThemeOpen(false); }}
                                                className="relative flex flex-col gap-2 p-3 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] group"
                                                style={{
                                                    background: themeKey === skin.key ? `${skin.primary}18` : 'rgba(255,255,255,0.04)',
                                                    border: themeKey === skin.key ? `2px solid ${skin.primary}` : '1px solid rgba(255,255,255,0.08)',
                                                }}
                                            >
                                                {/* Preview swatch */}
                                                <div className="w-full h-10 rounded-lg overflow-hidden flex gap-1"
                                                    style={{ background: skin.bg }}>
                                                    <div className="flex-1 h-full" style={{ background: `linear-gradient(135deg, ${skin.bg} 40%, ${skin.primary}50)` }} />
                                                    <div className="w-3 h-full" style={{ background: skin.primary }} />
                                                    <div className="w-2 h-full" style={{ background: skin.secondary }} />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-xs font-bold" style={{ color: skin.text === '#1a1a1a' ? '#1a1a1a' : '#ffffff' }}>
                                                            {skin.emoji} {skin.name}
                                                        </p>
                                                        <p className="text-[9px] opacity-50 font-mono" style={{ color: skin.text === '#1a1a1a' ? '#555' : '#aaa' }}>
                                                            {skin.cardStyle} · {skin.btnStyle}
                                                        </p>
                                                    </div>
                                                    {themeKey === skin.key && (
                                                        <div className="w-4 h-4 rounded-full flex items-center justify-center"
                                                            style={{ background: skin.primary }}>
                                                            <svg className="w-2.5 h-2.5 text-black" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA button */}
                    <Magnetic intensity={0.3}>
                        <a href="#contact"
                            className="hidden md:inline-flex items-center gap-2 px-8 py-3.5 text-sm md:text-base font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_#000]"
                            style={{
                                background: isPop ? '#E2D1F9' : theme.primary,
                                color: '#000',
                                borderRadius: theme.btnStyle === 'sharp' ? '4px' : theme.btnStyle === 'pill' ? '9999px' : '999px',
                                border: isPop ? '2px solid #000' : 'none',
                                boxShadow: isPop ? '4px 4px 0px #000' : `0 0 20px ${theme.primary}30`,
                                fontFamily: isPop ? theme.fontHeading : theme.fontMono,
                            }}
                        >
                            {theme.sectionStyle === 'terminal' ? '> Hire Me' : "LET'S TALK ⚡"}
                        </a>
                    </Magnetic>

                    {/* Mobile hamburger */}
                    <button className="md:hidden p-2 rounded-lg" style={{ color: theme.text }}
                        onClick={() => setMobileOpen(p => !p)}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                        </svg>
                    </button>
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
                        {/* Mobile theme buttons */}
                        <div className="grid grid-cols-4 gap-2 pt-3 mt-2" style={{ borderTop: `1px solid ${theme.surfaceBorder}` }}>
                            {Object.values(SKINS).map(skin => (
                                <button key={skin.key} onClick={() => { setThemeKey(skin.key); setMobileOpen(false); }}
                                    className="flex flex-col items-center gap-1 p-2 rounded-xl text-[9px] font-bold transition-all"
                                    style={{
                                        background: themeKey === skin.key ? `${skin.primary}20` : 'transparent',
                                        border: `1px solid ${themeKey === skin.key ? skin.primary : 'transparent'}`,
                                        color: theme.text,
                                    }}>
                                    <span className="text-xl">{skin.emoji}</span>
                                    {skin.name}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
