import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';

export default function AnimatedGrid() {
    const gridRef = useRef();
    const { theme } = useTheme();

    useFrame((state) => {
        if (!gridRef.current) return;
        // Scroll the grid lines towards the camera
        const t = state.clock.getElapsedTime();
        gridRef.current.position.z = (t * 0.5) % 1;
    });

    return (
        <group position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <gridHelper
                ref={gridRef}
                args={[60, 60, theme.primary, theme.secondary]}
                position={[0, 0, 0]}
            />
            {/* Add a fade-out plane so the grid seamlessly disappears in the distance */}
            <mesh position={[0, 0, -0.1]}>
                <planeGeometry args={[60, 60]} />
                <meshBasicMaterial color={theme.bg} transparent opacity={0.8} />
            </mesh>
        </group>
    );
}
