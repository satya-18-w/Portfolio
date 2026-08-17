import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const count = setInterval(() => {
            setCounter((prev) => {
                if (prev < 100) {
                    // Random increment for a more organic feel
                    const inc = Math.floor(Math.random() * 15) + 1;
                    return prev + inc > 100 ? 100 : prev + inc;
                }
                clearInterval(count);
                return 100;
            });
        }, 30); // Fast organic count up

        return () => clearInterval(count);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-9999 flex flex-col items-center justify-end overflow-hidden pb-12 lg:pb-24 px-8 lg:px-24"
            style={{ background: '#030014' }}
            initial={{ y: 0 }}
            exit={{ 
                y: '-100%', 
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
            }}
        >
            <div className="w-full flex justify-between items-end relative overflow-hidden">
                <motion.div 
                    className="flex flex-col overflow-hidden"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-4 font-mono">
                        System Initialization
                    </span>
                    <span className="text-sm md:text-xl font-medium tracking-tight text-white max-w-sm">
                        Loading distributed architectures and high-performance interfaces.
                    </span>
                </motion.div>

                <motion.div 
                    className="text-[clamp(4rem,15vw,12rem)] font-black leading-none tracking-tighter text-white"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                    {counter}%
                </motion.div>
            </div>
            
            {/* Progress Bar Line */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-white/10">
                <motion.div 
                    className="h-full bg-white"
                    style={{ width: `${counter}%` }}
                    transition={{ duration: 0.1 }}
                />
            </div>
        </motion.div>
    );
}
