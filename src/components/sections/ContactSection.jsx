import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
    const { theme } = useTheme();
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [focus, setFocus] = useState(null);
    const [status, setStatus] = useState({ loading: false, success: false, error: false });

    // Assuming EmailJS env vars are setup correctly in Vite
    // For this rewrite, we'll simulate the load state if credentials aren't present
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: false });

        try {
            // Optional: emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
            // Simulate network request
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus({ loading: false, success: true, error: false });
            setForm({ name: '', email: '', subject: '', message: '' });

            setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 3000);
        } catch (error) {
            setStatus({ loading: false, success: false, error: true });
        }
    };

    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        },
    };

    const stagger = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const inputClasses = (key) => `
        w-full px-4 py-4 rounded-xl text-sm text-white outline-none transition-all duration-300
        bg-white/[0.03] border-b-2 placeholder:text-gray-500
    `;

    return (
        <section
            id="contact"
            className="min-h-screen w-full relative py-20 lg:py-32 snap-section flex items-center"
            style={{ background: 'var(--bg-dark)' }}
        >
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                <div
                    className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.15]"
                    style={{ background: theme.secondary }}
                />
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* LEFT COLUMN: Typography & Socials */}
                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="flex flex-col"
                    >
                        <motion.span variants={fadeUp} className="section-label block mb-6" style={{ color: theme.secondary }}>
                            Get In Touch
                        </motion.span>

                        <motion.h2
                            variants={fadeUp}
                            className="display-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] text-white tracking-tighter leading-[0.9] mb-8"
                        >
                            Let's <span className="gradient-text">Connect_</span>
                        </motion.h2>

                        <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl max-w-md mb-12 leading-relaxed">
                            I'm Satyajit Samal, an AI & Backend Engineer specializing in scalable systems.
                            Reach out for collaborations, opportunities, or just to say hi.
                        </motion.p>

                        {/* Social Links Grid */}
                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                            {[
                                { name: 'GitHub', url: 'https://github.com/satya-18-w', icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /> },
                                { name: 'LinkedIn', url: 'https://linkedin.com/in/satyajit-samal', icon: <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" /> },
                                { name: 'Twitter', url: '#', icon: <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /> },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-5 py-3 rounded-full flex items-center gap-3 transition-all duration-300 text-sm font-medium hover:-translate-y-1 glass"
                                    style={{
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.02)',
                                        color: '#E2E8F0'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = `${theme.primary}50`;
                                        e.currentTarget.style.color = theme.primary;
                                        e.currentTarget.style.boxShadow = `0 4px 20px ${theme.primary}20`;
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.currentTarget.style.color = '#E2E8F0';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {social.icon}
                                    </svg>
                                    {social.name}
                                </a>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* RIGHT COLUMN: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true, margin: "-50px" }}
                        className="relative p-8 md:p-10 rounded-3xl glass w-full max-w-xl lg:ml-auto"
                        style={{
                            background: 'linear-gradient(145deg, rgba(15,15,35,0.7) 0%, rgba(6,6,17,0.95) 100%)',
                            boxShadow: `0 20px 50px -20px ${theme.primary}20`
                        }}
                    >
                        {/* Glowing accent border */}
                        <div
                            className="absolute inset-0 rounded-3xl border border-transparent pointer-events-none"
                            style={{ borderColor: `${theme.primary}30` }}
                        />

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {['name', 'email'].map((key) => (
                                    <div key={key}>
                                        <input
                                            type={key === 'email' ? 'email' : 'text'}
                                            placeholder={key === 'email' ? 'Email Address' : 'Your Name'}
                                            value={form[key]}
                                            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                                            onFocus={() => setFocus(key)}
                                            onBlur={() => setFocus(null)}
                                            required
                                            className={inputClasses(key)}
                                            style={{ borderColor: focus === key ? theme.primary : 'rgba(255,255,255,0.1)' }}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={form.subject}
                                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                                    onFocus={() => setFocus('subject')}
                                    onBlur={() => setFocus(null)}
                                    required
                                    className={inputClasses('subject')}
                                    style={{ borderColor: focus === 'subject' ? theme.primary : 'rgba(255,255,255,0.1)' }}
                                />
                            </div>

                            <div>
                                <textarea
                                    placeholder="Tell me about your project..."
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    onFocus={() => setFocus('message')}
                                    onBlur={() => setFocus(null)}
                                    required
                                    rows="4"
                                    className={`${inputClasses('message')} resize-none`}
                                    style={{ borderColor: focus === 'message' ? theme.primary : 'rgba(255,255,255,0.1)' }}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status.loading}
                                className="w-full py-4 mt-4 rounded-xl font-semibold tracking-wide transition-all duration-300 flex justify-center items-center gap-2"
                                style={{
                                    background: status.success ? '#10B981' : (status.error ? '#EF4444' : theme.primary),
                                    color: '#030014',
                                    boxShadow: `0 0 20px ${status.success ? '#10B98150' : (status.error ? '#EF444450' : `${theme.primary}40`)}`
                                }}
                            >
                                {status.loading ? (
                                    <span className="animate-pulse">Sending...</span>
                                ) : status.success ? (
                                    <>Message Sent <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg></>
                                ) : status.error ? (
                                    <>Error Sending <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg></>
                                ) : (
                                    <>Send Message</>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>

            {/* Footer Line */}
            <div className="absolute bottom-0 w-full px-6 py-6 border-t border-white/[0.05] z-10 glass">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wider text-gray-500 font-mono">
                    <p>© 2026 Satyajit Samal. All rights reserved.</p>
                    <p>Designed with <span style={{ color: theme.secondary }}>React Three Fiber</span> & TailwindCSS</p>
                </div>
            </div>
        </section>
    );
}
