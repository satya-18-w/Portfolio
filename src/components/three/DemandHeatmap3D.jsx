import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Interactive 3D Demand Heatmap
 * 8×8 grid of bars representing NYC zone demand levels.
 * Height = demand intensity, Color = blue→cyan→yellow→red gradient.
 * Bars pulse and react to cursor proximity.
 */

// Generate realistic demand data — peaks in Midtown, JFK, etc.
function generateDemandData() {
    const data = [];
    for (let x = 0; x < 8; x++) {
        for (let z = 0; z < 8; z++) {
            // Create hotspots: center (Midtown), corner (Airport), etc.
            const midtownDist = Math.sqrt((x - 4) ** 2 + (z - 4) ** 2);
            const airportDist = Math.sqrt((x - 7) ** 2 + (z - 7) ** 2);
            const downtownDist = Math.sqrt((x - 2) ** 2 + (z - 1) ** 2);

            let demand = 0.15 + Math.random() * 0.15;
            demand += Math.max(0, 0.7 - midtownDist * 0.15);
            demand += Math.max(0, 0.5 - airportDist * 0.2);
            demand += Math.max(0, 0.4 - downtownDist * 0.18);
            demand = Math.min(demand, 1.0);

            data.push({ x, z, demand });
        }
    }
    return data;
}

// Map demand [0,1] to a color
function demandColor(t) {
    if (t < 0.25) return new THREE.Color().setHSL(0.6, 0.8, 0.3 + t * 1.2); // blue
    if (t < 0.5) return new THREE.Color().setHSL(0.5, 0.9, 0.4 + (t - 0.25) * 0.8); // cyan
    if (t < 0.75) return new THREE.Color().setHSL(0.15, 0.9, 0.5 + (t - 0.5) * 0.4); // yellow
    return new THREE.Color().setHSL(0.02, 0.95, 0.45 + (t - 0.75) * 0.6); // red
}

function DemandBar({ position, demand, index }) {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);
    const baseHeight = demand * 3.5 + 0.1;
    const color = useMemo(() => demandColor(demand), [demand]);

    useFrame(({ clock }) => {
        if (!meshRef.current) return;
        const t = clock.getElapsedTime();
        // Subtle breathing animation
        const pulse = Math.sin(t * 1.5 + index * 0.3) * 0.05;
        const targetHeight = baseHeight + pulse + (hovered ? 0.4 : 0);
        meshRef.current.scale.y += (targetHeight / baseHeight - meshRef.current.scale.y) * 0.1;

        // Glow on hover
        if (meshRef.current.material) {
            meshRef.current.material.emissiveIntensity += ((hovered ? 0.6 : 0.15) - meshRef.current.material.emissiveIntensity) * 0.1;
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={[position[0], baseHeight / 2, position[2]]}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            castShadow
        >
            <boxGeometry args={[0.42, baseHeight, 0.42]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.15}
                metalness={0.3}
                roughness={0.4}
                transparent
                opacity={0.92}
            />
        </mesh>
    );
}

function GridFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#0a0a1a" transparent opacity={0.6} />
        </mesh>
    );
}

function GridLines() {
    const lines = useMemo(() => {
        const positions = [];
        for (let i = 0; i <= 8; i++) {
            const p = i * 0.55 - 2.2;
            positions.push(p, 0, -2.2, p, 0, 2.2); // Z lines
            positions.push(-2.2, 0, p, 2.2, 0, p); // X lines
        }
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        return geom;
    }, []);

    return (
        <lineSegments geometry={lines}>
            <lineBasicMaterial color="#1e3a5f" transparent opacity={0.3} />
        </lineSegments>
    );
}

export default function DemandHeatmap3D() {
    const data = useMemo(() => generateDemandData(), []);
    const groupRef = useRef();

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.15) * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            <GridFloor />
            <GridLines />
            {data.map((d, i) => (
                <DemandBar
                    key={i}
                    position={[d.x * 0.55 - 2.2, 0, d.z * 0.55 - 2.2]}
                    demand={d.demand}
                    index={i}
                />
            ))}
            {/* Lighting for the heatmap */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
            <pointLight position={[-3, 5, -3]} intensity={0.6} color="#00f5ff" />
            <pointLight position={[3, 3, 3]} intensity={0.4} color="#ff6b35" />
        </group>
    );
}
