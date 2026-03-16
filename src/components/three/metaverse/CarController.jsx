import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useTheme } from '../../../context/ThemeContext';
import * as THREE from 'three';

// ── Persistent key state ──────────────────────────────────────────────
export const KEYS = { forward: false, backward: false, left: false, right: false, brake: false };

function useKeyboardControls(panelOpen) {
    useEffect(() => {
        const down = (e) => {
            if (panelOpen?.current) return;
            switch (e.code) {
                case 'KeyW': case 'ArrowUp': KEYS.forward = true; e.preventDefault(); break;
                case 'KeyS': case 'ArrowDown': KEYS.backward = true; e.preventDefault(); break;
                case 'KeyA': case 'ArrowLeft': KEYS.left = true; e.preventDefault(); break;
                case 'KeyD': case 'ArrowRight': KEYS.right = true; e.preventDefault(); break;
                case 'Space': KEYS.brake = true; e.preventDefault(); break;
            }
        };
        const up = (e) => {
            switch (e.code) {
                case 'KeyW': case 'ArrowUp': KEYS.forward = false; break;
                case 'KeyS': case 'ArrowDown': KEYS.backward = false; break;
                case 'KeyA': case 'ArrowLeft': KEYS.left = false; break;
                case 'KeyD': case 'ArrowRight': KEYS.right = false; break;
                case 'Space': KEYS.brake = false; break;
            }
        };
        window.addEventListener('keydown', down);
        window.addEventListener('keyup', up);
        return () => {
            KEYS.forward = KEYS.backward = KEYS.left = KEYS.right = KEYS.brake = false;
            window.removeEventListener('keydown', down);
            window.removeEventListener('keyup', up);
        };
    }, [panelOpen]);
}

