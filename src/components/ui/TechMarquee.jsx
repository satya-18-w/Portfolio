import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Infinite horizontal scrolling tech-stack marquee — used as a section divider.
 * Inspired by CoderGyan's ticker-style elements.
 */
const TECH_ITEMS = [
    'Go', 'Python', 'React', 'TypeScript', 'Docker', 'Kubernetes',
    'PostgreSQL', 'gRPC', 'FastAPI', 'Redis', 'Kafka', 'AWS',
    'TensorFlow', 'LangChain', 'GraphQL', 'Linux',
];

export default function TechMarquee({ direction = 'left' }) {
    const { theme, themeKey } = useTheme();

    const sep = themeKey === 'terminal' ? ' // ' : ' · ';
    const line = TECH_ITEMS.join(sep) + sep;
    const doubled = line + line + line;

    const animDir = direction === 'left'
        ? { x: ['0%', '-33.33%'] }
        : { x: ['-33.33%', '0%'] };

    return (
        <div className="w-full overflow-hidden py-5 border-y select-none"
            style={{
                borderColor: themeKey === 'cyber' ? '#00000015' : (theme.surfaceBorder || `${theme.primary}15`),
                background: themeKey === 'cyber' ? 'rgba(0,0,0,0.02)' : 'transparent',
            }}
        >
            <motion.div
                className="whitespace-nowrap"
                animate={animDir}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                style={{
                    color: theme.textMuted,
                    opacity: 0.5,
                    fontFamily: theme.fontMono,
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                }}
            >
                {doubled}
            </motion.div>
        </div>
    );
}
