/**
 * Skin utility hooks / components — centralised per-skin style logic.
 * Import these in any section to get the right look for the active theme.
 */
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

/**
 * Returns a className string for a card based on active skin.
 */
export function useSkinCard() {
    const { theme } = useTheme();
    const base = 'transition-all duration-300';
    switch (theme.cardStyle) {
        case 'glass':
            return `${base} backdrop-blur-xl bg-white/5 border border-white/8 rounded-2xl`;
        case 'outline':
            return `${base} bg-transparent border-2 rounded-2xl`;
        case 'raw':
            return `${base} bg-transparent border-l-4 rounded-none`;
        case 'solid':
        default:
            return `${base} rounded-2xl`;
    }
}

/**
 * Heading component: renders with current skin style
 */
export function SkinHeading({ children, className = '', as: Tag = 'h2', gradient = false }) {
    const { theme } = useTheme();
    const base = `font-black leading-none tracking-tighter ${className}`;
    const fontStyle = { fontFamily: theme.fontHeading };

    if (theme.headingStyle === 'gradient' && gradient) {
        return (
            <Tag className={base} style={{ ...fontStyle, background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {children}
            </Tag>
        );
    }
    if (theme.headingStyle === 'underline') {
        return (
            <Tag className={`${base} relative inline-block`} style={{ ...fontStyle, color: theme.text }}>
                {children}
                <span className="absolute -bottom-2 left-0 h-1 w-full" style={{ background: theme.primary }} />
            </Tag>
        );
    }
    if (theme.headingStyle === 'italic') {
        return <Tag className={`${base} italic`} style={{ ...fontStyle, color: theme.text }}>{children}</Tag>;
    }
    return <Tag className={base} style={{ ...fontStyle, color: theme.text }}>{children}</Tag>;
}

/**
 * Section wrapper — applies correct background per skin
 */
export function SkinSection({ id, children, alt = false, className = '' }) {
    const { theme } = useTheme();

    let bg = alt ? theme.bgAlt : theme.bg;

    if (theme.sectionStyle === 'terminal') {
        bg = alt ? '#050505' : '#000000';
    }

    return (
        <section id={id} className={`relative overflow-hidden py-28 ${className}`}
            style={{ background: bg, color: theme.text }}>
            {/* Terminal scanline overlay */}
            {theme.sectionStyle === 'terminal' && (
                <div className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: `repeating-linear-gradient(0deg, rgba(0,255,65,0.03) 0px, rgba(0,255,65,0.03) 1px, transparent 1px, transparent 4px)`,
                    }} />
            )}
            {/* Minimal grid lines (light theme) */}
            {theme.sectionStyle === 'light' && (
                <div className="absolute inset-0 pointer-events-none z-0"
                    style={{
                        backgroundImage: `linear-gradient(${theme.primary}10 1px, transparent 1px), linear-gradient(90deg, ${theme.primary}10 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }} />
            )}
            {/* Brutalist noise */}
            {theme.cardStyle === 'raw' && (
                <div className="absolute inset-0 pointer-events-none z-0 opacity-5"
                    style={{
                        backgroundImage: `repeating-linear-gradient(45deg, ${theme.primary} 0px, ${theme.primary} 1px, transparent 1px, transparent 8px)`,
                    }} />
            )}
            <div className="relative z-10">{children}</div>
        </section>
    );
}

/**
 * Primary CTA button — full skin-aware
 */
export function SkinButton({ children, href, onClick, className = '', small = false }) {
    const { theme } = useTheme();
    const size = small ? 'px-5 py-2 text-xs' : 'px-8 py-3.5 text-sm';
    const font = 'font-bold uppercase tracking-wide';

    let style = {};
    let cls = `inline-flex items-center justify-center gap-2 transition-all duration-300 ${size} ${font} ${className}`;

    switch (theme.btnStyle) {
        case 'pill':
            cls += ' rounded-full hover:scale-105';
            style = { background: theme.primary, color: '#fff', boxShadow: `0 0 24px ${theme.primary}40` };
            if (theme.sectionStyle === 'light') style.color = '#fff';
            break;
        case 'sharp':
            cls += ' rounded-none hover:translate-x-1';
            style = { background: theme.primary, color: '#000', border: `2px solid ${theme.primary}` };
            break;
        case 'ghost':
            cls += ' rounded-xl border-2 hover:bg-white/10';
            style = { borderColor: theme.primary, color: theme.primary };
            break;
        case 'rounded':
        default:
            cls += ' rounded-full hover:scale-105';
            style = { background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`, color: '#000', boxShadow: `0 0 24px ${theme.primary}30` };
    }

    if (href) return <a href={href} className={cls} style={style}>{children}</a>;
    return <button onClick={onClick} className={cls} style={style}>{children}</button>;
}

/**
 * Tag/badge pill
 */
export function SkinTag({ children }) {
    const { theme } = useTheme();
    return (
        <span className="px-3 py-1 text-xs font-mono font-medium rounded-md transition-colors"
            style={{
                background: `${theme.primary}15`,
                border: `1px solid ${theme.primary}40`,
                color: theme.primary,
                fontFamily: theme.fontMono,
            }}>
            {children}
        </span>
    );
}
