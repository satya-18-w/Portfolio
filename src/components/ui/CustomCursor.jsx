import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor({ themeKey }) {
    const [isHovering, setIsHovering] = useState(false);
    const [cursorText, setCursorText] = useState('');

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16);
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            const target = e.target;
            const isClickable = target.closest('a, button, input, textarea, [data-cursor="hover"]');

            if (isClickable) {
                setIsHovering(true);
                const customText = target.closest('[data-cursor-text]')?.getAttribute('data-cursor-text');
                setCursorText(customText || '');
            } else {
                setIsHovering(false);
                setCursorText('');
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    // Disable custom cursor on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
        return null;
    }

    const isPop = themeKey === 'pop';
    const isTerminal = themeKey === 'terminal';

    return (
        <>
            {/* The main ring */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none flex items-center justify-center mix-blend-difference"
                style={{
                    zIndex: 9999,
                    x: cursorXSpring,
                    y: cursorYSpring,
                    border: '2px solid white',
                    color: 'white',
                }}
                animate={{
                    scale: isHovering ? (cursorText ? 2.5 : 1.5) : 1,
                    backgroundColor: isHovering ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)',
                    mixBlendMode: isHovering ? 'difference' : 'difference'
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Optional explicit text inside the cursor (like "VIEW") */}
                {cursorText && (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[6px] font-black uppercase text-black"
                    >
                        {cursorText}
                    </motion.span>
                )}
            </motion.div>

            {/* The tiny precise dot in the center */}
            <motion.div
                className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none mix-blend-difference bg-white"
                style={{
                    zIndex: 9999,
                    x: useMotionValue(cursorX.get() + 13), // Offset center
                    y: useMotionValue(cursorY.get() + 13),
                }}
                animate={{
                    x: cursorX.get() + 13,
                    y: cursorY.get() + 13,
                    opacity: isHovering ? 0 : 1
                }}
                transition={{ type: 'tween', duration: 0 }} // Instant follow for the dot
            />
        </>
    );
}
