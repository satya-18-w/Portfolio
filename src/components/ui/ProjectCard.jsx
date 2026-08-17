import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Magnetic from './Magnetic';

/**
 * Reusable primitive for displaying projects. Enforces a strict 2-column layout on desktop,
 * folding cleanly onto mobile formats, while maintaining consistent typography and spacing tokens.
 */
export default function ProjectCard({ project, index, theme }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-6xl mx-auto"
        >
            <div
                className="group relative rounded-[2.5rem] p-10 lg:p-12 transition-transform duration-500 
                pr-10 lg:pr-12 hover:-translate-y-2 bg-white"
                style={{
                    border: '5px solid #000',
                    boxShadow: '12px 12px 0px rgba(0,0,0,1)'
                }}
            >
                <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12 lg:gap-16 relative z-10">

                    {/* Visual Area */}
                    <div data-cursor="hover" data-cursor-text="VIEW" className="w-full lg:w-1/2 relative overflow-hidden rounded-4xl border-4 border-black shadow-[8px_8px_0px_#000] bg-white group-hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-full aspect-4/3 pointer-events-none">
                            <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                        {/* Period/Identifier Badge */}
                        <div
                            className="absolute -top-4 -left-4 text-3xl font-black font-mono w-24 h-24 rounded-full flex items-center justify-center border-4 border-black text-black z-20 shadow-[4px_4px_0px_#000]"
                            style={{ background: '#FAEDCD' }}
                        >
                            {project.id}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-8 justify-center">
                        {/* Category */}
                        <div className="flex items-center">
                            <span className="px-5 py-2 rounded-full border-4 border-black font-mono text-sm font-black uppercase shadow-[4px_4px_0px_#000] bg-[#E0FBFC] text-black w-max">
                                {project.category}
                            </span>
                        </div>

                        {/* Titles & Desc */}
                        <div className="flex flex-col gap-6">
                            <h3 className="text-5xl md:text-7xl font-black uppercase leading-[1.1] tracking-tighter text-black" style={{ fontFamily: theme?.fontHeading || 'Space Grotesk, sans-serif' }}>
                                {project.title}
                            </h3>
                            <p className="text-gray-800 text-lg md:text-xl font-bold leading-relaxed max-w-xl">
                                {project.description}
                            </p>
                        </div>

                        {/* Tech Stack */}
                        <div className="flex flex-wrap gap-4 pt-8 border-t-4 border-black/10">
                            {project.techStack.map(t => (
                                <span key={t} className="px-6 py-3 text-sm md:text-base font-black font-mono leading-none rounded-full border-4 border-black shadow-[4px_4px_0px_#000] bg-white hover:-translate-y-1 transition-transform inline-block text-black">
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-6 pt-8 mt-2">
                            {project.slug ? (
                                <Magnetic intensity={0.35}>
                                    <Link to={`/project/${project.slug}`} className="px-10 py-5 rounded-full text-base font-black tracking-widest uppercase transition-all border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 inline-block bg-[#00F5FF] text-black">
                                        Explore System
                                    </Link>
                                </Magnetic>
                            ) : (
                                <Magnetic intensity={0.35}>
                                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-full text-base font-black tracking-widest uppercase transition-all border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 inline-block bg-[#00F5FF] text-black">
                                        View Live
                                    </a>
                                </Magnetic>
                            )}
                            <Magnetic intensity={0.35}>
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-10 py-5 rounded-full text-base font-black tracking-widest uppercase transition-all border-4 border-black shadow-[8px_8px_0px_#000] hover:shadow-[4px_4px_0px_#000] hover:translate-y-1 hover:translate-x-1 bg-white inline-block text-black">
                                    Source Code
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
