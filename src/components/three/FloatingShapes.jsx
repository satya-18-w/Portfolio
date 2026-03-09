import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, TorusKnot, Octahedron } from '@react-three/drei';
import { useTheme } from '../../context/ThemeContext';

export default function FloatingShapes() {
    const { theme } = useTheme();
    const group = useRef();

    useFrame((state) => {
        if (!group.current) return;
        // Global slow rotation for all floating shapes
        group.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <group ref={group}>
            {/* Shape 1 - Large Icosahedron on the Left */}
            <Float speed={2} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
                <Icosahedron args={[0.8, 0]} position={[-6, 3, -6]}>
                    <meshStandardMaterial
                        color={theme.primary}
                        wireframe
                        opacity={0.3}
                        transparent
                        roughness={0.1}
                    />
                </Icosahedron>
            </Float>

            {/* Shape 2 - Intricate TorusKnot on the Right */}
            <Float speed={1.5} rotationIntensity={2} floatIntensity={1.5} floatingRange={[-0.5, 0.5]}>
                <TorusKnot args={[0.5, 0.15, 64, 16]} position={[6, -1, -5]}>
                    <meshStandardMaterial
                        color={theme.secondary}
                        wireframe
                        opacity={0.4}
                        transparent
                        roughness={0.1}
                    />
                </TorusKnot>
            </Float>

            {/* Shape 3 - Octahedron near the bottom */}
            <Float speed={2.5} rotationIntensity={1} floatIntensity={3} floatingRange={[-0.3, 0.3]}>
                <Octahedron args={[0.6, 0]} position={[-3, -4, -4]}>
                    <meshStandardMaterial
                        color={theme.primary}
                        wireframe
                        opacity={0.2}
                        transparent
                        roughness={0.1}
                    />
                </Octahedron>
            </Float>

            {/* Shape 4 - Small distinct Icosahedron in the upper right quadrant */}
            <Float speed={1.8} rotationIntensity={2.5} floatIntensity={1.2} floatingRange={[-0.4, 0.4]}>
                <Icosahedron args={[0.4, 0]} position={[4, 5, -8]}>
                    <meshStandardMaterial
                        color={theme.secondary}
                        wireframe
                        opacity={0.5}
                        transparent
                        roughness={0.1}
                    />
                </Icosahedron>
            </Float>
        </group>
    );
}
