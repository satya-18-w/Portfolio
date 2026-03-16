import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../../context/ThemeContext';
import * as THREE from 'three';

// ── Road segment with neon lines ──────────────────────────────────────
function RoadSegment({ position, rotation = [0, 0, 0], length = 80, width = 8 }) {
    const { theme } = useTheme();

    return (
        <group position={position} rotation={rotation}>
            {/* Road surface */}
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[width, length]} />
                <meshStandardMaterial color="#0a0a1a" roughness={0.9} metalness={0.1} />
            </mesh>

            {/* Center dashes */}
            {Array.from({ length: Math.floor(length / 4) }).map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -length / 2 + i * 4 + 1]}>
                    <planeGeometry args={[0.12, 2]} />
                    <meshStandardMaterial
                        color={theme.primary}
                        emissive={theme.primary}
                        emissiveIntensity={0.5}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}

            {/* Edge lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-width / 2 + 0.1, 0.01, 0]}>
                <planeGeometry args={[0.08, length]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={1} transparent opacity={0.8} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[width / 2 - 0.1, 0.01, 0]}>
                <planeGeometry args={[0.08, length]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={1} transparent opacity={0.8} />
            </mesh>
        </group>
    );
}

// ── Glowing direction arrows on roads ─────────────────────────────────
function DirectionArrows({ position, rotation, color, count = 5 }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (!groupRef.current) return;
        const children = groupRef.current.children;
        for (let i = 0; i < children.length; i++) {
            const t = (state.clock.elapsedTime * 0.8 + i * 0.3) % 2;
            children[i].material.opacity = Math.max(0, 0.8 - t * 0.4);
        }
    });

    return (
        <group position={position} rotation={rotation} ref={groupRef}>
            {Array.from({ length: count }).map((_, i) => (
                <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, i * 4 - count * 2]}>
                    <shapeGeometry args={[createArrowShape()]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={1.5}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}
        </group>
    );
}

function createArrowShape() {
    const shape = new THREE.Shape();
    shape.moveTo(0, 1);
    shape.lineTo(0.6, 0);
    shape.lineTo(0.2, 0);
    shape.lineTo(0.2, -1);
    shape.lineTo(-0.2, -1);
    shape.lineTo(-0.2, 0);
    shape.lineTo(-0.6, 0);
    shape.closePath();
    return shape;
}

// ── Intersection ──────────────────────────────────────────────────────
function Intersection({ position = [0, 0, 0] }) {
    const { theme } = useTheme();

    return (
        <group position={position}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[10, 10]} />
                <meshStandardMaterial color="#0a0a1a" roughness={0.9} metalness={0.1} />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                <ringGeometry args={[3.5, 4, 32]} />
                <meshStandardMaterial
                    color={theme.secondary}
                    emissive={theme.secondary}
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.4}
                />
            </mesh>
        </group>
    );
}

// ── Root NeonRoad ─────────────────────────────────────────────────────
export default function NeonRoad() {
    const { theme } = useTheme();

    return (
        <group>
            <Intersection position={[0, 0, 0]} />

            {/* Roads to each district */}
            {/* West → Projects District */}
            <RoadSegment position={[-30, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={50} />
            {/* East → Education Street */}
            <RoadSegment position={[30, 0, 0]} rotation={[0, Math.PI / 2, 0]} length={50} />
            {/* North → Skills Lab (neg Z) */}
            <RoadSegment position={[0, 0, -30]} length={50} />
            {/* South → Future Zone (pos Z) */}
            <RoadSegment position={[0, 0, 30]} length={50} />

            {/* Diagonal road to Contact Tower (south-east) */}
            <RoadSegment
                position={[17, 0, 20]}
                rotation={[0, -Math.PI / 4, 0]}
                length={40}
                width={6}
            />

            {/* Direction arrows on each road */}
            <DirectionArrows position={[-20, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color="#00F5FF" />
            <DirectionArrows position={[20, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="#FFD700" />
            <DirectionArrows position={[0, 0, -20]} rotation={[0, Math.PI, 0]} color="#8B5CF6" />
            <DirectionArrows position={[0, 0, 20]} rotation={[0, 0, 0]} color="#FF006E" />
        </group>
    );
}
