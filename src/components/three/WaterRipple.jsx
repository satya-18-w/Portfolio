import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Interactive Water Ripple Plane
 * Uses a GLOBAL mousemove listener (so it works even with pointerEvents: 'none'
 * on the parent canvas container). This avoids blocking click/drag on the
 * avatar canvas and other interactive elements beneath.
 */

const RIPPLE_VERTEX = `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uRippleStrength;
  uniform float uRippleSpeed;
  varying vec2  vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Distance from vertex to the mouse point (mapped to mesh coords)
    float d = distance(pos.xy, uMouse);

    // Main ripple from cursor
    float ripple = sin(d * 12.0 - uTime * uRippleSpeed) * exp(-d * 1.8) * uRippleStrength;

    // Secondary ambient waves
    float ambient = sin(pos.x * 2.0 + uTime * 0.4) * cos(pos.y * 2.0 + uTime * 0.3) * 0.03;

    pos.z += ripple + ambient;
    vElevation = ripple + ambient;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const RIPPLE_FRAGMENT = `
  uniform float uTime;
  uniform vec3  uColor;
  uniform float uOpacity;
  varying vec2  vUv;
  varying float vElevation;

  void main() {
    // Subtle grid lines
    float gridX = smoothstep(0.98, 1.0, abs(sin(vUv.x * 80.0)));
    float gridY = smoothstep(0.98, 1.0, abs(sin(vUv.y * 80.0)));
    float grid  = max(gridX, gridY) * 0.12;

    // Elevation-based highlights (brighter at wave peaks)
    float highlight = smoothstep(0.0, 0.06, vElevation) * 0.35;

    // Combine
    float alpha = (grid + highlight + 0.03) * uOpacity;
    gl_FragColor = vec4(uColor, alpha);
  }
`;

export default function WaterRipple({ color = '#00f5ff', opacity = 0.6, strength = 0.12 }) {
    const meshRef = useRef();
    const mouseRef = useRef(new THREE.Vector2(0, 0));
    const targetMouse = useRef(new THREE.Vector2(0, 0));
    const { viewport, camera } = useThree();

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uRippleStrength: { value: strength },
        uRippleSpeed: { value: 4.0 },
        uColor: { value: new THREE.Color(color) },
        uOpacity: { value: opacity },
    }), []);

    // Smoothly update color/opacity when theme changes
    useEffect(() => {
        uniforms.uColor.value.set(color);
        uniforms.uOpacity.value = opacity;
        uniforms.uRippleStrength.value = strength;
    }, [color, opacity, strength]);

    // Global mousemove listener — works even with pointerEvents: 'none' on parent
    useEffect(() => {
        const handleMouseMove = (e) => {
            // Convert screen coords to NDC (-1 to 1)
            const ndcX = (e.clientX / window.innerWidth) * 2 - 1;
            const ndcY = -(e.clientY / window.innerHeight) * 2 + 1;

            // Convert NDC to world coordinates at the mesh plane
            const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
            vec.unproject(camera);
            const dir = vec.sub(camera.position).normalize();
            const dist = -camera.position.z / dir.z;
            const worldPos = camera.position.clone().add(dir.multiplyScalar(dist));

            targetMouse.current.set(worldPos.x, worldPos.y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [camera]);

    useFrame((_, delta) => {
        if (!meshRef.current) return;
        uniforms.uTime.value += delta;

        // Smooth lerp to target mouse position
        mouseRef.current.lerp(targetMouse.current, 0.08);
        uniforms.uMouse.value.copy(mouseRef.current);
    });

    return (
        <mesh
            ref={meshRef}
            rotation={[-Math.PI / 2.3, 0, 0]}
            position={[0, -1.2, 0]}
        >
            <planeGeometry args={[viewport.width * 1.6, viewport.height * 1.6, 128, 128]} />
            <shaderMaterial
                vertexShader={RIPPLE_VERTEX}
                fragmentShader={RIPPLE_FRAGMENT}
                uniforms={uniforms}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false}
            />
        </mesh>
    );
}
