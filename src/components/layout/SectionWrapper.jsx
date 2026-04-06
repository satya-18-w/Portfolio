import React, { forwardRef, useCallback, useRef } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';

/**
 * Structural parent enforcing vertical rhythm margins for major block divisions.
 */
const SectionWrapper = forwardRef(({ id, children, className = '', style = {} }, ref) => {
    const localRef = useRef(null);

    const setRefs = useCallback((node) => {
        localRef.current = node;

        if (typeof ref === 'function') {
            ref(node);
        } else if (ref) {
            ref.current = node;
        }
    }, [ref]);

    // Smoothly fade and slide sections during viewport handoff.
    const { scrollYProgress } = useScroll({
        target: localRef,
        offset: ['start 95%', 'end 8%'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.24, 1, 1, 0.2]);
    const y = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [42, 0, 0, -42]);
    const scale = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.98, 1, 1, 0.98]);
    const blur = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [8, 0, 0, 8]);
    const filter = useMotionTemplate`blur(${blur}px)`;

    return (
        <motion.section
            id={id}
            ref={setRefs}
            className={`py-24 md:py-32 lg:py-40 relative overflow-hidden ${className}`}
            style={{ ...style, opacity, y, scale, filter }}
        >
            {children}
        </motion.section>
    );
});

SectionWrapper.displayName = 'SectionWrapper';
export default SectionWrapper;
