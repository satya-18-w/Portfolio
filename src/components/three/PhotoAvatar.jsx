import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

/* ─────────────── Photo texture with graceful fallback ─────────────── */
function usePhotoTexture(url) {
    const [texture, setTexture] = useState(null);
    const [aspect, setAspect] = useState(1);

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        loader.load(
            url,
            (tex) => {
                tex.colorSpace = THREE.SRGBColorSpace;
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                setTexture(tex);
                if (tex.image) setAspect(tex.image.width / tex.image.height);
            },
            undefined,
            () => {
                const canvas = document.createElement('canvas');
                canvas.width = 512;
                canvas.height = 512;
                const ctx = canvas.getContext('2d');
                const grad = ctx.createRadialGradient(256, 256, 60, 256, 256, 256);
                grad.addColorStop(0, '#1a1a2e');
                grad.addColorStop(0.5, '#0c0c1d');
                grad.addColorStop(1, '#060611');
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, 512, 512);
                const fallback = new THREE.CanvasTexture(canvas);
                fallback.colorSpace = THREE.SRGBColorSpace;
                setTexture(fallback);
            }
        );
    }, [url]);

    return { texture, aspect };
}

/* ─────────────── Circular avatar shader ─────────────── */
function useAvatarMaterial(texture, aspect, theme) {
    return useMemo(() => {
        if (!texture) return null;
        return new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uTexture: { value: texture },
                uAccent: { value: new THREE.Color(theme.primary) },
                uHighlight: { value: new THREE.Color(theme.highlight) },
                uAspect: { value: aspect },
                uTime: { value: 0 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform sampler2D uTexture;
                uniform vec3 uAccent;
                uniform vec3 uHighlight;
                uniform float uAspect;
                uniform float uTime;
                varying vec2 vUv;

                void main() {
                    vec2 uv = vUv;
                    // Aspect ratio correction
                    if (uAspect > 1.0) {
                        float scale = 1.0 / uAspect;
                        uv.x = vUv.x * scale + (1.0 - scale) * 0.5;
                    } else {
                        float scale = uAspect;
                        uv.y = vUv.y * scale + (1.0 - scale) * 0.5;
                    }

                    vec4 tex = texture2D(uTexture, uv);
                    vec2 center = vUv - 0.5;
                    float r = length(center);

                    // Smooth circle mask
                    float mask = 1.0 - smoothstep(0.42, 0.48, r);

                    // Depth vignette
                    float vignette = 1.0 - r * 0.35;
                    vec3 color = tex.rgb * vignette;

                    // Subtle color grade — slight blue tint in shadows
                    color = mix(color, color * vec3(0.9, 0.92, 1.0), 0.15);

                    // Rim glow
                    float rim = smoothstep(0.35, 0.47, r) * (1.0 - step(0.48, r));
                    vec3 rimColor = mix(uAccent, uHighlight, sin(uTime * 0.5 + 3.14 * 0.5) * 0.5 + 0.5);
                    color += rimColor * rim * 0.2;

                    gl_FragColor = vec4(color, mask);
                }
            `,
        });
    }, [texture, aspect, theme.primary, theme.highlight]);
}

/* ─────────────── Ethereal dust particles ─────────────── */
function AvatarDust({ count = 40 }) {
    const ref = useRef();
    const { theme } = useTheme();

    const particles = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 1.2 + Math.random() * 0.8;
            pos[i * 3] = Math.cos(angle) * radius;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 2.0;
            pos[i * 3 + 2] = Math.sin(angle) * radius * 0.3 - 0.3;
        }
        return pos;
    }, [count]);

    useFrame((state) => {
        if (!ref.current) return;
        const arr = ref.current.geometry.attributes.position.array;
        const t = state.clock.elapsedTime;
        for (let i = 0; i < count; i++) {
            arr[i * 3 + 1] += Math.sin(t * 0.4 + i * 0.6) * 0.001;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
        ref.current.rotation.y = t * 0.015;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={particles} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.02}
                color={theme.primary}
                transparent
                opacity={0.35}
                sizeAttenuation
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

/* ─────────────── Animated ring ─────────────── */
function GlowRing({ radius, width, color, speed = 0.3, opacity = 0.12 }) {
    const ref = useRef();
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.rotation.z = state.clock.elapsedTime * speed;
    });
    return (
        <mesh ref={ref} position={[0, 0, -0.02]}>
            <ringGeometry args={[radius, radius + width, 120]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.5}
                transparent
                opacity={opacity}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}

/* ─────────────── Main PhotoAvatar Export ─────────────── */
export default function PhotoAvatar({ mousePos }) {
    const groupRef = useRef();
    const { theme } = useTheme();
    const { texture, aspect } = usePhotoTexture('/images/avatar.png');
    const material = useAvatarMaterial(texture, aspect, theme);

    useFrame((state) => {
        if (material) {
            material.uniforms.uAccent.value.set(theme.primary);
            material.uniforms.uHighlight.value.set(theme.highlight);
            material.uniforms.uTime.value = state.clock.elapsedTime;
            if (texture) material.uniforms.uTexture.value = texture;
        }

        if (groupRef.current) {
            const tx = mousePos.current.x * 0.06;
            const ty = -mousePos.current.y * 0.04;
            groupRef.current.rotation.y += (tx - groupRef.current.rotation.y) * 0.025;
            groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.025;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
        }
    });

    if (!material) return null;

    return (
        <group ref={groupRef}>
            {/* Circular photo */}
            <mesh>
                <planeGeometry args={[3.2, 3.2]} />
                <primitive object={material} attach="material" />
            </mesh>

            {/* Inner glow ring */}
            <GlowRing radius={1.38} width={0.04} color={theme.primary} speed={0.15} opacity={0.18} />
            {/* Outer subtle ring */}
            <GlowRing radius={1.55} width={0.015} color={theme.highlight} speed={-0.1} opacity={0.08} />

            <AvatarDust />
        </group>
    );
}
