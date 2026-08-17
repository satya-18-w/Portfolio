import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../../context/ThemeContext';
import * as THREE from 'three';

// ── Animated ground grid with pulse ───────────────────────────────────
function NeonGrid() {
    const { theme } = useTheme();
    const materialRef = useRef();

    const gridShader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(theme.primary) },
            uBgColor: { value: new THREE.Color(theme.bg) },
        },
        vertexShader: `
            varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform float uTime;
            uniform vec3 uColor;
            uniform vec3 uBgColor;
            varying vec2 vUv;

            float grid(vec2 uv, float spacing) {
                vec2 g = abs(fract(uv * spacing - 0.5) - 0.5) / fwidth(uv * spacing);
                return 1.0 - min(min(g.x, g.y), 1.0);
            }

            void main() {
                float g1 = grid(vUv, 20.0) * 0.3;
                float g2 = grid(vUv, 100.0) * 0.6;
                float dist = length(vUv - 0.5) * 2.0;
                float pulse = smoothstep(0.02, 0.0, abs(fract(dist - uTime * 0.15) - 0.5) - 0.48);
                float alpha = max(g1, g2) + pulse * 0.2;
                alpha *= smoothstep(1.0, 0.3, dist);
                vec3 col = mix(uBgColor, uColor, alpha);
                gl_FragColor = vec4(col, alpha * 0.6);
            }
        `,
        transparent: true,
        side: THREE.DoubleSide,
    }), [theme.primary, theme.bg]);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
            <planeGeometry args={[400, 400, 1, 1]} />
            <shaderMaterial ref={materialRef} attach="material" args={[gridShader]} />
        </mesh>
    );
}

// ── Starfield / particle sky ──────────────────────────────────────────
function Starfield({ count = 1000 }) {
    const shaderRef = useRef();

    const { positions, sizes } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 350;
            pos[i * 3 + 1] = Math.random() * 90 + 10;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 350;
            sz[i] = Math.random() * 2 + 0.5;
        }
        return { positions: pos, sizes: sz };
    }, [count]);

    const starShader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color('#ffffff') },
        },
        vertexShader: `
            attribute float size;
            uniform float uTime;
            varying float vAlpha;
            void main() {
                vAlpha = 0.3 + 0.7 * sin(uTime * 0.5 + position.x * 0.1 + position.z * 0.1);
                vec4 mv = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (200.0 / -mv.z);
                gl_Position = projectionMatrix * mv;
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            varying float vAlpha;
            void main() {
                float d = length(gl_PointCoord - 0.5);
                if (d > 0.5) discard;
                float alpha = smoothstep(0.5, 0.0, d) * vAlpha;
                gl_FragColor = vec4(uColor, alpha);
            }
        `,
        transparent: true,
        depthWrite: false,
    }), []);

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
            </bufferGeometry>
            <shaderMaterial ref={shaderRef} args={[starShader]} />
        </points>
    );
}

// ── Street Lights (neon-style lamp posts) ─────────────────────────────
function StreetLights({ positions }) {
    const { theme } = useTheme();

    return (
        <group>
            {positions.map((pos, i) => (
                <group key={i} position={pos}>
                    <mesh position={[0, 2.5, 0]}>
                        <cylinderGeometry args={[0.05, 0.08, 5, 6]} />
                        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 5.2, 0]}>
                        <sphereGeometry args={[0.15, 8, 8]} />
                        <meshStandardMaterial
                            color={theme.primary}
                            emissive={theme.primary}
                            emissiveIntensity={2}
                        />
                    </mesh>
                    <pointLight
                        position={[0, 5, 0]}
                        color={theme.primary}
                        intensity={0.5}
                        distance={12}
                        decay={2}
                    />
                </group>
            ))}
        </group>
    );
}