// ── Ferrari-style supercar body (box-based for 3D visibility) ─────────
function FerrariBody({ theme }) {
    const bodyColor = '#CC0000'; // Rosso Corsa
    const glassColor = '#0a1628';
    const carbonColor = '#111111';
    const darkBody = '#8B0000';

    return (
        <group>
            {/* ═══ BODY PLATFORM ═══ */}
            <mesh position={[0, 0.13, 0]}>
                <boxGeometry args={[1.85, 0.18, 3.9]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>
            <mesh position={[0, 0.24, 0.1]}>
                <boxGeometry args={[1.75, 0.06, 3.2]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>

            {/* ═══ FRONT ═══ */}
            <mesh position={[0, 0.28, 0.85]}>
                <boxGeometry args={[1.65, 0.04, 1.6]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>
            <mesh position={[0, 0.2, 1.65]} rotation={[-0.12, 0, 0]}>
                <boxGeometry args={[1.55, 0.1, 0.5]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>
            <mesh position={[0, 0.1, 1.88]}>
                <boxGeometry args={[1.75, 0.14, 0.12]} />
                <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.03, 1.88]}>
                <boxGeometry args={[1.85, 0.04, 0.18]} />
                <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.12, 1.89]}>
                <boxGeometry args={[0.9, 0.06, 0.04]} />
                <meshStandardMaterial color={carbonColor} metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.31, 0.55]}>
                <boxGeometry args={[0.45, 0.03, 0.5]} />
                <meshStandardMaterial color={darkBody} metalness={0.8} roughness={0.2} />
            </mesh>

            {/* ═══ CABIN ═══ */}
            <mesh position={[0, 0.42, -0.15]}>
                <boxGeometry args={[1.45, 0.26, 1.3]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>
            <mesh position={[0, 0.56, -0.2]}>
                <boxGeometry args={[1.3, 0.03, 0.9]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>
            <mesh position={[0, 0.44, 0.38]} rotation={[0.55, 0, 0]}>
                <planeGeometry args={[1.35, 0.42]} />
                <meshPhysicalMaterial color={glassColor} metalness={0.3} roughness={0.05} transparent opacity={0.55} side={2} />
            </mesh>
            <mesh position={[0, 0.47, -0.72]} rotation={[-0.45, 0, 0]}>
                <planeGeometry args={[1.2, 0.32]} />
                <meshPhysicalMaterial color={glassColor} metalness={0.3} roughness={0.05} transparent opacity={0.45} side={2} />
            </mesh>
            {[1, -1].map(side => (
                <mesh key={`sw-${side}`} position={[side * 0.73, 0.44, -0.15]} rotation={[0, side * Math.PI / 2, 0]}>
                    <planeGeometry args={[1.1, 0.2]} />
                    <meshPhysicalMaterial color={glassColor} metalness={0.3} roughness={0.05} transparent opacity={0.45} side={2} />
                </mesh>
            ))}

            {/* ═══ REAR ═══ */}
            <mesh position={[0, 0.27, -1.05]}>
                <boxGeometry args={[1.7, 0.06, 1.2]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>
            <mesh position={[0, 0.29, -1.3]}>
                <boxGeometry args={[0.95, 0.03, 0.4]} />
                <meshStandardMaterial color={darkBody} metalness={0.8} roughness={0.25} transparent opacity={0.7} />
            </mesh>
            <mesh position={[0, 0.12, -1.88]}>
                <boxGeometry args={[1.8, 0.16, 0.12]} />
                <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
            </mesh>
            <mesh position={[0, 0.04, -1.88]}>
                <boxGeometry args={[1.6, 0.06, 0.18]} />
                <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
            </mesh>
            {[-0.5, -0.17, 0.17, 0.5].map((x, i) => (
                <mesh key={`df-${i}`} position={[x, 0.06, -1.9]}>
                    <boxGeometry args={[0.02, 0.06, 0.1]} />
                    <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
                </mesh>
            ))}

            {/* ═══ FENDERS (wide stance) ═══ */}
            {[1, -1].map(side => (
                <group key={`f-${side}`}>
                    <mesh position={[side * 0.88, 0.2, 1.15]}>
                        <boxGeometry args={[0.22, 0.22, 0.75]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
                    </mesh>
                    <mesh position={[side * 0.9, 0.2, -1.1]}>
                        <boxGeometry args={[0.26, 0.26, 0.85]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
                    </mesh>
                    <mesh position={[side * 0.82, 0.2, 0]}>
                        <boxGeometry args={[0.1, 0.16, 1.8]} />
                        <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
                    </mesh>
                    <mesh position={[side * 0.93, 0.05, 0]}>
                        <boxGeometry args={[0.04, 0.08, 3.5]} />
                        <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
                    </mesh>
                    <mesh position={[side * 0.88, 0.27, -0.55]}>
                        <boxGeometry args={[0.1, 0.14, 0.4]} />
                        <meshStandardMaterial color={darkBody} metalness={0.8} roughness={0.3} />
                    </mesh>
                    {[0, 1, 2].map(i => (
                        <mesh key={`fv-${i}`} position={[side * 0.92, 0.26, 0.85 - i * 0.1]} rotation={[0, 0, side * 0.12]}>
                            <boxGeometry args={[0.05, 0.035, 0.06]} />
                            <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
                        </mesh>
                    ))}
                </group>
            ))}

            {/* ═══ REAR WING ═══ */}
            <mesh position={[0, 0.55, -1.6]}>
                <boxGeometry args={[1.8, 0.03, 0.17]} />
                <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
            </mesh>
            {[0.7, -0.7].map((x, i) => (
                <mesh key={`ws-${i}`} position={[x, 0.48, -1.58]}>
                    <boxGeometry args={[0.035, 0.12, 0.04]} />
                    <meshStandardMaterial color={carbonColor} metalness={0.7} roughness={0.35} />
                </mesh>
            ))}
            {[0.88, -0.88].map((x, i) => (
                <mesh key={`we-${i}`} position={[x, 0.5, -1.6]}>
                    <boxGeometry args={[0.03, 0.1, 0.19]} />
                    <meshStandardMaterial color={bodyColor} metalness={0.85} roughness={0.12} />
                </mesh>
            ))}

            {/* ═══ EXHAUST ═══ */}
            {[-0.3, 0.3].map((x, i) => (
                <group key={`ex-${i}`} position={[x, 0.1, -1.94]}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.06, 0.015, 8, 16]} />
                        <meshStandardMaterial color="#888" metalness={0.95} roughness={0.1} />
                    </mesh>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.045, 0.045, 0.05, 12]} />
                        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
                    </mesh>
                </group>
            ))}

            {/* ═══ HEADLIGHTS ═══ */}
            {[1, -1].map(side => (
                <group key={`hl-${side}`}>
                    <mesh position={[side * 0.6, 0.2, 1.89]}>
                        <boxGeometry args={[0.4, 0.05, 0.05]} />
                        <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={5} toneMapped={false} />
                    </mesh>
                    <mesh position={[side * 0.78, 0.2, 1.88]} rotation={[0, 0, side * 0.2]}>
                        <boxGeometry args={[0.03, 0.1, 0.04]} />
                        <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={3} toneMapped={false} />
                    </mesh>
                </group>
            ))}

            {/* ═══ TAIL LIGHTS ═══ */}
            {[1, -1].map(side => (
                <group key={`tl-${side}`}>
                    <mesh position={[side * 0.5, 0.2, -1.9]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[0.07, 0.018, 8, 16]} />
                        <meshStandardMaterial color={theme.highlight || '#FF0000'} emissive={theme.highlight || '#FF0000'} emissiveIntensity={4} toneMapped={false} />
                    </mesh>
                    <mesh position={[side * 0.5, 0.2, -1.89]}>
                        <circleGeometry args={[0.05, 16]} />
                        <meshStandardMaterial color={theme.highlight || '#FF0000'} emissive={theme.highlight || '#FF0000'} emissiveIntensity={2} toneMapped={false} transparent opacity={0.5} />
                    </mesh>
                </group>
            ))}

            {/* ═══ BADGE ═══ */}
            <mesh position={[0, 0.18, 1.91]}>
                <boxGeometry args={[0.1, 0.1, 0.02]} />
                <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={1} metalness={0.95} roughness={0.05} toneMapped={false} />
            </mesh>

            {/* ═══ UNDERGLOW (subtle) ═══ */}
            <pointLight position={[0, 0.02, 0]} color={theme.primary} intensity={1.2} distance={4} decay={2} />
            <pointLight position={[0.5, 0.2, 2.5]} color={theme.primary} intensity={2} distance={12} decay={2} />
            <pointLight position={[-0.5, 0.2, 2.5]} color={theme.primary} intensity={2} distance={12} decay={2} />
        </group>
    );
}

