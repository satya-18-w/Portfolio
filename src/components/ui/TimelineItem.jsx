import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Encapsulates the 3-column alternating timeline logic for the Journey evolution section.
 * @param {boolean} isEven - dictates odd/even layout shift
 */
export default function TimelineItem({ milestone, isEven, index }) {
    const { theme } = useTheme();

    // Shared Card Design replicating the minimalist orange-tinted screenshot precisely
    const CardContent = () => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`min-w-0 flex flex-col w-full md:max-w-[420px] rounded-2xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.05)] border p-4 sm:p-5 md:p-8 ${isEven ? 'md:ml-auto' : 'md:mr-auto'}`}
            style={{ backgroundColor: theme.bgAlt || '#fff', borderColor: `${theme.primary}33` }}
        >
            <div className="flex flex-col gap-3">
                {/* Period Pill string text */}
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase w-max mb-1" style={{ color: theme.primary }}>
                    {milestone.period}
                </span>

                <h3 className="text-xl md:text-2xl font-bold tracking-tight break-words" style={{ color: theme.text }}>
                    {milestone.title}
                </h3>

                {milestone.institution && (
                    <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.08em] break-words" style={{ color: theme.textMuted }}>
                        {milestone.institution}
                    </p>
                )}

                <p className="text-[13px] md:text-sm leading-relaxed mt-1 mb-4 break-words" style={{ color: theme.textMuted }}>
                    {milestone.desc}
                </p>

                {Array.isArray(milestone.bullets) && milestone.bullets.length > 0 && (
                    <ul className="mb-4 space-y-1.5">
                        {milestone.bullets.map((point) => (
                            <li key={point} className="text-[12px] md:text-[13px] leading-relaxed break-words" style={{ color: theme.textMuted }}>
                                • {point}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Solid minimal tags */}
                <div className="flex flex-wrap gap-2">
                    {milestone.tags.map(tag => (
                        <span key={tag} className="text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider" style={{ color: theme.primary, backgroundColor: `${theme.primary}1A` }}>
                            {tag}
                        </span>
                    ))}
                </div>

                {milestone.photoUrl && (
                    <a
                        href={milestone.photoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.14em] px-3 py-2 rounded-md border w-max transition-transform hover:-translate-y-0.5"
                        style={{ borderColor: `${theme.primary}55`, color: theme.primary, backgroundColor: `${theme.primary}12` }}
                    >
                        View Photos
                    </a>
                )}
            </div>
        </motion.div>
    );

    // Timeline Node (Glowing Dot) exactly aligned
    const TimelineNode = () => (
        <div className="h-full w-full flex align-top justify-center py-8">
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-[11px] h-[11px] rounded-full z-10"
                style={{ backgroundColor: theme.primary, boxShadow: `0 0 0 4px ${theme.bg || '#fff'}, 0 0 12px ${theme.primary}99` }}
            />
        </div>
    );

    // Outline Side Icon perfectly aligned to the top edge of the card
    const SideIcon = () => (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -10 : 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className={`py-6 ${isEven ? 'mr-auto pl-8 sm:pl-12 md:pl-24 lg:pl-32' : 'ml-auto pr-8 sm:pr-12 md:pr-24 lg:pr-32'}`}
            style={{ color: `${theme.primary}66` }}
        >
            {milestone.icon}
        </motion.div>
    );

    return (
        <div className="flex flex-col md:grid md:grid-cols-[1fr_48px_1fr] md:gap-4 w-full relative pl-0 md:pl-0">
            {/* Desktop Left / Mobile Hidden if Odd */}
            <div className={`justify-end ${isEven ? 'hidden md:flex' : 'hidden md:flex'}`}>
                {!isEven ? <CardContent /> : <SideIcon />}
            </div>

            {/* Timeline Element (Mobile: fixed left, Desktop: centered column) */}
            <div className="absolute left-1 top-0 h-full w-10 md:w-auto md:relative md:h-full flex justify-center shrink-0">
                <TimelineNode />
            </div>

            {/* Desktop Right / Mobile Always Card */}
            <div className={`justify-start flex w-full`}>
                <div className="w-full">
                    {/* On mobile, ALWAYS show the card regardless of isEven. */}
                    <div className="block md:hidden pl-[46px] pr-2 pt-4">
                        <CardContent />
                    </div>
                    <div className="hidden md:flex w-full">
                        {isEven ? <CardContent /> : <SideIcon />}
                    </div>
                </div>
            </div>
        </div>
    );
}
