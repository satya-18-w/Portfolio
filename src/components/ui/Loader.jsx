import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <motion.div
            className="fixed inset-0 z-9999 flex flex-col items-center justify-center overflow-hidden"
            style={{ background: '#030014' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: '-100%', filter: 'blur(10px)' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <motion.div
                initial={{ scale: 0.8, rotateX: 45, opacity: 0 }}
                animate={{ scale: 1, rotateX: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative flex flex-col items-center"
                style={{ perspective: 1000 }}
            >
                {/* 3D Spinners */}
                <div className="relative w-24 h-24 mb-12" style={{ transformStyle: 'preserve-3d' }}>
                    <motion.div
                        className="absolute inset-0 border-[3px] rounded-full"
                        style={{ borderColor: 'rgba(0, 245, 255, 0.3)', borderTopColor: '#00f5ff' }}
                        animate={{ rotateY: 360, rotateZ: 180 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    <motion.div
                        className="absolute inset-2 border-[3px] rounded-full"
                        style={{ borderColor: 'rgba(139, 92, 246, 0.3)', borderBottomColor: '#8b5cf6' }}
                        animate={{ rotateX: 360, rotateZ: -180 }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="w-3 h-3 rounded-full"
                            style={{ background: '#fff', boxShadow: '0 0 20px #00f5ff' }}
                            animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    </div>
                </div>

                <motion.div className="flex gap-2 text-xl font-bold tracking-widest text-white uppercase font-mono">
                    {['S', 'Y', 'S', 'T', 'E', 'M', '_', 'I', 'N', 'I', 'T'].map((char, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.4 }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                {/* Progress Bar Container */}
                <div className="w-64 h-1 bg-white/10 rounded-full mt-8 overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 bottom-0 left-0 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #00f5ff, #8b5cf6)' }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                </div>
            </motion.div>
        </motion.div>
    );
}