// ── Wheel with multi-spoke rim, tire tread, and brake disc ────────────
function FerrariWheel({ position, theme, radius = 0.3 }) {
    return (
        <group position={position}>
            {/* Tire */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[radius, radius, 0.22, 20]} />
                <meshStandardMaterial color="#0a0a0a" metalness={0.3} roughness={0.8} />
            </mesh>
            {/* Rim — silver alloy */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[radius * 0.65, radius * 0.65, 0.24, 10]} />
                <meshStandardMaterial color="#c0c0c0" metalness={0.95} roughness={0.08} />
            </mesh>
            {/* Center cap — Ferrari yellow */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[radius * 0.2, radius * 0.2, 0.26, 12]} />
                <meshStandardMaterial color="#FFD700" metalness={0.9} roughness={0.1} emissive="#FFD700" emissiveIntensity={0.2} />
            </mesh>
            {/* Brake disc glow ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[radius * 0.5, 0.012, 6, 20]} />
                <meshStandardMaterial color="#FF4500" emissive="#FF4500" emissiveIntensity={0.8} toneMapped={false} />
            </mesh>
            {/* Accent ring */}
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[radius * 0.7, 0.008, 6, 20]} />
                <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={1.2} toneMapped={false} />
            </mesh>
        </group>
    );
}

