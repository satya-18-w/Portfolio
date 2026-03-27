import React from 'react';
import { motion } from 'framer-motion';

export default function SkillCard({ skill, index, constraintsRef, activeCategory }) {
    // Generate slight chaos for pop-brutalism
    const randomRot = (index % 3 === 0) ? -4 : (index % 2 === 0) ? 4 : 0;
    const randomY = (index % 2 === 0) ? [0, -10, 0] : [0, 8, 0];
    const cardColor = index % 3 === 0 ? '#E2D1F9' : index % 2 === 0 ? '#FEFAE0' : '#FAEDCD';

    return (
        <motion.div
            key={`${skill.name}-${activeCategory}`}
            drag
            dragConstraints={constraintsRef}
            dragElastic={0.2}
            dragMomentum={true}
            whileDrag={{ scale: 1.15, rotateZ: randomRot * 2, zIndex: 100, boxShadow: '12px 12px 0px rgba(0,0,0,1)' }}
            whileHover={{ scale: 1.05, rotateZ: randomRot, zIndex: 50 }}
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ 
                opacity: 1, 
                scale: 1, 
                y: randomY, 
                transition: { y: { repeat: Infinity, duration: 4 + (index * 0.2), ease: "easeInOut" } } 
            }}
            exit={{ opacity: 0, scale: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.04, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center justify-center gap-4 p-6 h-48 rounded-3xl border-4 border-black cursor-grab active:cursor-grabbing select-none relative group bg-white shadow-[6px_6px_0px_#000] hover:shadow-[8px_8px_0px_#000]"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Hover fill */}
            <div className="absolute inset-0 rounded-[1.3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: cardColor }} />

            <span className="text-4xl lg:text-5xl translate-z-[10px] drop-shadow-md relative z-10">{skill.icon}</span>
            <span className="text-sm font-black uppercase tracking-widest text-center translate-z-[20px] relative z-10 text-black">{skill.name}</span>

            <div className="w-20 h-2 rounded-full border-2 border-black translate-z-[15px] bg-white relative z-10 overflow-hidden">
                <div className="h-full bg-black border-r-2 border-black" style={{ width: `${skill.level}%` }} />
            </div>
        </motion.div>
    );
}
