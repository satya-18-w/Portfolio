import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

// Basement is the only theme the main site renders in. `metaverse` is kept
// only for the standalone /metaverse route, which provides it directly via
// <ThemeContext.Provider> — see App.jsx — rather than through a switchable
// themeKey. There is no more theme switching anywhere in the app.
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
    metaverse: {
        key: 'metaverse',
        name: 'SatyajitVerse',
        emoji: '🌆',
        primary: '#00F5FF',
        secondary: '#8B5CF6',
        highlight: '#FF006E',
        bg: '#030014',
        bgAlt: '#0a0025',
        surface: 'rgba(0,245,255,0.05)',
        surfaceBorder: 'rgba(0,245,255,0.2)',
        text: '#E0F2FE',
        textMuted: '#64748B',
        bodyBg: '#030014',
        fontHeading: "'Space Grotesk', sans-serif",
        fontBody: "'Inter', sans-serif",
        fontMono: "'JetBrains Mono', monospace",
        cardStyle: 'glow',
        headingStyle: 'neon',
        btnStyle: 'glow',
        sectionStyle: 'immersive',
        animationStyle: 'physics',
    },
};

// Basement's values now live as static tokens in index.css :root — no more
// runtime root.style.setProperty injection, so there's nothing left to
// fight the CSS. This provider just hands the single theme object down.
export function ThemeProvider({ children }) {
    return (
        <ThemeContext.Provider value={{ theme: SKINS.brutalist, themeKey: 'brutalist', SKINS }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Used only by the standalone /metaverse route (see App.jsx) to give its
// component tree the metaverse palette without reintroducing app-wide
// theme switching.
export function MetaverseThemeProvider({ children }) {
    return (
        <ThemeContext.Provider value={{ theme: SKINS.metaverse, themeKey: 'metaverse', SKINS }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
