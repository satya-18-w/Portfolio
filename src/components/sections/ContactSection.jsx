import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

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
    const isPop = themeKey === 'cyber';
    const isTerminal = themeKey === 'terminal';

    // Theme-aware styling
    const sectionBg = isLight ? theme.bgAlt : theme.bg;
    const headingColor = isLight ? '#000' : theme.text;
    const inputTextColor = isLight ? '#000' : theme.text;
    const mutedColor = theme.textMuted;
    const borderColor = isLight ? `${theme.primary}25` : 'rgba(255,255,255,0.06)';
    const placeholderColor = isLight ? '#aaa' : '#334155';

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
            className="min-h-screen w-full relative overflow-hidden flex flex-col"
            style={{ background: sectionBg, color: headingColor }}
        >
            {/* Main content — centered */}
            <div className="flex-1 flex flex-col justify-center max-w-7xl mx-auto w-full px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
                    {/* Left — bold heading & info */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex flex-col justify-center"
                    >
                        <motion.span variants={fadeUp}
                            className="text-[11px] font-semibold tracking-[0.2em] uppercase block mb-3"
                            style={{ color: theme.primary, fontFamily: theme.fontMono }}>
                            Contact
                        </motion.span>

                        <motion.h2
                            variants={fadeUp}
                            className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-[0.9]"
                            style={{ fontFamily: theme.fontHeading, color: headingColor }}
                        >
                            Let's Get<br />In Touch
                        </motion.h2>

                        <motion.a
                            variants={fadeUp}
                            href="mailto:satyajit@iiit-bh.ac.in"
                            className="text-sm sm:text-base transition-colors duration-300 mb-6 block"
                            style={{ color: mutedColor }}
                        >
                            satyajit@iiit-bh.ac.in
                        </motion.a>

                        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-8">
                            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: theme.primary }} />
                            <span className="text-xs" style={{ color: mutedColor }}>Available for internships & collaborations</span>
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
                                    className="text-[10px] font-semibold tracking-wider uppercase px-4 py-2 rounded-full transition-all duration-300"
                                    style={{ color: mutedColor, border: `1px solid ${borderColor}` }}
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
                                    <label className="text-[10px] block mb-2 tracking-wider uppercase font-semibold"
                                        style={{ color: mutedColor, fontFamily: theme.fontMono }}>
                                        {key}
                                    </label>
                                    <input
                                        type={key === 'email' ? 'email' : 'text'}
                                        value={form[key]}
                                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                        onFocus={() => setFocus(key)}
                                        onBlur={() => setFocus(null)}
                                        required
                                        className="w-full bg-transparent border-b py-3 text-sm outline-none transition-all duration-300"
                                        style={{
                                            borderColor: focus === key ? theme.primary : borderColor,
                                            color: inputTextColor,
                                            '--tw-placeholder-color': placeholderColor,
                                        }}
                                        placeholder={key === 'email' ? 'email@domain.com' : 'Your name'}
                                    />
                                </div>
                            ))}
                            <div>
                                <label className="text-[10px] block mb-2 tracking-wider uppercase font-semibold"
                                    style={{ color: mutedColor, fontFamily: theme.fontMono }}>
                                    Message
                                </label>
                                <textarea
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    onFocus={() => setFocus('message')}
                                    onBlur={() => setFocus(null)}
                                    rows={3}
                                    required
                                    className="w-full bg-transparent border-b py-3 text-sm outline-none resize-none transition-all duration-300"
                                    style={{
                                        borderColor: focus === 'message' ? theme.primary : borderColor,
                                        color: inputTextColor,
                                    }}
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={submitted}
                                className="mt-2 px-8 py-3.5 text-sm font-bold tracking-wider transition-all duration-300"
                                style={{
                                    background: submitted ? 'transparent' : theme.primary,
                                    color: submitted ? theme.primary : (isLight ? '#000' : '#fff'),
                                    border: isPop ? '2px solid #000' : `1px solid ${theme.primary}`,
                                    borderRadius: theme.btnStyle === 'sharp' ? '4px' : '9999px',
                                    boxShadow: isPop && !submitted ? '4px 4px 0px #000' : 'none',
                                    fontFamily: theme.fontMono,
                                }}
                            >
                                {submitted ? '✓ Sent!' : isTerminal ? '> send_message.sh' : 'Send →'}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
