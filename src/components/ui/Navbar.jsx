import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const NAV_ITEMS = [
    { label: 'Home', href: '#hero' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
];

// Palette Icon SVG
function PaletteIcon() {
    return (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
    );
}

export default function Navbar() {
    const { theme, themeKey, setThemeKey, THEMES } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('hero');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [themeOpen, setThemeOpen] = useState(false);
    const themeRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            const ids = ['contact', 'journey', 'projects', 'skills', 'hero'];
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 200) {
                    setActive(id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close theme panel when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (themeRef.current && !themeRef.current.contains(e.target)) {
                setThemeOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-6 pt-8'}`}
            style={{
                background: scrolled ? 'rgba(6, 6, 17, 0.85)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
            }}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-12">
                {/* Logo */}
                <a href="#hero" className="text-xl font-heading font-bold gradient-text">
                    SS
                </a>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="relative px-4 py-2 text-sm transition-colors duration-300 rounded-lg hover:bg-white/3"
                            style={{ color: active === item.href.slice(1) ? '#ffffff' : '#94a3b8' }}
                        >
                            {item.label}
                            {active === item.href.slice(1) && (
                                <motion.div
                                    layoutId="activeNav"
                                    className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                                    style={{ background: theme.primary }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                />
                            )}
                        </a>
                    ))}
                </div>

                {/* Right side: Theme Picker + CTA + Mobile toggle */}
                <div className="flex items-center gap-3">

                    {/* ── Theme Picker ── */}
                    <div ref={themeRef} className="relative">
                        <button
                            onClick={() => setThemeOpen(!themeOpen)}
                            title="Change theme"
                            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300"
                            style={{
                                background: themeOpen ? `${theme.primary}20` : 'rgba(255,255,255,0.05)',
                                border: `1px solid ${themeOpen ? theme.primary + '50' : 'rgba(255,255,255,0.08)'}`,
                                color: themeOpen ? theme.primary : '#94a3b8',
                            }}
                        >
                            {/* Active color swatch */}
                            <span
                                className="w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300"
                                style={{ background: theme.primary, boxShadow: `0 0 6px ${theme.primary}80` }}
                            />
                            <span className="hidden sm:inline">{theme.name}</span>
                            <PaletteIcon />
                        </button>

                        {/* Dropdown panel */}
                        <AnimatePresence>
                            {themeOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                                    transition={{ duration: 0.2, ease: 'easeOut' }}
                                    className="absolute right-0 mt-2 w-52 rounded-2xl overflow-hidden shadow-2xl"
                                    style={{
                                        background: 'rgba(8, 8, 20, 0.96)',
                                        backdropFilter: 'blur(24px)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >
                                    {/* Header */}
                                    <div className="px-4 pt-3 pb-2 border-b border-white/5">
                                        <p className="text-[10px] font-mono tracking-[0.2em] uppercase text-gray-500">
                                            Color Theme
                                        </p>
                                    </div>

                                    {/* Theme options */}
                                    <div className="p-2 flex flex-col gap-1">
                                        {Object.entries(THEMES).map(([key, t]) => (
                                            <button
                                                key={key}
                                                onClick={() => {
                                                    setThemeKey(key);
                                                    setThemeOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200"
                                                style={{
                                                    background: themeKey === key ? `${t.primary}15` : 'transparent',
                                                    border: `1px solid ${themeKey === key ? t.primary + '40' : 'transparent'}`,
                                                }}
                                            >
                                                {/* Gradient swatch */}
                                                <span
                                                    className="w-6 h-6 rounded-lg shrink-0 shadow-md"
                                                    style={{
                                                        background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                                                        boxShadow: themeKey === key ? `0 0 10px ${t.primary}60` : 'none',
                                                    }}
                                                />
                                                <div className="flex-1">
                                                    <p
                                                        className="text-sm font-medium"
                                                        style={{ color: themeKey === key ? t.primary : 'white' }}
                                                    >
                                                        {t.name}
                                                    </p>
                                                    <p className="text-[10px] font-mono" style={{ color: t.secondary + 'aa' }}>
                                                        {t.primary}
                                                    </p>
                                                </div>
                                                {/* Active checkmark */}
                                                {themeKey === key && (
                                                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: t.primary }}>
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTA Button */}
                    <a
                        href="#contact"
                        className="hidden sm:block px-5 py-2 text-xs font-semibold rounded-lg tracking-wide transition-all duration-300 hover:shadow-lg"
                        style={{ background: theme.primary, color: '#000', boxShadow: `0 2px 12px ${theme.primary}30` }}
                    >
                        Let's Talk
                    </a>

                    {/* Mobile menu toggle */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden w-8 h-8 flex flex-col items-end justify-center gap-1.5"
                    >
                        <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden mt-4 mx-6 rounded-xl overflow-hidden"
                        style={{ background: 'rgba(6, 6, 17, 0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)' }}
                    >
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className="block px-6 py-3.5 text-sm transition-colors duration-300 border-b border-white/3 last:border-0"
                                style={{ color: active === item.href.slice(1) ? theme.primary : '#94a3b8' }}
                            >
                                {item.label}
                            </a>
                        ))}
                        {/* Theme options in mobile menu */}
                        <div className="px-4 py-3 border-t border-white/5">
                            <p className="text-[10px] text-gray-600 font-mono tracking-widest uppercase mb-2">Theme</p>
                            <div className="flex gap-2">
                                {Object.entries(THEMES).map(([key, t]) => (
                                    <button
                                        key={key}
                                        onClick={() => setThemeKey(key)}
                                        title={t.name}
                                        className="w-7 h-7 rounded-full transition-all duration-200"
                                        style={{
                                            background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})`,
                                            boxShadow: themeKey === key ? `0 0 12px ${t.primary}80` : 'none',
                                            outline: themeKey === key ? `2px solid ${t.primary}` : '2px solid transparent',
                                            outlineOffset: '2px',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
