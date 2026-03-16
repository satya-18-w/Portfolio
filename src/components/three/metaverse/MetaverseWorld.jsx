import React, { useState, useRef, useCallback, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody, CuboidCollider } from '@react-three/rapier';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useTheme } from '../../../context/ThemeContext';
import CityEnvironment from './CityEnvironment';
import CityCenter from './CityCenter';
import NeonRoad from './NeonRoad';
import CarController from './CarController';
import ThirdPersonCamera from './ThirdPersonCamera';
import IntroSequence from './IntroSequence';
import DistrictBuildings from './DistrictBuilding';
import SignBoards from './SignBoard';
import ProximityDetector from './ProximityDetector';
import MetaverseHUD from '../../ui/metaverse/MetaverseHUD';
import DistrictPanel from '../../ui/metaverse/DistrictPanel';
import { DISTRICTS } from './DistrictBuilding';

export default function MetaverseWorld() {
    const { theme } = useTheme();
    const [phase, setPhase] = useState('intro');         // 'intro' | 'ready' | 'driving'
    const [activeDistrict, setActiveDistrict] = useState(null);
    const [nearDistrictId, setNearDistrictId] = useState(null);
    const [speed, setSpeed] = useState(0);
    const [nearestName, setNearestName] = useState(null);
    const carState = useRef({ position: { x: 0, y: 0, z: 0 }, rotation: 0, speed: 0 });
    const carPosition = useRef(null);
    const cameraLock = useRef(false);
    const speedRef = useRef(0);
    const panelOpen = useRef(false);
    const mouseOffset = useRef({ x: 0, y: 0 });

    // Throttle speed state to ~10fps
    useEffect(() => {
        const id = setInterval(() => setSpeed(speedRef.current), 100);
        return () => clearInterval(id);
    }, []);

    // Sync panelOpen ref
    useEffect(() => {
        panelOpen.current = !!activeDistrict;
    }, [activeDistrict]);

    const handlePositionUpdate = useCallback((state) => {
        carState.current = state;
        carPosition.current = state.position;
        speedRef.current = state.speed;
    }, []);

    const handleApproach = useCallback((districtId) => {
        setActiveDistrict(districtId);
        setNearDistrictId(districtId);
        if (districtId) {
            const found = DISTRICTS.find(d => d.id === districtId);
            setNearestName(found?.name || null);
        } else {
            setNearestName(null);
        }
    }, []);

    const handleFlyTo = useCallback((districtId) => {
        setActiveDistrict(districtId);
        const found = DISTRICTS.find(d => d.id === districtId);
        if (found) setNearestName(found.name);
    }, []);

    const handleClosePanel = useCallback(() => {
        setActiveDistrict(null);
    }, []);

    // Intro sequence completed → show "Start Journey" button
    const handleIntroPathComplete = useCallback(() => {
        setPhase('ready');
    }, []);

    // User clicks "Start Journey"
    const handleStartJourney = useCallback(() => {
        setPhase('driving');
    }, []);

    const isDriving = phase === 'driving';
    const wrapperRef = useRef(null);

    // Auto-focus the wrapper when driving starts so keyboard events work
    useEffect(() => {
        if (isDriving && wrapperRef.current) {
            wrapperRef.current.focus();
        }
    }, [isDriving]);

    return (
        <div
            ref={wrapperRef}
            tabIndex={0}
            style={{
                width: '100vw',
                height: '100vh',
                position: 'fixed',
                top: 0,
                left: 0,
                background: theme.bg,
                outline: 'none',
            }}
            onClick={() => wrapperRef.current?.focus()}
            onMouseMove={(e) => {
                mouseOffset.current = {
                    x: (e.clientX / window.innerWidth) * 2 - 1,
                    y: (e.clientY / window.innerHeight) * 2 - 1,
                };
            }}
        >
            <Canvas
                camera={{ fov: 60, near: 0.1, far: 300, position: [0, 80, 0] }}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
                shadows={false}
                dpr={[1, 1.5]}
            >
                <color attach="background" args={[theme.bg]} />

                <Suspense fallback={null}>
                    <Physics gravity={[0, -9.81, 0]} debug={false}>
                        {/* Ground collider */}
                        <RigidBody type="fixed" colliders={false}>
                            <CuboidCollider args={[200, 0.1, 200]} position={[0, -0.1, 0]} />
                        </RigidBody>

                        {/* City environment */}
                        <CityEnvironment />

                        {/* City center billboard */}
                        <CityCenter theme={theme} />

                        {/* Roads */}
                        <NeonRoad />

                        {/* Car — only active when driving */}
                        {isDriving && (
                            <CarController onPositionUpdate={handlePositionUpdate} panelOpen={panelOpen} />
                        )}

                        {/* District buildings */}
                        <DistrictBuildings carPosition={carPosition} nearDistrictId={nearDistrictId} />

                        {/* Proximity detection — only when driving */}
                        {isDriving && (
                            <ProximityDetector carPosition={carPosition} onApproach={handleApproach} />
                        )}

                        {/* Sign boards */}
                        <SignBoards onFlyTo={handleFlyTo} cameraLock={cameraLock} />
                    </Physics>

                    {/* Intro cinematic camera */}
                    <IntroSequence
                        active={phase === 'intro'}
                        theme={theme}
                        onPathComplete={handleIntroPathComplete}
                    />

                    {/* Driving camera — only when driving */}
                    {isDriving && (
                        <ThirdPersonCamera carState={carState} cameraLock={cameraLock} mouseOffset={mouseOffset} />
                    )}

                    {/* Post-processing */}
                    <EffectComposer>
                        <Bloom
                            luminanceThreshold={0.3}
                            luminanceSmoothing={0.85}
                            intensity={1.5}
                            mipmapBlur
                        />
                        <Vignette eskil={false} offset={0.15} darkness={0.7} />
                    </EffectComposer>
                </Suspense>
            </Canvas>

            {/* ── DOM Overlays ── */}

            {/* Welcome text during intro */}
            {phase === 'intro' && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 60,
                    textAlign: 'center',
                    pointerEvents: 'none',
                }}>
                    <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 42,
                        fontWeight: 800,
                        color: theme.primary,
                        textShadow: `0 0 30px ${theme.primary}, 0 0 60px ${theme.primary}40`,
                        letterSpacing: 4,
                        marginBottom: 12,
                    }}>
                        Welcome to SatyajitVerse
                    </div>
                    <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 16,
                        color: theme.secondary,
                        letterSpacing: 6,
                        textTransform: 'uppercase',
                        opacity: 0.8,
                    }}>
                        A Metaverse Portfolio Experience
                    </div>
                </div>
            )}

            {/* "Start Journey" button */}
            {phase === 'ready' && (
                <div style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 60,
                    textAlign: 'center',
                }}>
                    <div style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 28,
                        fontWeight: 800,
                        color: theme.primary,
                        textShadow: `0 0 20px ${theme.primary}`,
                        letterSpacing: 3,
                        marginBottom: 30,
                    }}>
                        SatyajitVerse
                    </div>
                    <button
                        onClick={handleStartJourney}
                        style={{
                            background: 'transparent',
                            border: `2px solid ${theme.primary}`,
                            color: theme.primary,
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 18,
                            fontWeight: 700,
                            padding: '14px 40px',
                            borderRadius: 8,
                            cursor: 'pointer',
                            letterSpacing: 3,
                            textTransform: 'uppercase',
                            textShadow: `0 0 10px ${theme.primary}60`,
                            boxShadow: `0 0 20px ${theme.primary}30, inset 0 0 20px ${theme.primary}10`,
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = `${theme.primary}15`;
                            e.currentTarget.style.boxShadow = `0 0 30px ${theme.primary}50, inset 0 0 30px ${theme.primary}20`;
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.boxShadow = `0 0 20px ${theme.primary}30, inset 0 0 20px ${theme.primary}10`;
                        }}
                    >
                        Press Start Journey
                    </button>
                </div>
            )}

            {/* HUD — only during driving */}
            {isDriving && (
                <MetaverseHUD speed={speed} nearestDistrict={nearestName} />
            )}

            {/* District panel */}
            <DistrictPanel activeDistrict={activeDistrict} onClose={handleClosePanel} />
        </div>
    );
}
