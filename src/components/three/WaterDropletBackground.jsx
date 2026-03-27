import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

function Droplet() {
    const meshRef = useRef();
    
    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();
        // Liquid morphing physics
        meshRef.current.scale.x = 1 + Math.sin(time * 1.5) * 0.15;
        meshRef.current.scale.y = 1 + Math.cos(time * 1.8) * 0.15;
        meshRef.current.scale.z = 1 + Math.sin(time * 2.1) * 0.15;
        
        // Gentle rotation
        meshRef.current.rotation.x = time * 0.1;
        meshRef.current.rotation.y = time * 0.15;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
            <mesh ref={meshRef}>
                <sphereGeometry args={[2.5, 64, 64]} />
                <MeshTransmissionMaterial 
                    backside
                    backsideThickness={1}
                    samples={6}
                    thickness={3}
                    roughness={0}
                    chromaticAberration={0.05}
                    anisotropy={0.3}
                    distortion={0.8}
                    distortionScale={0.5}
                    temporalDistortion={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    color="#ffffff"
                    envMapIntensity={2}
                />
            </mesh>
        </Float>
    );
}

export default function WaterDropletBackground() {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-70 flex justify-center items-center">
            {/* We position the canvas container slightly offset to look beautiful behind typography */}
            <div className="w-[120vw] h-[120vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:-translate-x-[40%]">
                <Canvas camera={{ position: [0, 0, 10], fov: 45 }} gl={{ alpha: true, antialias: true }}>
                    <ambientLight intensity={0.7} />
                    <directionalLight position={[10, 10, 10]} intensity={2} color="#E0FBFC" />
                    <directionalLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
                    {/* The Environment map is critical for the glass refractions to capture light */}
                    <Environment preset="studio" />
                    <Droplet />
                </Canvas>
            </div>
        </div>
    );
}
