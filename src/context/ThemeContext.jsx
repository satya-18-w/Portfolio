import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const THEMES = {
    cyber: { primary: '#6366f1', secondary: '#8b5cf6', highlight: '#06b6d4', name: 'Cyber' },
    emerald: { primary: '#10b981', secondary: '#059669', highlight: '#34d399', name: 'Emerald' },
    amber: { primary: '#f59e0b', secondary: '#d97706', highlight: '#fbbf24', name: 'Amber' },
    rose: { primary: '#f43f5e', secondary: '#e11d48', highlight: '#fb7185', name: 'Rose' },
};

export function ThemeProvider({ children }) {
    const [themeKey, setThemeKey] = useState('cyber');

    const cycleTheme = () => {
        const keys = Object.keys(THEMES);
        const idx = keys.indexOf(themeKey);
        setThemeKey(keys[(idx + 1) % keys.length]);
    };

    const theme = THEMES[themeKey];

    React.useEffect(() => {
        document.documentElement.style.setProperty('--accent-primary', theme.primary);
        document.documentElement.style.setProperty('--accent-secondary', theme.secondary);
        document.documentElement.style.setProperty('--accent-highlight', theme.highlight);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, themeKey, cycleTheme, setThemeKey, THEMES }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
