import React from 'react';
import { motion } from 'framer-motion';

export function Marquee({ text, speed = 15, direction = 'left', className = '', repeat = 4 }) {
    return (
        <div className={`flex w-full overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div
                className="flex min-w-full shrink-0 items-center justify-around gap-4"
                initial={{ x: direction === 'left' ? 0 : '-100%' }}
                animate={{ x: direction === 'left' ? '-100%' : 0 }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            >
                {Array(repeat).fill(0).map((_, i) => (
                    <span key={`a-${i}`} className="px-4">{text}</span>
                ))}
            </motion.div>
            <motion.div
                className="flex min-w-full shrink-0 items-center justify-around gap-4"
                initial={{ x: direction === 'left' ? 0 : '-100%' }}
                animate={{ x: direction === 'left' ? '-100%' : 0 }}
                transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
            >
                {Array(repeat).fill(0).map((_, i) => (
                    <span key={`b-${i}`} className="px-4">{text}</span>
                ))}
            </motion.div>
        </div>
    );
}
