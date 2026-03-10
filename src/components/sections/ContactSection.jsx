import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ContactSection() {
    const { theme } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [focus, setFocus] = useState(null);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => { setSubmitted(false); setForm({ name: '', email: '', message: '' }); }, 3000);
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    };

    return (
        <section
            id="contact"
            className="h-screen w-screen relative overflow-hidden snap-section flex flex-col"
            style={{ background: 'var(--bg-dark)' }}
        >
            {/* Main content — centered */}
            <div className="flex-1 flex flex-col justify-center max-w-6xl mx-auto w-full px-6 sm:px-10 md:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    {/* Left — bold heading & info */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <motion.span variants={fadeUp} className="section-label block mb-3">Contact</motion.span>

                        <motion.h2
                            variants={fadeUp}
                            className="display-heading text-5xl sm:text-6xl md:text-7xl text-white uppercase tracking-tighter mb-6 leading-[0.9]"
                        >
                            Let's Get<br />In Touch
                        </motion.h2>

                        <motion.a
                            variants={fadeUp}
                            href="mailto:satyajit@iiit-bh.ac.in"
                            className="text-sm sm:text-base text-slate-400 hover:text-white transition-colors duration-300 mb-6 block"
                        >
                            satyajit@iiit-bh.ac.in
                        </motion.a>

                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-xs text-slate-500">Available for internships & collaborations</span>
                        </motion.div>

                        <motion.div variants={fadeUp} className="flex gap-3">
                            {[
                                { name: 'GitHub', url: 'https://github.com/satya-18-w' },
                                { name: 'LinkedIn', url: 'https://linkedin.com/in/satyajit-samal' },
                            ].map((l) => (
                                <a
                                    key={l.name}
                                    href={l.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] font-semibold tracking-wider uppercase text-slate-600 hover:text-white px-4 py-2 rounded-full transition-all duration-300"
                                    style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                                >
                                    {l.name}
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Right — form */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {['name', 'email'].map((key) => (
                                <div key={key}>
                                    <label className="text-[10px] text-slate-600 block mb-2 tracking-wider uppercase font-semibold">
                                        {key}
                                    </label>
                                    <input
                                        type={key === 'email' ? 'email' : 'text'}
                                        value={form[key]}
                                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                        onFocus={() => setFocus(key)}
                                        onBlur={() => setFocus(null)}
                                        required
                                        className="w-full bg-transparent border-b py-3 text-sm text-white outline-none placeholder:text-slate-800 transition-all duration-300"
                                        style={{ borderColor: focus === key ? theme.primary : 'rgba(255,255,255,0.06)' }}
                                        placeholder={key === 'email' ? 'email@domain.com' : 'Your name'}
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="text-[10px] text-slate-600 block mb-2 tracking-wider uppercase font-semibold">
                                    Message
                                </label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    onFocus={() => setFocus('message')}
                                    onBlur={() => setFocus(null)}
                                    rows={3}
                                    required
                                    className="w-full bg-transparent border-b py-3 text-sm text-white outline-none resize-none placeholder:text-slate-800 transition-all duration-300"
                                    style={{ borderColor: focus === 'message' ? theme.primary : 'rgba(255,255,255,0.06)' }}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={submitted}
                                className="mt-2 px-8 py-3.5 rounded-full text-sm font-semibold tracking-wider transition-all duration-300"
                                style={{
                                    background: submitted ? 'transparent' : `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                                    color: submitted ? theme.primary : '#fff',
                                    border: `1px solid ${theme.primary}`,
                                    boxShadow: submitted ? 'none' : `0 4px 20px ${theme.primary}20`,
                                }}
                            >
                                {submitted ? '✓ Sent!' : 'Send →'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Integrated footer bar */}
            <div className="w-full px-6 sm:px-10 md:px-16 py-5 border-t border-white/[0.04]">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-700 tracking-wider">Built by <span className="text-slate-500">Satyajit Samal</span></span>
                    <span className="text-[10px] text-slate-700 tracking-wider">IIIT Bhubaneswar · B.Tech CSE · 2026</span>
                    <span className="text-[10px] text-slate-700 tracking-wider">React · Three.js · Framer Motion</span>
                </div>
            </div>
        </section>
    );
}
