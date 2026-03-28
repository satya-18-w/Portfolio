import React, { useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

/**
 * Premium physics-based SkillCard — draggable across ALL themes.
 * Features: rubber-band spring physics, 3D tilt on hover, momentum, elastic snap-back.
 */
export default function SkillCard({ skill, index, constraintsRef, activeCategory }) {
    const { theme, themeKey } = useTheme();
    const cardRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);

    // ─── 3D TILT SYSTEM ─────────────────────────────────
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

    const handleMouseMove = useCallback((e) => {
        if (isDragging) return;
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }, [isDragging, mouseX, mouseY]);

    const handleMouseLeave = useCallback(() => {
        mouseX.set(0);
        mouseY.set(0);
    }, [mouseX, mouseY]);

    // ─── FLOATING ANIMATION ─────────────────────────────
    const floatDuration = 3.5 + (index * 0.3);
    const floatDelay = index * 0.15;
    const floatY = (index % 2 === 0) ? [0, -6, 0] : [0, 6, 0];

    // ─── THEME STYLE MAP ────────────────────────────────
    const CARD_STYLES = {
        cyber: {
            bg: '#FFFFFF',
            border: '3px solid #000000',
            shadow: '5px 5px 0px #000000',
            dragShadow: '12px 12px 0px rgba(0,0,0,0.9)',
            hoverShadow: '8px 8px 0px #000000',
            radius: '20px',
            hoverBg: ['#E2D1F9', '#FEFAE0', '#FAEDCD', '#E0FBFC'][index % 4],
            nameColor: '#000000',
            nameFont: 'font-black uppercase tracking-widest',
            nameSize: 'text-[11px]',
            iconSize: 'text-3xl',
            barColor: '#000000',
            barBg: 'rgba(0,0,0,0.1)',
            levelColor: '#000000',
        },
        minimal: {
            bg: '#FFFFFF',
            border: '1.5px solid rgba(232,93,4,0.15)',
            shadow: '0 2px 12px rgba(0,0,0,0.04)',
            dragShadow: '0 20px 40px rgba(232,93,4,0.2)',
            hoverShadow: '0 8px 24px rgba(232,93,4,0.1)',
            radius: '16px',
            hoverBg: 'rgba(232,93,4,0.06)',
            nameColor: theme.text,
            nameFont: 'font-semibold',
            nameSize: 'text-xs',
            iconSize: 'text-2xl',
            barColor: '#e85d04',
            barBg: 'rgba(232,93,4,0.12)',
            levelColor: '#e85d04',
        },
        terminal: {
            bg: 'rgba(0,255,65,0.02)',
            border: '1px solid rgba(0,255,65,0.2)',
            shadow: '0 0 8px rgba(0,255,65,0.06)',
            dragShadow: '0 0 30px rgba(0,255,65,0.3), 0 0 60px rgba(0,255,65,0.1)',
            hoverShadow: '0 0 20px rgba(0,255,65,0.15)',
            radius: '8px',
            hoverBg: 'rgba(0,255,65,0.06)',
            nameColor: '#00ff41',
            nameFont: 'font-bold font-mono uppercase',
            nameSize: 'text-[10px]',
            iconSize: 'text-xl',
            barColor: '#00ff41',
            barBg: 'rgba(0,255,65,0.1)',
            levelColor: '#00ff41',
        },
        brutalist: {
            bg: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.1)',
            shadow: 'none',
            dragShadow: '0 0 24px rgba(255,77,0,0.25)',
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
        },
    };

    const s = CARD_STYLES[themeKey] || CARD_STYLES.cyber;

    return (
        <motion.div
            ref={cardRef}
            // ─── PHYSICS DRAG (ALL THEMES) ───────────
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.15}
            dragMomentum={true}
            dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={() => setTimeout(() => setIsDragging(false), 100)}
            // ─── ANIMATIONS ──────────────────────────
            whileDrag={{
                scale: 1.12,
                zIndex: 100,
                boxShadow: s.dragShadow,
                cursor: 'grabbing',
            }}
            whileHover={{
                scale: isDragging ? 1.12 : 1.04,
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
            className="relative flex flex-col items-center justify-center gap-2.5 cursor-grab active:cursor-grabbing select-none group"
            style={{
                background: s.bg,
                border: s.border,
                borderRadius: s.radius,
                boxShadow: s.shadow,
                padding: '20px 16px',
                minHeight: themeKey === 'cyber' ? '160px' : '140px',
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
