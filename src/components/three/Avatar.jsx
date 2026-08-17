import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

/* ── Cyber‑helmet head that tracks cursor ── */
function CyberHead({ mousePos }) {
    const headRef = useRef();
    const { theme } = useTheme();

    useFrame(() => {
        if (!headRef.current) return;
        const tx = mousePos.current.x * 0.35;
        const ty = -mousePos.current.y * 0.25;
        headRef.current.rotation.y += (tx - headRef.current.rotation.y) * 0.06;
        headRef.current.rotation.x += (ty - headRef.current.rotation.x) * 0.06;
    });

    return (
        <group ref={headRef} position={[0, 0.6, 0]}>
            {/* Helmet */}
            <RoundedBox args={[1.5, 1.7, 1.4]} radius={0.35} smoothness={4}>
                <meshStandardMaterial color="#0d0d1a" metalness={0.9} roughness={0.15} />
            </RoundedBox>

            {/* Visor */}
            <RoundedBox args={[1.25, 0.5, 0.08]} radius={0.12} position={[0, 0.12, 0.72]}>
                <meshStandardMaterial
                    color={theme.primary}
                    emissive={theme.primary}
                    emissiveIntensity={0.6}
                    transparent opacity={0.35}
                    metalness={0.95} roughness={0.05}
                />
            </RoundedBox>

            {/* Left eye strip */}
            <mesh position={[-0.28, 0.14, 0.74]}>
                <boxGeometry args={[0.22, 0.06, 0.04]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={3} />
            </mesh>
            {/* Right eye strip */}
            <mesh position={[0.28, 0.14, 0.74]}>
                <boxGeometry args={[0.22, 0.06, 0.04]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={3} />
            </mesh>

            {/* Center forehead accent */}
            <mesh position={[0, 0.55, 0.7]}>
                <boxGeometry args={[0.08, 0.2, 0.04]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={2} />
            </mesh>

            {/* Side ear‑pieces */}
            {[1, -1].map((s) => (
                <mesh key={s} position={[s * 0.78, 0.1, 0]}>
                    <boxGeometry args={[0.08, 0.4, 0.3]} />
                    <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={1} transparent opacity={0.6} />
                </mesh>
            ))}

            {/* Antenna */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 0.45, 8]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={1.5} />
            </mesh>
            <mesh position={[0, 1.38, 0]}>
                <sphereGeometry args={[0.055, 16, 16]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={3} />
            </mesh>
        </group>
    );
}

/* ── Geometric torso ── */
function CyberBody() {
    const { theme } = useTheme();
    return (
        <group position={[0, -1.2, 0]}>
            <RoundedBox args={[1.3, 1.6, 0.9]} radius={0.18} smoothness={4}>
                <meshStandardMaterial color="#0a0a18" metalness={0.8} roughness={0.25} />
            </RoundedBox>

            {/* Chest strip */}
            <mesh position={[0, 0.3, 0.47]}>
                <boxGeometry args={[0.7, 0.04, 0.01]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={2} />
            </mesh>
            {/* Second chest strip */}
            <mesh position={[0, 0.1, 0.47]}>
                <boxGeometry args={[0.5, 0.03, 0.01]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={1.2} transparent opacity={0.6} />
            </mesh>

            {/* Shoulder pads */}
            {[1, -1].map((s) => (
                <RoundedBox key={s} args={[0.45, 0.35, 0.5]} radius={0.1} position={[s * 0.85, 0.5, 0]}>
                    <meshStandardMaterial color="#0d0d1a" metalness={0.85} roughness={0.2} />
                </RoundedBox>
            ))}

            {/* Arms */}
            {[1, -1].map((s) => (
                <RoundedBox key={`a${s}`} args={[0.28, 1.1, 0.28]} radius={0.08} position={[s * 0.9, -0.3, 0]}>
                    <meshStandardMaterial color="#0e0e1e" metalness={0.75} roughness={0.3} />
                </RoundedBox>
            ))}
        </group>
    );
}

/* ── Holographic terminal ── */
function HoloTerminal() {
    const ref = useRef();
    const { theme } = useTheme();

    useFrame((s) => {
        if (ref.current) ref.current.position.y = -0.5 + Math.sin(s.clock.elapsedTime * 0.7) * 0.06;
    });

    return (
        <group ref={ref} position={[0, -0.5, 1.1]}>
            <RoundedBox args={[2.4, 1.3, 0.04]} radius={0.06} smoothness={4}>
                <meshStandardMaterial
                    color="#050510"
                    emissive={theme.primary}
                    emissiveIntensity={0.04}
                    transparent opacity={0.85}
                    metalness={0.95} roughness={0.05}
                />
            </RoundedBox>
            {/* Border glow */}
            <RoundedBox args={[2.45, 1.35, 0.015]} radius={0.07} position={[0, 0, -0.015]}>
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={0.5} transparent opacity={0.25} />
            </RoundedBox>
            {/* Code lines */}
            {[0.4, 0.22, 0.04, -0.14, -0.32].map((y, i) => (
                <mesh key={i} position={[-0.6 + i * 0.06, y, 0.025]}>
                    <boxGeometry args={[0.9 - i * 0.12, 0.035, 0.008]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? theme.primary : '#00d4ff'}
                        emissive={i % 2 === 0 ? theme.primary : '#00d4ff'}
                        emissiveIntensity={1.2}
                        transparent opacity={0.55 - i * 0.07}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ── Orbiting ring ── */
function OrbitalRing({ radius = 2.2, speed = 0.4 }) {
    const ref = useRef();
    const { theme } = useTheme();

    useFrame((s) => {
        if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * speed;
    });

    return (
        <group ref={ref}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.012, 16, 100]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={1.5} transparent opacity={0.3} />
            </mesh>
            {/* Orbiting dot */}
            <mesh position={[radius, 0, 0]}>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={3} />
            </mesh>
        </group>
    );
}

export default function Avatar({ mousePos }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.12;
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
            <group ref={groupRef} scale={0.85}>
                <CyberHead mousePos={mousePos} />
                <CyberBody />
                <HoloTerminal />
                <OrbitalRing radius={2.5} speed={0.3} />
                <OrbitalRing radius={2.0} speed={-0.5} />
            </group>
        </Float>
    );
}
