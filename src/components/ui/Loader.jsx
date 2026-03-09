import React from 'react';
import { motion } from 'framer-motion';

export default function Loader() {
    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: '#060611' }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="relative w-16 h-16 mb-8">
                <motion.div
                    className="absolute inset-0 border-2 rounded-full"
                    style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent' }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                    className="absolute inset-2 border rounded-full"
                    style={{ borderColor: 'var(--accent-secondary)', borderBottomColor: 'transparent' }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: 'var(--accent-primary)' }}
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </div>
            </div>

            <motion.p
                className="text-[10px] tracking-[0.4em] uppercase text-slate-500"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Loading
            </motion.p>

            <div className="w-40 h-[2px] bg-white/5 rounded-full mt-4 overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--accent-primary)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.2, ease: 'easeInOut' }}
                />
            </div>
        </motion.div>
    );
}
