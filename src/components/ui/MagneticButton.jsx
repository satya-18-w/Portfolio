import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { cn } from '../../lib/utils';

export function MagneticButton({
    children,
    className,
    intensity = 0.5,
    springConfig = { stiffness: 150, damping: 15, mass: 0.1 },
    ...props
}) {
    const ref = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const xPos = clientX - (left + width / 2);
        const yPos = clientY - (top + height / 2);

        x.set(xPos * intensity);
        y.set(yPos * intensity);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                x: springX,
                y: springY,
            }}
            className={cn(
                "relative overflow-hidden inline-flex items-center justify-center transition-colors",
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
        </motion.button>
    );
}
