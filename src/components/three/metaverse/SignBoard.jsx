import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useTheme } from '../../../context/ThemeContext';
import gsap from 'gsap';
import * as THREE from 'three';
import { DISTRICTS } from './DistrictBuilding';

// ── Single sign board ─────────────────────────────────────────────────
function Sign({ district, onFlyTo, cameraLock }) {
    const { theme } = useTheme();
    const { camera } = useThree();
    const [hovered, setHovered] = useState(false);
    const signRef = useRef();
    const glowRef = useRef();

    // Position signs along road, pointing toward each district
    const signPos = getSignPosition(district);
    const targetPos = district.position;

    useFrame(() => {
        if (!glowRef.current) return;
        glowRef.current.material.emissiveIntensity = hovered ? 2.5 : 1;
    });

    const handleClick = (e) => {
        e.stopPropagation();
        // Lock camera so ThirdPersonCamera yields control
        if (cameraLock) cameraLock.current = true;

        const [tx, , tz] = targetPos;
        gsap.to(camera.position, {
            x: tx - 10,
            y: 15,
            z: tz - 10,
            duration: 2.5,
            ease: 'power2.inOut',
            onUpdate: () => {
                camera.lookAt(tx, 0, tz);
            },
            onComplete: () => {
                if (onFlyTo) onFlyTo(district.id);
                // Release camera lock after a short delay so player can resume
                setTimeout(() => {
                    if (cameraLock) cameraLock.current = false;
                }, 1500);
            },
        });
    };

    return (
        <group position={signPos}>
            {/* Pole */}
            <mesh position={[0, 2, 0]}>
                <cylinderGeometry args={[0.06, 0.08, 4, 6]} />
                <meshStandardMaterial color="#1a1a3e" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Sign face */}
            <mesh
                ref={glowRef}
                position={[0, 4.2, 0]}
                onClick={handleClick}
                onPointerEnter={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
                onPointerLeave={() => { setHovered(false); document.body.style.cursor = 'default'; }}
            >
                <boxGeometry args={[2.5, 1, 0.1]} />
                <meshStandardMaterial
                    color={theme.bg}
                    emissive={district.color}
                    emissiveIntensity={1}
                    metalness={0.5}
                    roughness={0.4}
                />
            </mesh>

            {/* Sign border wireframe */}
            <lineSegments position={[0, 4.2, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(2.52, 1.02, 0.12)]} />
                <lineBasicMaterial color={district.color} />
            </lineSegments>

            {/* HTML label */}
            <Html
                position={[0, 4.2, 0.08]}
                center
                distanceFactor={8}
                style={{ pointerEvents: 'none' }}
            >
                <div style={{
                    color: district.color,
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    textShadow: `0 0 10px ${district.color}`,
                    userSelect: 'none',
                }}>
                    {district.icon} {district.name}
                </div>
            </Html>

            {/* Arrow pointing toward district */}
            <mesh position={[0, 3.5, 0]} rotation={getArrowRotation(signPos, targetPos)}>
                <coneGeometry args={[0.15, 0.5, 4]} />
                <meshStandardMaterial
                    color={district.color}
                    emissive={district.color}
                    emissiveIntensity={1.5}
                />
            </mesh>
        </group>
    );
}

// ── Helpers ───────────────────────────────────────────────────────────
function getSignPosition(district) {
    const [dx, , dz] = district.position;
    // Place sign at 12 units from center, along the road toward the district
    const dist = Math.sqrt(dx * dx + dz * dz);
    if (dist < 1) return [12, 0, 12]; // Contact hub (center) — place nearby
    const nx = dx / dist;
    const nz = dz / dist;
    return [nx * 14, 0, nz * 14];
}

function getArrowRotation(from, to) {
    const dx = to[0] - from[0];
    const dz = to[2] - from[2];
    const angle = Math.atan2(dx, dz);
    return [0, 0, -Math.PI / 2]; // Simplified — points along sign face
}

// ── Root export ───────────────────────────────────────────────────────
export default function SignBoards({ onFlyTo, cameraLock }) {
    return (
        <group>
            {DISTRICTS.filter(d => d.id !== 'contact').map((district) => (
                <Sign key={district.id} district={district} onFlyTo={onFlyTo} cameraLock={cameraLock} />
            ))}
        </group>
    );
}
