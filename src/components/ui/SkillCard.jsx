import React, { useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * SkillCard — 3D tilt on hover, floating idle animation.
 */
export default function SkillCard({ skill, index }) {
    const { theme } = useTheme();
    const cardRef = useRef(null);

    // ─── 3D TILT SYSTEM ─────────────────────────────────
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = useCallback((e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    // ─── FLOATING ANIMATION ─────────────────────────────
    const floatDuration = 3.5 + (index * 0.3);
    const floatDelay = index * 0.15;
    const floatY = (index % 2 === 0) ? [0, -6, 0] : [0, 6, 0];

    // ─── CARD STYLE (Basement) ──────────────────────────
    const s = {
        bg: 'rgba(255,255,255,0.015)',
        border: '1px solid rgba(255,255,255,0.1)',
        shadow: 'none',
        hoverShadow: '0 0 16px rgba(255,77,0,0.12)',
        radius: '4px',
        hoverBg: 'rgba(255,77,0,0.08)',
        nameColor: '#ffffff',
        nameFont: 'font-bold uppercase tracking-wider',
        nameSize: 'text-[10px]',
        iconSize: 'text-xl',
        barColor: '#FF4D00',
        barBg: 'rgba(255,77,0,0.12)',
        levelColor: '#FF4D00',
    };

    return (
        <motion.div
            ref={cardRef}
            whileHover={{
                scale: 1.04,
                boxShadow: s.hoverShadow,
                zIndex: 50,
            }}
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{
                opacity: 1,
                scale: 1,
                y: floatY,
                transition: {
                    opacity: { duration: 0.4, delay: index * 0.03 },
                    scale: { duration: 0.4, delay: index * 0.03, type: 'spring', stiffness: 200, damping: 18 },
                    y: { repeat: Infinity, duration: floatDuration, delay: floatDelay, ease: "easeInOut" },
                }
            }}
            exit={{ opacity: 0, scale: 0.4, transition: { duration: 0.25 } }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative flex flex-col items-center justify-center gap-2.5 select-none group"
            style={{
                background: s.bg,
                border: s.border,
                borderRadius: s.radius,
                boxShadow: s.shadow,
                padding: '20px 16px',
                minHeight: '140px',
                height: 'auto',
                transformStyle: 'preserve-3d',
                perspective: '800px',
                rotateX, rotateY,
                willChange: 'transform',
            }}
        >
            {/* Hover fill layer */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
                style={{
                    background: s.hoverBg,
                    borderRadius: `calc(${s.radius} - 2px)`,
                }}
            />

            {/* Shine effect on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0 overflow-hidden"
                style={{ borderRadius: `calc(${s.radius} - 2px)` }}
            >
                <div
                    className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
                    style={{
                        background: `conic-gradient(from 180deg at 50% 50%, transparent, ${theme.primary}08, transparent, ${theme.primary}05, transparent)`,
                        animation: 'spin 4s linear infinite',
                    }}
                />
            </div>

            {/* Icon */}
            <span className={`${s.iconSize} relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                {skill.icon}
            </span>

            {/* Name */}
            <span
                className={`${s.nameSize} ${s.nameFont} text-center leading-tight relative z-10 px-1 max-w-full truncate`}
                style={{ color: s.nameColor }}
            >
                {skill.name}
            </span>

            {/* Progress bar */}
            <div className="w-14 h-[5px] rounded-full relative z-10 overflow-hidden" style={{ background: s.barBg }}>
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: s.barColor }}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: index * 0.04 + 0.3, ease: 'easeOut' }}
                />
            </div>

            {/* Level label */}
            <span className="text-[9px] font-mono font-bold relative z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: s.levelColor }}>
                {skill.level}%
            </span>
        </motion.div>
    );
}
