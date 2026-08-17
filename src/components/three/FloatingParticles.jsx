import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export default function FloatingParticles({ count = 120, spread = 30 }) {
    const meshRef = useRef();
    const { theme } = useTheme();

    const { positions, velocities, opacities } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const opa = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * spread;
            pos[i * 3 + 1] = (Math.random() - 0.5) * spread;
            pos[i * 3 + 2] = (Math.random() - 0.5) * (spread * 0.6);
            vel[i * 3] = (Math.random() - 0.5) * 0.001;
            vel[i * 3 + 1] = Math.random() * 0.001 + 0.0003; // gentle upward drift
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.001;
            opa[i] = Math.random() * 0.6 + 0.2;
        }
        return { positions: pos, velocities: vel, opacities: opa };
    }, [count, spread]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const posArr = meshRef.current.geometry.attributes.position.array;
        const t = state.clock.elapsedTime;
        const half = spread / 2;
        for (let i = 0; i < count; i++) {
            posArr[i * 3] += velocities[i * 3] + Math.sin(t * 0.3 + i * 0.7) * 0.0002;
            posArr[i * 3 + 1] += velocities[i * 3 + 1];
            posArr[i * 3 + 2] += velocities[i * 3 + 2];
            // Wrap around smoothly
            for (let j = 0; j < 3; j++) {
                if (posArr[i * 3 + j] > half) posArr[i * 3 + j] = -half;
                if (posArr[i * 3 + j] < -half) posArr[i * 3 + j] = half;
            }
        }
        meshRef.current.geometry.attributes.position.needsUpdate = true;
        meshRef.current.rotation.y = t * 0.003;
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.025}
                color={theme.primary}
                transparent
                opacity={0.15}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
