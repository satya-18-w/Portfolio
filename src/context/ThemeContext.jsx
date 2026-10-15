import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

// Single skin: Basement (black + orange). Kept as a context so sections read tokens from one place.
export const SKINS = {
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
    const themeKey = 'brutalist';
    const theme = SKINS[themeKey];

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
        <ThemeContext.Provider value={{ theme, themeKey, SKINS }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
