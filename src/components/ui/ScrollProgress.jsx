import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });
    
    const { theme } = useTheme();

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-9999 origin-left"
            style={{ 
                scaleX, 
                backgroundColor: theme.primary,
                boxShadow: `0 0 10px ${theme.primary}`
            }}
        />
    );
}
