import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Html } from '@react-three/drei';
import { useTheme } from '../../../context/ThemeContext';
import * as THREE from 'three';

// ── District config — positions match top-down map from spec ──────────
export const DISTRICTS = [
    {
        id: 'projects',
        name: 'Projects District',
        icon: '🏗️',
        position: [-50, 0, 0],
        color: '#00F5FF',
        buildings: [
            { offset: [0, 0, 0], size: [4, 20, 4], label: 'Uber Demand Prediction' },
            { offset: [8, 0, 3], size: [3.5, 15, 3.5], label: 'RAPID-RIDE Backend' },
            { offset: [-7, 0, -4], size: [3, 12, 3], label: 'Music Recommendation Lab' },
        ],
    },
    {
        id: 'skills',
        name: 'Skills Lab',
        icon: '🧠',
        position: [0, 0, -50],
        color: '#8B5CF6',
        buildings: [
            { offset: [0, 0, 0], size: [10, 8, 10], type: 'dome', label: 'Research Facility' },
        ],
    },
    {
        id: 'education',
        name: 'Education Street',
        icon: '🎓',
        position: [50, 0, 0],
        color: '#FFD700',
        buildings: [
            { offset: [-10, 0, 0], size: [2, 4, 1.5], type: 'billboard', label: 'School' },
            { offset: [-5, 0, 0], size: [2, 5, 1.5], type: 'billboard', label: 'Higher Secondary' },
            { offset: [0, 0, 0], size: [2, 7, 1.5], type: 'billboard', label: 'IIIT Bhubaneswar' },
            { offset: [5, 0, 0], size: [2, 6, 1.5], type: 'billboard', label: 'ML Projects' },
            { offset: [10, 0, 0], size: [2, 5, 1.5], type: 'billboard', label: 'Backend Engineering' },
        ],
    },
    {
        id: 'future',
        name: 'Future Projects Zone',
        icon: '🚀',
        position: [0, 0, 50],
        color: '#FF006E',
        buildings: [
            { offset: [0, 0, 0], size: [5, 14, 5], type: 'wireframe', label: 'AI Agents' },
            { offset: [9, 0, 4], size: [4, 10, 4], type: 'wireframe', label: 'Distributed Systems Platform' },
            { offset: [-8, 0, -3], size: [4, 8, 4], type: 'wireframe', label: 'ML Infrastructure Tools' },
        ],
    },
    {
        id: 'contact',
        name: 'Contact Tower',
        icon: '📡',
        position: [35, 0, 40],
        buildings: [
            { offset: [0, 0, 0], size: [2, 25, 2], type: 'beacon' },
        ],
        color: '#00F5FF',
    },
];

