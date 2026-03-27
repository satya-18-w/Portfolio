import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

const TECH_ICONS = [
    { name: 'Go', color: '#00ADD8' },
    { name: 'Python', color: '#3776AB' },
    { name: 'Docker', color: '#2496ED' },
    { name: 'K8s', color: '#326CE5' },
    { name: 'React', color: '#61DAFB' },
    { name: 'Node', color: '#339933' },
    { name: 'Redis', color: '#DC382D' },
];

export default function FloatingTechIcons({ radius = 2.5 }) {
    const groupRef = useRef();
    const { theme } = useTheme();

    useFrame((state) => {
        if (!groupRef.current) return;
        // Slow orbit rotation
        groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    });

    return (
        <group ref={groupRef} position={[0, -0.5, 0]}>
            {TECH_ICONS.map((tech, i) => {
                const angle = (i / TECH_ICONS.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                // Stagger their Y position gently
                const y = Math.sin(angle * 3) * 0.8;

                return (
                    <Float key={tech.name} speed={1.5} rotationIntensity={0.3} floatIntensity={0.5} position={[x, y, z]}>
                        <Html center transform sprite distanceFactor={14} zIndexRange={[10, 0]}>
                            <div className="flex items-center justify-center px-4 py-1.5 hover:scale-110 transition-all cursor-crosshair group bg-white border-2 border-black rounded-full"
                                style={{ boxShadow: '4px 4px 0px #000' }}
                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tech.color; }}
                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#fff'; }}
                            >
                                <span className="font-mono uppercase tracking-widest text-black font-black"
                                    style={{ fontSize: '10px' }}>
                                    {tech.name}
                                </span>
                            </div>
                        </Html>
                    </Float>
                );
            })}
        </group>
    );
}
