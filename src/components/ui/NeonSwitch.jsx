import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function NeonSwitch() {
    const { theme, cycleTheme } = useTheme();

    return (
        <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 1 }}
            onClick={cycleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500"
            style={{
                background: 'rgba(6,6,17,0.85)',
                backdropFilter: 'blur(16px)',
                border: `1px solid ${theme.primary}20`,
            }}
            title={`Theme: ${theme.name}`}
        >
            <div
                className="w-2.5 h-2.5 rounded-full transition-all duration-700"
                style={{ background: theme.primary, boxShadow: `0 0 8px ${theme.primary}40` }}
            />
        </motion.button>
    );
}
