import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const [isHidden, setIsHidden] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        const handleHoverStart = (e) => {
            const target = e.target;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover') ||
                target.closest('.cursor-hover')
            ) {
                setIsHovered(true);
            }
        };

        const handleHoverEnd = () => {
            setIsHovered(false);
        };

        // Hide default cursor globally
        document.documentElement.style.cursor = 'none';

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);
        
        // Use capture phase for faster response
        document.addEventListener('mouseover', handleHoverStart, true);
        document.addEventListener('mouseout', handleHoverEnd, true);

        return () => {
            document.documentElement.style.cursor = 'auto';
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseover', handleHoverStart, true);
            document.removeEventListener('mouseout', handleHoverEnd, true);
        };
    }, []);

    if (typeof window === 'undefined' || window.innerWidth < 1024) return null; // Disable on touch/mobile devices

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-9999 mix-blend-difference flex items-center justify-center"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    backgroundColor: 'white',
                    opacity: isHidden ? 0 : 1
                }}
                animate={{
                    scale: isHovered ? 2.5 : 1,
                }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
            >
                {/* Optional inner dot or text on hover could go here */}
            </motion.div>
        </>
    );
}
