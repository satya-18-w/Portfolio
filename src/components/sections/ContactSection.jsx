import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import Magnetic from '../ui/Magnetic';

export default function ContactSection() {
    const { theme, themeKey } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [focus, setFocus] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }, 3000);
    };

    const isLight = theme.sectionStyle === 'light';
    const isBasement = themeKey === 'brutalist';
    const isCyber = themeKey === 'cyber';
    const isTerminal = themeKey === 'terminal';

    // Theme-aware styling
    const sectionBg = isLight ? theme.bgAlt : theme.bg;
    const headingColor = isLight ? '#000' : theme.text;
    const inputTextColor = isLight ? '#000' : theme.text;
    const mutedColor = theme.textMuted;
    const borderColor = isLight ? `${theme.primary}25` : theme.surfaceBorder;

    return (
        <section
            id="contact"
            className="w-full relative overflow-hidden py-32 lg:py-48 flex flex-col items-center justify-center border-t"
            style={{ background: sectionBg, color: headingColor, borderColor: isBasement ? theme.surfaceBorder : 'transparent' }}
        >
            <div className="w-full max-w-5xl mx-auto px-6 lg:px-12 z-10">
                
                {/* ── MASSIVE HEADER ── */}
                <div className="flex flex-col mb-20 md:mb-32 w-full">
                    <div className="flex items-center gap-4 mb-8">
                        <span className="w-3 h-3 rounded-full animate-pulse" style={{ background: theme.primary }} />
                        <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: mutedColor, fontFamily: theme.fontMono }}>
                            Available for hire
                        </span>
                    </div>
                    
                    <h2 
                        className="text-[clamp(4rem,10vw,12rem)] font-black uppercase tracking-tighter leading-[0.8] mb-8"
                        style={{ fontFamily: theme.fontHeading, color: headingColor }}
                    >
                        LET'S<br /> <span style={{ color: theme.primary }}>TALK</span>
                    </h2>

                    <div className="flex flex-wrap gap-6 border-t pt-8" style={{ borderColor: borderColor }}>
                        <a href="mailto:satyajit@iiit-bh.ac.in" className="text-sm md:text-base font-medium transition-colors hover:text-white" style={{ color: mutedColor }}>
                            satyajit@iiit-bh.ac.in
                        </a>
                        <span className="text-white/20 hidden md:block">/</span>
                        <a href="https://github.com/satya-18-w" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium transition-colors hover:text-white" style={{ color: mutedColor }}>
                            GitHub ↗
                        </a>
                        <span className="text-white/20 hidden md:block">/</span>
                        <a href="https://linkedin.com/in/satyajit-samal" target="_blank" rel="noopener noreferrer" className="text-sm md:text-base font-medium transition-colors hover:text-white" style={{ color: mutedColor }}>
                            LinkedIn ↗
                        </a>
                    </div>
                </div>

                {/* ── ULTRA MINIMAL FORM ── */}
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
                    
                    <div className="lg:col-span-4 flex flex-col justify-end">
                        <p className="text-sm leading-relaxed max-w-sm" style={{ color: mutedColor, fontFamily: theme.fontBody }}>
                            Whether you have an idea for a massive distributed system, a highly-available machine learning pipeline, or just want to chat about code. Minimum response time, maximum bandwidth.
                        </p>
                    </div>

                    <div className="lg:col-span-8">
                        <form onSubmit={handleSubmit} className="flex flex-col w-full">
                            
                            <div className="flex flex-col md:flex-row gap-8 md:gap-12 w-full mb-12">
                                {/* Name Input */}
                                <div className="relative w-full group">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block transition-colors"
                                        style={{ color: focus === 'name' ? theme.primary : mutedColor, fontFamily: theme.fontMono }}>
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        onFocus={() => setFocus('name')}
                                        onBlur={() => setFocus(null)}
                                        required
                                        className="w-full bg-transparent border-b-2 py-4 text-xl outline-none transition-all duration-300 rounded-none placeholder:text-black/20 dark:placeholder:text-white/20"
                                        style={{ borderColor: focus === 'name' ? theme.primary : borderColor, color: inputTextColor }}
                                        placeholder="John Doe"
                                    />
                                </div>

                                {/* Email Input */}
                                <div className="relative w-full group">
                                    <label className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block transition-colors"
                                        style={{ color: focus === 'email' ? theme.primary : mutedColor, fontFamily: theme.fontMono }}>
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        onFocus={() => setFocus('email')}
                                        onBlur={() => setFocus(null)}
                                        required
                                        className="w-full bg-transparent border-b-2 py-4 text-xl outline-none transition-all duration-300 rounded-none placeholder:text-black/20 dark:placeholder:text-white/20"
                                        style={{ borderColor: focus === 'email' ? theme.primary : borderColor, color: inputTextColor }}
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            {/* Message Input */}
                            <div className="relative w-full mb-16 group">
                                <label className="text-[10px] uppercase font-bold tracking-[0.2em] mb-4 block transition-colors"
                                    style={{ color: focus === 'message' ? theme.primary : mutedColor, fontFamily: theme.fontMono }}>
                                    Message Details
                                </label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    onFocus={() => setFocus('message')}
                                    onBlur={() => setFocus(null)}
                                    rows={1}
                                    required
                                    className="w-full bg-transparent border-b-2 py-4 text-xl outline-none resize-none transition-all duration-300 rounded-none placeholder:text-black/20 dark:placeholder:text-white/20 min-h-[60px]"
                                    style={{ borderColor: focus === 'message' ? theme.primary : borderColor, color: inputTextColor }}
                                    placeholder="Tell me about your tech challenges..."
                                />
                            </div>

                            {/* Submit Row */}
                            <div className="flex justify-end">
                                <Magnetic intensity={isCyber ? 0.3 : 0.1}>
                                    <button
                                        type="submit"
                                        disabled={submitted}
                                        className="group relative px-12 py-6 overflow-hidden transition-all duration-500 rounded-full"
                                        style={{
                                            background: submitted ? 'transparent' : (isCyber || isBasement ? theme.primary : 'transparent'),
                                            border: isCyber ? '4px solid #000' : isBasement ? `1px solid ${theme.primary}` : `1px solid ${borderColor}`,
                                            color: submitted ? theme.primary : (isCyber || isBasement ? '#000' : theme.text),
                                            boxShadow: isCyber && !submitted ? '8px 8px 0px #000' : 'none'
                                        }}
                                    >
                                        <div className="absolute inset-0 w-full h-full bg-white scale-x-0 origin-left transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100 z-0" />
                                        <span className="relative z-10 flex items-center gap-4 text-sm font-black tracking-widest uppercase transition-colors duration-500 group-hover:text-black" style={{ fontFamily: theme.fontMono }}>
                                            {submitted ? 'Transmission Sent ✓' : isTerminal ? '> execute send' : 'Send Message →'}
                                        </span>
                                    </button>
                                </Magnetic>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
            
            {/* Basement raw noise overlay */}
            {isBasement && (
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
                </div>
            )}
        </section>
    );
}