// ── Main CarController (velocity-based — reliable movement) ───────────
export default function CarController({ onPositionUpdate, panelOpen }) {
    const { theme } = useTheme();
    const rigidBodyRef = useRef();
    const rotation = useRef(0);
    const currentSpeed = useRef(0);

    useKeyboardControls(panelOpen);

    const MAX_SPEED = 28;
    const ACCEL = 15;
    const REVERSE_SPEED = 12;
    const BRAKE_DECEL = 30;
    const STEER_SPEED = 2.5;
    const DRAG = 8;

    useFrame((_, delta) => {
        const rb = rigidBodyRef.current;
        if (!rb) return;

        const dt = Math.min(delta, 0.05);

        // Direct velocity control for reliable movement
        let speed = currentSpeed.current;

        if (KEYS.forward) {
            speed = Math.min(speed + ACCEL * dt, MAX_SPEED);
        } else if (KEYS.backward) {
            speed = Math.max(speed - ACCEL * dt, -REVERSE_SPEED);
        } else if (KEYS.brake) {
            if (speed > 0) speed = Math.max(0, speed - BRAKE_DECEL * dt);
            else if (speed < 0) speed = Math.min(0, speed + BRAKE_DECEL * dt);
        } else {
            if (speed > 0) speed = Math.max(0, speed - DRAG * dt);
            else if (speed < 0) speed = Math.min(0, speed + DRAG * dt);
        }
        currentSpeed.current = speed;

        // Steering (only when moving)
        const absSpeed = Math.abs(speed);
        if (absSpeed > 0.5) {
            const steerDir = speed >= 0 ? 1 : -1;
            const speedFactor = Math.min(absSpeed / MAX_SPEED, 1);
            const steerAmount = STEER_SPEED * (1 - speedFactor * 0.4) * dt;
            if (KEYS.left) rotation.current += steerAmount * steerDir;
            if (KEYS.right) rotation.current -= steerAmount * steerDir;
        }

        // Apply velocity (keep Y for gravity, override XZ)
        const fx = Math.sin(rotation.current);
        const fz = Math.cos(rotation.current);
        const prevVel = rb.linvel();
        rb.setLinvel({ x: fx * speed, y: prevVel.y, z: fz * speed }, true);

        // Set rotation
        const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current);
        rb.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w }, true);
        rb.setAngvel({ x: 0, y: 0, z: 0 }, true);

        // Report to camera / HUD
        const pos = rb.translation();
        if (onPositionUpdate) {
            onPositionUpdate({
                position: new THREE.Vector3(pos.x, pos.y, pos.z),
                rotation: rotation.current,
                speed: absSpeed,
            });
        }
    });

    return (
        <RigidBody
            ref={rigidBodyRef}
            type="dynamic"
            position={[0, 2, 0]}
            mass={1}
            linearDamping={0}
            angularDamping={1}
            enabledRotations={[false, false, false]}
            canSleep={false}
            ccd
        >
            <CuboidCollider args={[0.98, 0.3, 1.92]} position={[0, 0.3, 0]} friction={0.8} restitution={0} />
            <FerrariBody theme={theme} />
            <FerrariWheel position={[0.9, 0.08, 1.25]} theme={theme} radius={0.28} />
            <FerrariWheel position={[-0.9, 0.08, 1.25]} theme={theme} radius={0.28} />
            <FerrariWheel position={[0.9, 0.08, -1.2]} theme={theme} radius={0.32} />
            <FerrariWheel position={[-0.9, 0.08, -1.2]} theme={theme} radius={0.32} />
        </RigidBody>
    );
}