// ── Single Building ───────────────────────────────────────────────────
function Building({ offset, size, type, districtColor, theme, label, lit }) {
    const [w, h, d] = size;
    const ref = useRef();
    const baseIntensity = lit ? 1.2 : 0.3;

    useFrame((state) => {
        if (!ref.current) return;
        const pulse = Math.sin(state.clock.elapsedTime * 0.5 + offset[0]) * 0.3 + 0.7;
        const target = lit ? 1.0 + pulse * 0.5 : baseIntensity * pulse;
        if (ref.current.material) {
            ref.current.material.emissiveIntensity = target;
        }
    });

    if (type === 'dome') {
        return (
            <group position={[offset[0], h / 2, offset[2]]}>
                <mesh ref={ref}>
                    <sphereGeometry args={[w / 2, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color={theme.bg}
                        emissive={districtColor}
                        emissiveIntensity={baseIntensity}
                        metalness={0.6}
                        roughness={0.3}
                        transparent
                        opacity={0.7}
                    />
                </mesh>
                <lineSegments>
                    <edgesGeometry args={[new THREE.SphereGeometry(w / 2 + 0.05, 20, 14, 0, Math.PI * 2, 0, Math.PI / 2)]} />
                    <lineBasicMaterial color={districtColor} transparent opacity={0.4} />
                </lineSegments>
                {label && (
                    <Html position={[0, w / 2 + 1, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                        <div style={{
                            color: districtColor,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 11,
                            fontWeight: 700,
                            textShadow: `0 0 8px ${districtColor}`,
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                        }}>
                            {label}
                        </div>
                    </Html>
                )}
            </group>
        );
    }

    if (type === 'wireframe') {
        return (
            <group position={[offset[0], h / 2, offset[2]]}>
                <lineSegments ref={ref}>
                    <edgesGeometry args={[new THREE.BoxGeometry(w, h, d)]} />
                    <lineBasicMaterial color={districtColor} transparent opacity={0.6} />
                </lineSegments>
                {[0.25, 0.5, 0.75].map((f, i) => (
                    <lineSegments key={i} position={[0, h * (f - 0.5), 0]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(w * 0.8, 0.05, d * 0.8)]} />
                        <lineBasicMaterial color={districtColor} transparent opacity={0.25} />
                    </lineSegments>
                ))}
                <pointLight position={[0, 0, 0]} color={districtColor} intensity={0.3} distance={h} decay={2} />
                {label && (
                    <Html position={[0, h / 2 + 1, 0]} center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                        <div style={{
                            color: districtColor,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 10,
                            fontWeight: 600,
                            textShadow: `0 0 8px ${districtColor}`,
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                        }}>
                            {label}
                        </div>
                    </Html>
                )}
            </group>
        );
    }

    if (type === 'beacon') {
        return (
            <group position={[offset[0], 0, offset[2]]}>
                <mesh position={[0, h / 2, 0]} ref={ref}>
                    <cylinderGeometry args={[w / 3, w / 2, h, 8]} />
                    <meshStandardMaterial
                        color="#0a0a2e"
                        emissive={districtColor}
                        emissiveIntensity={baseIntensity}
                        metalness={0.8}
                        roughness={0.2}
                    />
                </mesh>
                <PulsingRing position={[0, h + 1, 0]} color={districtColor} />
                <PulsingRing position={[0, h + 1, 0]} color={districtColor} delay={1} />
                <PulsingRing position={[0, h + 1, 0]} color={districtColor} delay={2} />
                {/* Signal beam */}
                <mesh position={[0, h + 5, 0]}>
                    <cylinderGeometry args={[0.05, 0.3, 10, 6]} />
                    <meshStandardMaterial
                        color={districtColor}
                        emissive={districtColor}
                        emissiveIntensity={2}
                        transparent
                        opacity={0.3}
                    />
                </mesh>
                <pointLight position={[0, h, 0]} color={districtColor} intensity={2} distance={20} decay={2} />
            </group>
        );
    }

    if (type === 'billboard') {
        return (
            <group position={[offset[0], 0, offset[2]]}>
                <mesh position={[0, h / 2, 0]}>
                    <cylinderGeometry args={[0.08, 0.1, h, 6]} />
                    <meshStandardMaterial color="#1a1a3e" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh ref={ref} position={[0, h + 0.8, 0]}>
                    <boxGeometry args={[w, 1.4, 0.12]} />
                    <meshStandardMaterial
                        color="#050520"
                        emissive={districtColor}
                        emissiveIntensity={baseIntensity}
                        metalness={0.5}
                        roughness={0.4}
                    />
                </mesh>
                <lineSegments position={[0, h + 0.8, 0]}>
                    <edgesGeometry args={[new THREE.BoxGeometry(w + 0.04, 1.44, 0.16)]} />
                    <lineBasicMaterial color={districtColor} />
                </lineSegments>
                {label && (
                    <Html position={[0, h + 0.8, 0.1]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                        <div style={{
                            color: districtColor,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            textShadow: `0 0 8px ${districtColor}`,
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                        }}>
                            {label}
                        </div>
                    </Html>
                )}
                {offset[0] < 8 && (
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.5, 0.02, 0]}>
                        <planeGeometry args={[3, 0.06]} />
                        <meshStandardMaterial color={districtColor} emissive={districtColor} emissiveIntensity={1} transparent opacity={0.5} />
                    </mesh>
                )}
            </group>
        );
    }

    // Default: solid building with holographic screens
    return (
        <group position={[offset[0], h / 2, offset[2]]}>
            <mesh ref={ref}>
                <boxGeometry args={[w, h, d]} />
                <meshStandardMaterial
                    color="#0a0a2e"
                    emissive={districtColor}
                    emissiveIntensity={baseIntensity}
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(w + 0.05, h + 0.05, d + 0.05)]} />
                <lineBasicMaterial color={districtColor} transparent opacity={0.5} />
            </lineSegments>
            {Array.from({ length: Math.floor(h / 2.5) }).map((_, i) => (
                <mesh key={i} position={[0, -h / 2 + i * 2.5 + 1.5, d / 2 + 0.02]}>
                    <planeGeometry args={[w * 0.7, 0.3]} />
                    <meshStandardMaterial
                        color={districtColor}
                        emissive={districtColor}
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.5}
                    />
                </mesh>
            ))}
            {label && (
                <>
                    <mesh position={[w / 2 + 0.8, 2, 0]} rotation={[0, -Math.PI / 6, 0]}>
                        <planeGeometry args={[2.5, 1.5]} />
                        <meshStandardMaterial
                            color={districtColor}
                            emissive={districtColor}
                            emissiveIntensity={0.6}
                            transparent
                            opacity={0.15}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    <Html position={[w / 2 + 0.8, 2, 0.05]} center distanceFactor={10} style={{ pointerEvents: 'none' }}>
                        <div style={{
                            color: districtColor,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            textShadow: `0 0 6px ${districtColor}`,
                            whiteSpace: 'nowrap',
                            userSelect: 'none',
                        }}>
                            {label}
                        </div>
                    </Html>
                </>
            )}
        </group>
    );
}

