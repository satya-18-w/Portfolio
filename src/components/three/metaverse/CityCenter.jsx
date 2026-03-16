import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/*
  City Center — "Avatar Plaza"
  A holographic billboard at the world origin showing the developer
  identity: name, titles, and floating tech icons that orbit around it.
*/

// Orbiting glyph ring
function OrbitingIcons({ radius = 5, speed = 0.15, color }) {
    const groupRef = useRef();
    const icons = useMemo(() => {
        const syms = ['⚡', '🐍', '🐳', '☸', '⚛', '🔥', '🔗', '☁'];
        return syms.map((s, i) => ({
            symbol: s,
            angle: (i / syms.length) * Math.PI * 2,
            yOffset: Math.sin(i * 1.3) * 1.5,
        }));
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * speed;
        }
    });

    return (
        <group ref={groupRef}>
            {icons.map((ic, i) => (
                <group
                    key={i}
                    position={[
                        Math.cos(ic.angle) * radius,
                        8 + ic.yOffset,
                        Math.sin(ic.angle) * radius,
                    ]}
                >
                    <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                        <span style={{ fontSize: 22, filter: `drop-shadow(0 0 6px ${color})` }}>
                            {ic.symbol}
                        </span>
                    </Html>
                </group>
            ))}
        </group>
    );
}

// Holographic pulsing ring at base
function HoloRing({ color, delay = 0 }) {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        const t = (state.clock.elapsedTime + delay) % 4;
        const scale = 1 + t * 1.5;
        ref.current.scale.set(scale, scale, scale);
        ref.current.material.opacity = Math.max(0, 0.4 - t * 0.1);
    });

    return (
        <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
            <torusGeometry args={[3, 0.04, 8, 48]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={0.4}
            />
        </mesh>
    );
}

export default function CityCenter({ theme }) {
    const pillarRef = useRef();

    useFrame((state) => {
        if (pillarRef.current) {
            const pulse = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 0.8);
            pillarRef.current.material.emissiveIntensity = 0.4 + pulse * 0.6;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Billboard pillar */}
            <mesh position={[0, 6, 0]} ref={pillarRef}>
                <cylinderGeometry args={[0.8, 1, 12, 6]} />
                <meshStandardMaterial
                    color="#0a0a2e"
                    emissive={theme.primary}
                    emissiveIntensity={0.4}
                    metalness={0.8}
                    roughness={0.2}
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* Billboard screen (top of pillar) */}
            <mesh position={[0, 13, 0]}>
                <boxGeometry args={[6, 3, 0.15]} />
                <meshStandardMaterial
                    color="#050520"
                    emissive={theme.primary}
                    emissiveIntensity={0.3}
                    metalness={0.6}
                    roughness={0.4}
                />
            </mesh>

            {/* Billboard border */}
            <lineSegments position={[0, 13, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(6.05, 3.05, 0.2)]} />
                <lineBasicMaterial color={theme.primary} transparent opacity={0.7} />
            </lineSegments>

            {/* HTML name/title overlay on billboard */}
            <Html position={[0, 13, 0.1]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                <div style={{
                    textAlign: 'center',
                    color: '#fff',
                    fontFamily: "'Space Grotesk', sans-serif",
                    userSelect: 'none',
                }}>
                    <div style={{
                        fontSize: 24,
                        fontWeight: 800,
                        letterSpacing: 2,
                        color: theme.primary,
                        textShadow: `0 0 20px ${theme.primary}, 0 0 40px ${theme.primary}60`,
                        marginBottom: 6,
                    }}>
                        SATYAJIT SAMAL
                    </div>
                    <div style={{
                        fontSize: 11,
                        letterSpacing: 3,
                        color: theme.secondary,
                        textTransform: 'uppercase',
                        opacity: 0.9,
                    }}>
                        AI Engineer &bull; Backend Developer
                    </div>
                    <div style={{
                        fontSize: 10,
                        letterSpacing: 3,
                        color: theme.secondary,
                        textTransform: 'uppercase',
                        opacity: 0.7,
                        marginTop: 2,
                    }}>
                        Distributed Systems Engineer
                    </div>
                </div>
            </Html>

            {/* Orbiting tech icons */}
            <OrbitingIcons color={theme.primary} />

            {/* Pulsing base rings */}
            <HoloRing color={theme.primary} delay={0} />
            <HoloRing color={theme.secondary} delay={1.3} />
            <HoloRing color={theme.primary} delay={2.6} />

            {/* Spot light shining down on the billboard */}
            <pointLight
                position={[0, 16, 2]}
                color={theme.primary}
                intensity={1.5}
                distance={15}
                decay={2}
            />
        </group>
    );
}
