import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';

// Using a confirmed-working humanoid GLB hosted on the Three.js CDN.
// Replace this URL with your own ReadyPlayerMe avatar when you have one!
const AVATAR_URL = 'https://threejs.org/examples/models/gltf/Soldier.glb';

export default function AvatarModel({ mousePos }) {
    const group = useRef();
    const { scene, animations } = useGLTF(AVATAR_URL);
    const { actions, names } = useAnimations(animations, group);

    useEffect(() => {
        // Play an idle/walk animation if available
        if (names.length > 0) {
            // Try to play an idle-looking animation — 'Idle' or first clip
            const idleName = names.find(n => n.toLowerCase().includes('idle')) ?? names[0];
            actions[idleName]?.play();
        }
    }, [actions, names]);

    useFrame((state) => {
        if (!group.current) return;

        // Gentle floating bob
        group.current.position.y = -0.9 + Math.sin(state.clock.elapsedTime * 1.2) * 0.1;

        // Offset to the right slightly to avoid central text blockage
        group.current.position.x = 2.2;

        // Subtle mouse-tracking rotation
        const targetRotY = mousePos.current.x * 0.4;
        group.current.rotation.y += (targetRotY - group.current.rotation.y) * 0.05;
    });

    return (
        <group ref={group} dispose={null} position={[0, -0.9, 0]} rotation={[0, Math.PI, 0]} scale={[1.0, 1.0, 1.0]}>
            <primitive object={scene} />
        </group>
    );
}

// Preload for zero-jank loading
useGLTF.preload(AVATAR_URL);
