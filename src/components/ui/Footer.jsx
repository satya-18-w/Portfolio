import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const LINKS = ['Home', 'Skills', 'Projects', 'Journey', 'Contact'];
const SOCIALS = [
    { label: 'GitHub', icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>), href: 'https://github.com/satya-18-w' },
    { label: 'LinkedIn', icon: (<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>), href: 'https://linkedin.com' },
];

/* ── CYBER ─────────────────────────────────────────────────────────── */
function CyberFooter({ theme }) {
    const [showTop, setShowTop] = useState(false);
    useEffect(() => { const h = () => setShowTop(window.scrollY > 400); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
    return (
        <footer className="relative py-16 mt-0" style={{ background: theme.bg, color: theme.text, borderTop: `1px solid ${theme.surfaceBorder}` }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black text-black" style={{ background: theme.primary }}>SS</div>
                        <span className="font-bold" style={{ fontFamily: theme.fontHeading }}>Satyajit Samal</span>
                    </div>
                    <p className="text-sm mb-5" style={{ color: theme.textMuted }}>Building distributed systems and AI-powered applications. IIIT Bhubaneswar — B.Tech CSE.</p>
                    <div className="flex gap-2">{SOCIALS.map(s => (
                        <a key={s.label} href={s.href} className="w-9 h-9 rounded-xl flex items-center justify-center border transition-all hover:-translate-y-0.5"
                            style={{ border: `1px solid ${theme.surfaceBorder}`, color: theme.textMuted }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = `${theme.primary}50`; e.currentTarget.style.color = theme.primary; }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = theme.surfaceBorder; e.currentTarget.style.color = theme.textMuted; }}>
                            {s.icon}
                        </a>
                    ))}</div>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>Navigate</p>
                    <div className="flex flex-col gap-2">{LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-sm hover:translate-x-1 transition-transform" style={{ color: theme.textMuted }}>{l}</a>)}</div>
                </div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>System</p>
                    <div className="p-4 rounded-xl" style={{ background: theme.surface, border: `1px solid ${theme.surfaceBorder}` }}>
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-2 h-2 rounded-full" style={{ background: '#4ade80', boxShadow: '0 0 6px #4ade80' }} />
                            <span className="text-sm font-bold">Portfolio v2.0</span>
                        </div>
                        <p className="text-xs" style={{ color: theme.textMuted, fontFamily: theme.fontMono }}>SS_CORE_SYSTEMS · LIVE</p>
                    </div>
                    <a href="#contact" className="mt-4 block px-5 py-2.5 rounded-full text-sm font-bold text-center transition-all hover:scale-105"
                        style={{ background: theme.primary, color: '#000' }}>Start a Conversation →</a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 flex justify-between text-xs" style={{ color: theme.textMuted, borderTop: `1px solid ${theme.surfaceBorder}` }}>
                <span>© 2024 Satyajit Samal · Built with React + Three.js</span>
                <span style={{ fontFamily: theme.fontMono }}>CRAFTED WITH ♥ FROM IIIT BHUBANESWAR</span>
            </div>
            <AnimatePresence>{showTop && (
                <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 w-12 h-12 rounded-full flex items-center justify-center z-50 transition-all hover:scale-110"
                    style={{ background: theme.primary, color: '#000', boxShadow: `0 0 20px ${theme.primary}50` }}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                </motion.button>
            )}</AnimatePresence>
        </footer>
    );
}

/* ── MINIMAL: Clean editorial ──────────────────────────────────── */
function MinimalFooter({ theme }) {
    return (
        <footer style={{ background: theme.bg, color: theme.text, borderTop: `3px solid ${theme.primary}` }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col md:flex-row justify-between gap-10">
                <div>
                    <h3 className="text-4xl font-black tracking-tighter mb-2" style={{ fontFamily: theme.fontHeading, color: theme.primary }}>SATYAJIT SAMAL</h3>
                    <p className="text-sm" style={{ color: theme.textMuted }}>AI Engineer & Backend Developer</p>
                </div>
                <div className="flex gap-10">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.textMuted }}>Links</p>
                        <div className="flex flex-col gap-1.5">{LINKS.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="text-sm hover:underline" style={{ color: theme.text }}>{l}</a>)}</div>
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: theme.textMuted }}>Connect</p>
                        <div className="flex flex-col gap-1.5">{SOCIALS.map(s => <a key={s.label} href={s.href} className="text-sm hover:underline" style={{ color: theme.primary }}>{s.label} ↗</a>)}</div>
                    </div>
                </div>
            </div>
            <div className="border-t-2 max-w-7xl mx-auto px-6 lg:px-12 py-6 flex justify-between text-xs" style={{ borderColor: `${theme.primary}20`, color: theme.textMuted }}>
                <span>© 2024 Satyajit Samal</span>
                <span style={{ color: theme.primary }}>React · Three.js · Framer Motion</span>
            </div>
        </footer>
    );
}

