import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

// Basement is the only theme. There is no theme switching anywhere in the
// app — SKINS exists as a single-entry object so components that destructure
// theme.* fields keep working without a wider rewrite.
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

export const useTheme = () => useContext(ThemeContext);
