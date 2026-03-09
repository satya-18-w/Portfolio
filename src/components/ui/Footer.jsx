import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer className="relative py-12 px-6 border-t border-white/[0.04]" style={{ background: 'var(--bg-dark)' }}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-600 tracking-wider">
                    Built by <span className="text-slate-400">Satyajit Samal</span>
                </p>
                <p className="text-xs text-slate-600 tracking-wider">
                    IIIT Bhubaneswar · B.Tech CSE · 2026
                </p>
                <p className="text-xs text-slate-600 tracking-wider">
                    React · Three.js · Framer Motion
                </p>
            </div>
        </footer>
    );
}
