import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Each theme is a COMPLETE UI skin — not just colors
export const SKINS = {
    cyber: {
        key: 'cyber',
        name: 'Pop-Brutalism',
        emoji: '🥊',
        // ToyFight signature pastel palette
        primary: '#E2D1F9', // Lavender pill
        secondary: '#FEFAE0', // Pale yellow pill
        highlight: '#FAEDCD', // Peach pill
        bg: '#EFEDE7', // Warm Cream (ToyFight base)
        bgAlt: '#E8E4D9',
        surface: '#FFFFFF',
        surfaceBorder: 'rgba(0,0,0,0.1)',
        text: '#000000', // Heavy black text
        textMuted: '#555555',
        // UI characteristics
        bodyBg: '#EFEDE7',
        fontHeading: "'Space Grotesk', sans-serif",
        fontBody: "'Inter', sans-serif",
        fontMono: "'JetBrains Mono', monospace", // Using JetBrains as the retro/pixel contrast
        cardStyle: 'solid',
        headingStyle: 'solid',
        btnStyle: 'pill',
        sectionStyle: 'light',
        animationStyle: 'snap',
    },
    minimal: {
        key: 'minimal',
        name: 'Minimal',
        emoji: '◎',
        // Warm light palette — exactly Stitch orange pages
        primary: '#e85d04',
        secondary: '#f48c06',
        highlight: '#faa307',
        bg: '#f8f4f0',
        bgAlt: '#f0ebe4',
        surface: 'rgba(232,93,4,0.06)',
        surfaceBorder: 'rgba(232,93,4,0.18)',
        text: '#1a1a1a',
        textMuted: '#6b6b6b',
        bodyBg: '#f8f4f0',
        fontHeading: "'Space Grotesk', sans-serif",
        fontBody: "'Inter', sans-serif",
        fontMono: "'JetBrains Mono', monospace",
        cardStyle: 'outline',
        headingStyle: 'solid',
        btnStyle: 'pill',
        sectionStyle: 'light',
        animationStyle: 'snap',
    },
    terminal: {
        key: 'terminal',
        name: 'Terminal',
        emoji: '▶',
        // Matrix green on black
        primary: '#00ff41',
        secondary: '#39ff14',
        highlight: '#7fff00',
        bg: '#000000',
        bgAlt: '#0a0a0a',
        surface: 'rgba(0,255,65,0.05)',
        surfaceBorder: 'rgba(0,255,65,0.2)',
        text: '#e0ffe0',
        textMuted: '#4caf50',
        bodyBg: '#000000',
        fontHeading: "'JetBrains Mono', monospace",
        fontBody: "'JetBrains Mono', monospace",
        fontMono: "'JetBrains Mono', monospace",
        cardStyle: 'outline',
        headingStyle: 'solid',
        btnStyle: 'sharp',
        sectionStyle: 'terminal',
        animationStyle: 'glitch',
    },
    brutalist: {
        key: 'brutalist',
        name: 'Basement',
        emoji: '◼',
        // Ultimate high contrast B&W with Neon Orange
        primary: '#FF4D00', // Neon orange
        secondary: '#00F5FF',
        highlight: '#FF006E',
        bg: '#000000',
        bgAlt: '#050505',
        surface: 'rgba(255,255,255,0.02)',
        surfaceBorder: 'rgba(255,255,255,0.15)', // Sharp hairline grids
        text: '#ffffff',
        textMuted: '#888888',
        bodyBg: '#000000',
        fontHeading: "'Space Grotesk', sans-serif",
        fontBody: "'Inter', sans-serif",
        fontMono: "'JetBrains Mono', monospace",
        cardStyle: 'raw',
        headingStyle: 'underline',
        btnStyle: 'sharp',
        sectionStyle: 'dark',
        animationStyle: 'snap',
    },
};

export function ThemeProvider({ children }) {
    const [themeKey, setThemeKey] = useState('cyber');
    const theme = SKINS[themeKey];

    const cycleTheme = () => {
        const keys = Object.keys(SKINS);
        const idx = keys.indexOf(themeKey);
        setThemeKey(keys[(idx + 1) % keys.length]);
    };

    React.useEffect(() => {
        // Apply CSS vars AND body class for full-skin transitions
        const root = document.documentElement;
        root.style.setProperty('--accent-primary', theme.primary);
        root.style.setProperty('--accent-secondary', theme.secondary);
        root.style.setProperty('--accent-highlight', theme.highlight);
        root.style.setProperty('--bg-main', theme.bg);
        root.style.setProperty('--text-primary', theme.text);
        root.style.setProperty('--text-secondary', theme.textMuted);
        root.style.setProperty('--surface', theme.surface);
        root.style.setProperty('--surface-border', theme.surfaceBorder);

        // Body background transition
        document.body.style.background = theme.bodyBg;
        document.body.style.color = theme.text;
        document.body.style.transition = 'background 0.6s ease, color 0.4s ease';

        // Theme class on root for CSS targeting
        root.setAttribute('data-theme', themeKey);
    }, [theme, themeKey]);

    return (
        <ThemeContext.Provider value={{ theme, themeKey, cycleTheme, setThemeKey, SKINS, THEMES: SKINS }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