// ── Metro Bridge Pillars (Indian city element) ────────────────────────
function MetroPillars() {
    const { theme } = useTheme();

    const pillars = useMemo(() => {
        const arr = [];
        // Elevated track along Z-axis at x=25
        for (let z = -60; z <= 60; z += 15) {
            arr.push([25, 0, z]);
        }
        return arr;
    }, []);

    return (
        <group>
            {pillars.map((pos, i) => (
                <group key={i} position={pos}>
                    {/* Pillar */}
                    <mesh position={[0, 5, 0]}>
                        <cylinderGeometry args={[0.3, 0.4, 10, 6]} />
                        <meshStandardMaterial color="#1a1a3e" metalness={0.6} roughness={0.4} />
                    </mesh>
                    {/* Cap beam */}
                    <mesh position={[0, 10.2, 0]}>
                        <boxGeometry args={[4, 0.5, 1]} />
                        <meshStandardMaterial
                            color="#0a0a2e"
                            emissive={theme.secondary}
                            emissiveIntensity={0.3}
                            metalness={0.7}
                            roughness={0.3}
                        />
                    </mesh>
                    {/* Track rail */}
                    {i > 0 && (
                        <mesh position={[0, 10.5, -7.5]}>
                            <boxGeometry args={[3, 0.1, 15]} />
                            <meshStandardMaterial color="#0a0a2e" metalness={0.5} roughness={0.5} />
                        </mesh>
                    )}
                </group>
            ))}
            {/* Accent light strip on the track */}
            <mesh position={[25, 10.6, 0]}>
                <boxGeometry args={[0.1, 0.05, 120]} />
                <meshStandardMaterial
                    color={theme.secondary}
                    emissive={theme.secondary}
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.6}
                />
            </mesh>
        </group>
    );
}

// ── Holographic Billboards (scattered around city) ────────────────────
function HolographicBillboards({ theme }) {
    const boards = useMemo(() => [
        { pos: [-20, 0, 15], rotation: 0.3, text: '// SatyajitVerse' },
        { pos: [15, 0, -25], rotation: -0.5, text: 'BUILD · SHIP · SCALE' },
        { pos: [-30, 0, -20], rotation: 0.8, text: 'AI · BACKEND · SYSTEMS' },
    ], []);

    return (
        <group>
            {boards.map((b, i) => (
                <group key={i} position={b.pos} rotation={[0, b.rotation, 0]}>
                    {/* Post */}
                    <mesh position={[0, 4, 0]}>
                        <cylinderGeometry args={[0.06, 0.08, 8, 4]} />
                        <meshStandardMaterial color="#1a1a2e" metalness={0.7} roughness={0.3} />
                    </mesh>
                    {/* Screen */}
                    <mesh position={[0, 8.5, 0]}>
                        <boxGeometry args={[4, 1.5, 0.08]} />
                        <meshStandardMaterial
                            color="#050520"
                            emissive={theme.primary}
                            emissiveIntensity={0.4}
                            metalness={0.5}
                            roughness={0.4}
                        />
                    </mesh>
                    <lineSegments position={[0, 8.5, 0]}>
                        <edgesGeometry args={[new THREE.BoxGeometry(4.04, 1.54, 0.12)]} />
                        <lineBasicMaterial color={theme.primary} transparent opacity={0.5} />
                    </lineSegments>
                </group>
            ))}
        </group>
    );
}

// ── Ambient Drones (flying particles near ground) ─────────────────────
function FlyingDrones({ theme }) {
    const groupRef = useRef();
    const count = 6;

    const drones = useMemo(() =>
        Array.from({ length: count }, (_, i) => ({
            angle: (i / count) * Math.PI * 2,
            radius: 30 + Math.random() * 20,
            height: 12 + Math.random() * 8,
            speed: 0.15 + Math.random() * 0.1,
        })),
        []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime;
        groupRef.current.children.forEach((child, i) => {
            const d = drones[i];
            const a = d.angle + t * d.speed;
            child.position.x = Math.cos(a) * d.radius;
            child.position.y = d.height + Math.sin(t * 0.5 + i) * 2;
            child.position.z = Math.sin(a) * d.radius;
        });
    });

    return (
        <group ref={groupRef}>
            {drones.map((_, i) => (
                <group key={i}>
                    <mesh>
                        <sphereGeometry args={[0.15, 6, 6]} />
                        <meshStandardMaterial
                            color={theme.primary}
                            emissive={theme.primary}
                            emissiveIntensity={2}
                        />
                    </mesh>
                    <pointLight color={theme.primary} intensity={0.2} distance={5} decay={2} />
                </group>
            ))}
        </group>
    );
}

