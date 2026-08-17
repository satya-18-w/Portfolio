import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function ReactiveShape({ geometry, position, color, scrollRef, speed = 1 }) {
    const meshRef = useRef();

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;
        const scroll = scrollRef.current;

        meshRef.current.rotation.x = scroll * Math.PI * 2 * speed + t * 0.12;
        meshRef.current.rotation.y = scroll * Math.PI * speed * 0.6 + t * 0.08;
        meshRef.current.rotation.z = Math.sin(t * 0.3 + scroll * 2) * 0.2;

        meshRef.current.position.y = position[1] + Math.sin(t * 0.4 + scroll * 3) * 0.25;
        meshRef.current.position.x = position[0] + Math.cos(t * 0.3) * 0.1;

        const s = 1 + Math.sin(scroll * Math.PI * 2) * 0.12;
        meshRef.current.scale.setScalar(s);
    });

    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
            <mesh ref={meshRef} position={position}>
                {geometry}
                <meshStandardMaterial
                    color={color}
                    wireframe
                    transparent
                    opacity={0.3}
                    roughness={0.1}
                />
            </mesh>
        </Float>
    );
}

export default function ScrollGeometry({ scrollProgress, primaryColor = '#e85d04', secondaryColor = '#f48c06' }) {
    const scrollRef = useRef(0);

    useEffect(() => {
        if (!scrollProgress) return;
        const unsub = scrollProgress.on('change', v => { scrollRef.current = v; });
        return unsub;
    }, [scrollProgress]);

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.7} />

            <ReactiveShape
                geometry={<icosahedronGeometry args={[0.9, 0]} />}
                position={[-4, 2, -3]}
                color={primaryColor}
                scrollRef={scrollRef}
                speed={0.7}
            />
            <ReactiveShape
                geometry={<torusGeometry args={[0.5, 0.18, 16, 32]} />}
                position={[4, -1.5, -4]}
                color={secondaryColor}
                scrollRef={scrollRef}
                speed={1.1}
            />
            <ReactiveShape
                geometry={<octahedronGeometry args={[0.55, 0]} />}
                position={[1.5, 3, -5]}
                color={primaryColor}
                scrollRef={scrollRef}
                speed={0.5}
            />
            <ReactiveShape
                geometry={<dodecahedronGeometry args={[0.4, 0]} />}
                position={[-2.5, -2.5, -3.5]}
                color={secondaryColor}
                scrollRef={scrollRef}
                speed={0.9}
            />
        </>
    );
}