// ── Orbiting Skill Icons (for Skills Lab dome) ────────────────────────
function OrbitingSkillIcons({ color }) {
    const groupRef = useRef();
    const SKILLS = ['Go', 'Python', 'Docker', 'Jenkins', 'K8s', 'PostgreSQL', 'Redis', 'React', 'Node.js', 'LangGraph', 'TF'];

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.12;
        }
    });

    return (
        <group ref={groupRef}>
            {SKILLS.map((skill, i) => {
                const angle = (i / SKILLS.length) * Math.PI * 2;
                const radius = 7;
                const y = 5 + Math.sin(i * 1.1) * 2;
                return (
                    <group key={skill} position={[Math.cos(angle) * radius, y, Math.sin(angle) * radius]}>
                        <mesh>
                            <sphereGeometry args={[0.4, 8, 8]} />
                            <meshStandardMaterial
                                color={color}
                                emissive={color}
                                emissiveIntensity={1}
                                transparent
                                opacity={0.6}
                            />
                        </mesh>
                        <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
                            <div style={{
                                color,
                                fontFamily: "'Space Grotesk', sans-serif",
                                fontSize: 9,
                                fontWeight: 700,
                                textShadow: `0 0 6px ${color}`,
                                whiteSpace: 'nowrap',
                                userSelect: 'none',
                            }}>
                                {skill}
                            </div>
                        </Html>
                    </group>
                );
            })}
            {/* Glowing core */}
            <mesh position={[0, 5, 0]}>
                <sphereGeometry args={[1.2, 16, 16]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={2}
                    transparent
                    opacity={0.25}
                />
            </mesh>
            <pointLight position={[0, 5, 0]} color={color} intensity={1.5} distance={12} decay={2} />
        </group>
    );
}

// ── Pulsing signal ring ───────────────────────────────────────────────
function PulsingRing({ position, color, delay = 0 }) {
    const ref = useRef();

    useFrame((state) => {
        if (!ref.current) return;
        const t = (state.clock.elapsedTime + delay) % 3;
        const scale = 1 + t * 2;
        const opacity = Math.max(0, 1 - t / 3);
        ref.current.scale.set(scale, scale, scale);
        ref.current.material.opacity = opacity * 0.5;
    });

    return (
        <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1, 0.05, 8, 32]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={2}
                transparent
                opacity={0.5}
            />
        </mesh>
    );
}

// ── District cluster with collision boundary ──────────────────────────
function DistrictCluster({ district, carPosition, theme, isNear }) {
    return (
        <group position={district.position}>
            <RigidBody type="fixed" colliders={false}>
                {district.buildings.map((b, i) => (
                    <CuboidCollider
                        key={i}
                        args={[b.size[0] / 2, b.size[1] / 2, b.size[2] / 2]}
                        position={[b.offset[0], b.size[1] / 2, b.offset[2]]}
                    />
                ))}
            </RigidBody>

            {district.buildings.map((b, i) => (
                <Building
                    key={i}
                    offset={b.offset}
                    size={b.size}
                    type={b.type}
                    districtColor={district.color}
                    theme={theme}
                    label={b.label}
                    lit={isNear}
                />
            ))}

            {district.id === 'skills' && (
                <OrbitingSkillIcons color={district.color} />
            )}
        </group>
    );
}

// ── Root export ───────────────────────────────────────────────────────
export default function DistrictBuildings({ carPosition, nearDistrictId }) {
    const { theme } = useTheme();

    return (
        <group>
            {DISTRICTS.map((district) => (
                <DistrictCluster
                    key={district.id}
                    district={district}
                    carPosition={carPosition}
                    theme={theme}
                    isNear={nearDistrictId === district.id}
                />
            ))}
        </group>
    );
}