// ── Indian Gate — Neon Mughal-style entry arch ────────────────────────
function IndianGate({ theme }) {
    const SAFFRON = '#FF9933';
    const GREEN = '#138808';
    const CHAKRA_BLUE = '#000080';

    return (
        <group position={[0, 0, -15]} rotation={[0, 0, 0]}>
            {/* Left pillar */}
            <mesh position={[-4, 5, 0]}>
                <boxGeometry args={[1.2, 10, 1.2]} />
                <meshStandardMaterial color="#1a0a2e" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Right pillar */}
            <mesh position={[4, 5, 0]}>
                <boxGeometry args={[1.2, 10, 1.2]} />
                <meshStandardMaterial color="#1a0a2e" metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Arch beam */}
            <mesh position={[0, 10.5, 0]}>
                <boxGeometry args={[9.4, 1.0, 1.2]} />
                <meshStandardMaterial color="#1a0a2e" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Dome on top (Mughal style) */}
            <mesh position={[0, 12.5, 0]}>
                <sphereGeometry args={[1.8, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#1a0a2e" emissive={SAFFRON} emissiveIntensity={0.4} metalness={0.6} roughness={0.3} />
            </mesh>
            {/* Dome finial */}
            <mesh position={[0, 14.2, 0]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshStandardMaterial color={SAFFRON} emissive={SAFFRON} emissiveIntensity={3} toneMapped={false} />
            </mesh>

            {/* Tricolor neon strips on the arch */}
            <mesh position={[0, 11.2, 0.62]}>
                <boxGeometry args={[9.0, 0.08, 0.02]} />
                <meshStandardMaterial color={SAFFRON} emissive={SAFFRON} emissiveIntensity={4} toneMapped={false} />
            </mesh>
            <mesh position={[0, 11.0, 0.62]}>
                <boxGeometry args={[9.0, 0.08, 0.02]} />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
            </mesh>
            <mesh position={[0, 10.8, 0.62]}>
                <boxGeometry args={[9.0, 0.08, 0.02]} />
                <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={4} toneMapped={false} />
            </mesh>

            {/* Ashoka Chakra — spinning ring on front */}
            <group position={[0, 11.0, 0.65]}>
                <AshokChakra radius={0.35} color={CHAKRA_BLUE} />
            </group>

            {/* Pillar edge neon accents */}
            {[-4, 4].map(x => (
                <group key={x}>
                    <mesh position={[x, 10, 0.62]}>
                        <boxGeometry args={[0.04, 10, 0.02]} />
                        <meshStandardMaterial color={theme.primary} emissive={theme.primary} emissiveIntensity={2} toneMapped={false} transparent opacity={0.6} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

// ── Ashoka Chakra — spinning wheel emblem ─────────────────────────────
function AshokChakra({ radius = 0.5, color = '#000080' }) {
    const ref = useRef();
    useFrame((_, delta) => {
        if (ref.current) ref.current.rotation.z += delta * 0.5;
    });

    const spokes = 24;
    return (
        <group ref={ref}>
            {/* Center ring */}
            <mesh>
                <torusGeometry args={[radius, 0.02, 8, 32]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={3} toneMapped={false} />
            </mesh>
            {/* Spokes */}
            {Array.from({ length: spokes }, (_, i) => {
                const angle = (i / spokes) * Math.PI * 2;
                return (
                    <mesh key={i} position={[Math.cos(angle) * radius * 0.5, Math.sin(angle) * radius * 0.5, 0]} rotation={[0, 0, angle]}>
                        <boxGeometry args={[radius * 0.9, 0.012, 0.01]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
                    </mesh>
                );
            })}
            {/* Center dot */}
            <mesh>
                <circleGeometry args={[radius * 0.12, 12]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </mesh>
        </group>
    );
}

// ── Temple Spires — scattered Indian architectural accents ────────────
function TempleSpires({ theme }) {
    const SAFFRON = '#FF9933';

    const spires = useMemo(() => [
        { pos: [-35, 0, -30], height: 14, scale: 1 },
        { pos: [30, 0, -35], height: 12, scale: 0.85 },
        { pos: [-25, 0, 35], height: 10, scale: 0.7 },
        { pos: [40, 0, -15], height: 11, scale: 0.8 },
    ], []);

    return (
        <group>
            {spires.map((s, i) => (
                <group key={i} position={s.pos} scale={s.scale}>
                    {/* Base platform */}
                    <mesh position={[0, 0.3, 0]}>
                        <cylinderGeometry args={[2.5, 3, 0.6, 8]} />
                        <meshStandardMaterial color="#1a0a2e" metalness={0.6} roughness={0.4} />
                    </mesh>
                    {/* Main tower — tapered cylinder */}
                    <mesh position={[0, s.height / 2 + 0.6, 0]}>
                        <cylinderGeometry args={[0.6, 1.2, s.height, 8]} />
                        <meshStandardMaterial color="#12082a" metalness={0.7} roughness={0.3} emissive={SAFFRON} emissiveIntensity={0.15} />
                    </mesh>
                    {/* Tier rings (shikhara-style) */}
                    {[0.25, 0.5, 0.75].map((t, j) => (
                        <mesh key={j} position={[0, s.height * t + 0.6, 0]}>
                            <torusGeometry args={[1.2 - t * 0.6, 0.06, 6, 16]} />
                            <meshStandardMaterial color={SAFFRON} emissive={SAFFRON} emissiveIntensity={1.5} toneMapped={false} transparent opacity={0.7} />
                        </mesh>
                    ))}
                    {/* Top dome */}
                    <mesh position={[0, s.height + 1, 0]}>
                        <sphereGeometry args={[0.7, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshStandardMaterial color="#12082a" emissive={theme.primary} emissiveIntensity={0.3} metalness={0.7} roughness={0.3} />
                    </mesh>
                    {/* Kalash finial (golden tip) */}
                    <mesh position={[0, s.height + 1.6, 0]}>
                        <coneGeometry args={[0.12, 0.4, 8]} />
                        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={2} toneMapped={false} metalness={0.95} roughness={0.05} />
                    </mesh>
                    {/* Base glow */}
                    <pointLight position={[0, 1, 0]} color={SAFFRON} intensity={0.4} distance={8} decay={2} />
                </group>
            ))}
        </group>
    );
}

// ── Main CityEnvironment ──────────────────────────────────────────────
export default function CityEnvironment() {
    const { theme } = useTheme();

    const streetLightPositions = useMemo(() => {
        const lights = [];
        for (let i = -50; i <= 50; i += 15) {
            lights.push([5, 0, i]);
            lights.push([-5, 0, i]);
            lights.push([i, 0, 5]);
            lights.push([i, 0, -5]);
        }
        return lights;
    }, []);

    return (
        <group>
            {/* Lighting */}
            <ambientLight intensity={0.15} color="#1a1a3e" />
            <directionalLight position={[30, 50, -20]} intensity={0.3} color="#4466aa" />
            <hemisphereLight skyColor="#0a0025" groundColor={theme.primary} intensity={0.1} />

            {/* Volumetric fog */}
            <fog attach="fog" args={[theme.bg, 30, 130]} />

            {/* Ground grid */}
            <NeonGrid />

            {/* Solid ground for physics */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
                <planeGeometry args={[400, 400]} />
                <meshStandardMaterial color={theme.bg} transparent opacity={0.95} />
            </mesh>

            {/* Night sky particles */}
            <Starfield />

            {/* Street lights along roads */}
            <StreetLights positions={streetLightPositions} />

            {/* Metro bridge pillars (Indian city) */}
            <MetroPillars />

            {/* Holographic billboards */}
            <HolographicBillboards theme={theme} />

            {/* Indian Gate entrance arch */}
            <IndianGate theme={theme} />

            {/* Temple spires (Indian architectural accents) */}
            <TempleSpires theme={theme} />

            {/* Flying drones */}
            <FlyingDrones theme={theme} />
        </group>
    );
}
