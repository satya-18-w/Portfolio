import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

export default function NeonGrid() {
    const gridRef = useRef();
    const { theme } = useTheme();

    useFrame((state) => {
        if (gridRef.current) {
            gridRef.current.position.z = (state.clock.elapsedTime * 1.5) % 2;
        }
    });

    const gridGeometry = useMemo(() => {
        const pts = [];
        const size = 50;
        const div = 50;
        const step = size / div;
        for (let i = -size / 2; i <= size / 2; i += step) {
            pts.push(new THREE.Vector3(i, 0, -size / 2), new THREE.Vector3(i, 0, size / 2));
            pts.push(new THREE.Vector3(-size / 2, 0, i), new THREE.Vector3(size / 2, 0, i));
        }
        return new THREE.BufferGeometry().setFromPoints(pts);
    }, []);

    const color = useMemo(() => new THREE.Color(theme.primary), [theme.primary]);

    return (
        <group ref={gridRef} position={[0, -3, 0]} rotation={[0, 0, 0]}>
            <lineSegments geometry={gridGeometry}>
                <lineBasicMaterial color={color} transparent opacity={0.08} depthWrite={false} />
            </lineSegments>
        </group>
    );
}
