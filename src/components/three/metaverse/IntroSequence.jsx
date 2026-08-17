import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/*
  Cinematic intro: the camera starts high above the city,
  slowly descends through particle clouds, and orbits the
  city center. When the user clicks "Start Journey" (handled
  by the parent), this component is unmounted and the driving
  camera takes over.
*/

const INTRO_DURATION = 8; // seconds for full path

// Key frames: [time (0-1), x, y, z]
const CAMERA_PATH = [
    [0, 0, 80, 0],  // high above center
    [0.2, 30, 55, -30],  // descend + orbit right
    [0.4, 40, 30, -10],  // swoop toward projects
    [0.6, 10, 18, 30],  // arc toward skills
    [0.8, -20, 12, -15],  // pass education
    [1.0, 0, 8, -15],  // settle behind car spawn
];

function lerpPath(t) {
    const clamped = Math.max(0, Math.min(1, t));
    for (let i = 0; i < CAMERA_PATH.length - 1; i++) {
        const [t0, x0, y0, z0] = CAMERA_PATH[i];
        const [t1, x1, y1, z1] = CAMERA_PATH[i + 1];
        if (clamped >= t0 && clamped <= t1) {
            const local = (clamped - t0) / (t1 - t0);
            // smooth-step
            const s = local * local * (3 - 2 * local);
            return new THREE.Vector3(
                x0 + (x1 - x0) * s,
                y0 + (y1 - y0) * s,
                z0 + (z1 - z0) * s,
            );
        }
    }
    const last = CAMERA_PATH[CAMERA_PATH.length - 1];
    return new THREE.Vector3(last[1], last[2], last[3]);
}

// Particle clouds that the camera descends through
function IntroClouds({ color }) {
    const count = 400;
    const ref = useRef();

    const { positions, sizes } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const sz = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 120;
            pos[i * 3 + 1] = Math.random() * 60 + 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 120;
            sz[i] = Math.random() * 3 + 1;
        }
        return { positions: pos, sizes: sz };
    }, []);

    const shaderRef = useRef();

    const shader = useMemo(() => ({
        uniforms: {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(color) },
        },
        vertexShader: `
      attribute float size;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vAlpha = 0.4 + 0.6 * sin(uTime * 0.3 + position.x * 0.05 + position.z * 0.05);
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (150.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }
    `,
        fragmentShader: `
      uniform vec3 uColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.1, d) * vAlpha * 0.6;
        gl_FragColor = vec4(uColor, a);
      }
    `,
        transparent: true,
        depthWrite: false,
    }), [color]);

    useFrame((state) => {
        if (shaderRef.current) {
            shaderRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
            </bufferGeometry>
            <shaderMaterial ref={shaderRef} args={[shader]} />
        </points>
    );
}

export default function IntroSequence({ active, theme, onPathComplete }) {
    const { camera } = useThree();
    const elapsed = useRef(0);
    const completed = useRef(false);

    useFrame((_, delta) => {
        if (!active || completed.current) return;

        elapsed.current += delta;
        const t = Math.min(elapsed.current / INTRO_DURATION, 1);

        const pos = lerpPath(t);
        camera.position.copy(pos);
        camera.lookAt(0, 0, 0);

        if (t >= 1 && !completed.current) {
            completed.current = true;
            if (onPathComplete) onPathComplete();
        }
    });

    if (!active) return null;

    return (
        <group>
            <IntroClouds color={theme.primary} />
        </group>
    );
}