/* ── TERMINAL ─────────────────────────────────────────────────── */
function TerminalFooter({ theme }) {
    return (
        <footer style={{ background: theme.bg, color: theme.text, borderTop: `1px solid ${theme.primary}30`, fontFamily: theme.fontMono }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
                <p style={{ color: theme.primary }}>$ display --credits --verbose</p>
                <div className="mt-3 text-xs space-y-1" style={{ color: theme.textMuted }}>
                    <p>NAME=Satyajit Samal</p>
                    <p>ROLE="AI Engineer, Backend Developer"</p>
                    <p>COLLEGE="IIIT Bhubaneswar"</p>
                    <p>STACK="Go, Python, LangChain, AWS, Docker, K8s"</p>
                    <p>GITHUB=https://github.com/satya-18-w</p>
                    <p>YEAR=2024</p>
                </div>
                <p className="mt-6 text-xs" style={{ color: `${theme.primary}50` }}>// exit 0 · SS_CORE_SYSTEMS · ALL RIGHTS RESERVED</p>
            </div>
        </footer>
    );
}

/* ── BRUTALIST ────────────────────────────────────────────────── */
import Magnetic from '../ui/Magnetic';

function BrutalistFooter({ theme }) {
    return (
        <footer className="relative overflow-hidden" style={{ background: theme.bg, borderTop: `1px solid ${theme.surfaceBorder}` }}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12 flex flex-col gap-16 relative z-10">
                
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 border-b pb-12" style={{ borderColor: theme.surfaceBorder }}>
                    <div className="flex flex-col max-w-lg">
                        <span className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4" style={{ color: theme.primary, fontFamily: theme.fontMono }}>
                            // END OF PAGE
                        </span>
                        <h3 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]" style={{ fontFamily: theme.fontHeading, color: theme.text }}>
                            Ready to Build<br/>The Future?
                        </h3>
                    </div>
                    
                    <Magnetic intensity={0.4}>
                        <button 
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-300 group hover:scale-105"
                            style={{ background: theme.primary, border: `2px solid ${theme.surfaceBorder}`, color: '#000' }}
                        >
                            <svg className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ fontFamily: theme.fontMono }}>Top</span>
                        </button>
                    </Magnetic>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs" style={{ color: theme.textMuted }}>
                    <div className="flex items-center gap-6">
                        {SOCIALS.map(s => (
                            <Magnetic intensity={0.2} key={s.label}>
                                <a href={s.href} className="font-bold uppercase tracking-widest transition-colors hover:text-white" style={{ fontFamily: theme.fontMono }}>
                                    {s.label}
                                </a>
                            </Magnetic>
                        ))}
                    </div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-right" style={{ fontFamily: theme.fontMono }}>
                        <span className="opacity-60">© {new Date().getFullYear()} Satyajit Samal</span>
                        <span className="hidden md:block opacity-30">|</span>
                        <span className="opacity-60">Built with React, Three.js & Framer Motion</span>
                    </div>
                </div>
            </div>

            {/* Massive background text */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-[0.02] z-0">
                <h1 className="text-[20vw] font-black tracking-tighter leading-none whitespace-nowrap" style={{ fontFamily: theme.fontHeading, color: '#fff' }}>
                    SATYAJIT
                </h1>
            </div>
        </footer>
    );
}

export default function Footer() {
    const { theme, themeKey } = useTheme();
    if (themeKey === 'minimal') return <MinimalFooter theme={theme} />;
    if (themeKey === 'terminal') return <TerminalFooter theme={theme} />;
    if (themeKey === 'brutalist') return <BrutalistFooter theme={theme} />;
    return <CyberFooter theme={theme} />;
}
