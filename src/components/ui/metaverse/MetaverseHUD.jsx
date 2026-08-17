import React, { useRef, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../context/ThemeContext';
import { KEYS } from '../../three/metaverse/CarController';

// ── Virtual Joystick (mobile touch control) ───────────────────────────
function VirtualJoystick({ theme }) {
    const joystickRef = useRef(null);
    const startPos = useRef({ x: 0, y: 0 });
    const active = useRef(false);
    const [stick, setStick] = useState({ x: 0, y: 0 });

    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        const rect = joystickRef.current.getBoundingClientRect();
        startPos.current = {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
        };
        active.current = true;
    }, []);

    const handleTouchMove = useCallback((e) => {
        e.preventDefault();
        if (!active.current) return;
        const touch = e.touches[0];
        const dx = (touch.clientX - startPos.current.x) / 50;
        const dy = (touch.clientY - startPos.current.y) / 50;
        const cx = Math.max(-1, Math.min(1, dx));
        const cy = Math.max(-1, Math.min(1, dy));
        setStick({ x: cx, y: cy });
        KEYS.forward = cy < -0.3;
        KEYS.backward = cy > 0.3;
        KEYS.left = cx < -0.3;
        KEYS.right = cx > 0.3;
    }, []);

    const handleTouchEnd = useCallback(() => {
        active.current = false;
        setStick({ x: 0, y: 0 });
        KEYS.forward = KEYS.backward = KEYS.left = KEYS.right = false;
    }, []);

    return (
        <div
            ref={joystickRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
                position: 'fixed',
                bottom: 40,
                left: 40,
                width: 120,
                height: 120,
                borderRadius: '50%',
                border: `2px solid ${theme.primary}40`,
                background: `${theme.bg}60`,
                backdropFilter: 'blur(8px)',
                touchAction: 'none',
                zIndex: 50,
            }}
        >
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${stick.x * 30}px), calc(-50% + ${stick.y * 30}px))`,
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: `${theme.primary}80`,
                boxShadow: `0 0 12px ${theme.primary}40`,
                transition: 'transform 0.05s ease-out',
            }} />
        </div>
    );
}

function BrakeButton({ theme }) {
    const handleTouchStart = useCallback((e) => {
        e.preventDefault();
        KEYS.brake = true;
    }, []);
    const handleTouchEnd = useCallback(() => {
        KEYS.brake = false;
    }, []);

    return (
        <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
                position: 'fixed',
                bottom: 50,
                right: 40,
                width: 70,
                height: 70,
                borderRadius: '50%',
                border: `2px solid ${theme.highlight || '#FF006E'}50`,
                background: `${theme.highlight || '#FF006E'}20`,
                backdropFilter: 'blur(8px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
                zIndex: 50,
            }}
        >
            <span style={{
                fontFamily: theme.fontMono,
                fontSize: 11,
                color: theme.highlight || '#FF006E',
                fontWeight: 700,
                letterSpacing: 1,
                pointerEvents: 'none',
            }}>BRAKE</span>
        </div>
    );
}

export default function MetaverseHUD({ speed = 0, nearestDistrict = null }) {
    const { theme } = useTheme();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    const displaySpeed = Math.round(speed * 3.6); // Convert to "km/h" equivalent
    const maxSpeed = 100;
    const speedPct = Math.min(displaySpeed / maxSpeed, 1);
    const gear = displaySpeed === 0 ? 'P' : displaySpeed < 30 ? '1' : displaySpeed < 55 ? '2' : displaySpeed < 75 ? '3' : '4';

    return (
        <>
            <div style={{
                position: 'fixed',
                bottom: 24,
                left: 24,
                zIndex: 40,
                pointerEvents: 'none',
            }}>
                {/* Speed + district info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    style={{
                        background: 'rgba(3,0,20,0.8)',
                        backdropFilter: 'blur(16px)',
                        border: `1px solid ${theme.primary}30`,
                        borderRadius: 14,
                        padding: '18px 22px',
                        minWidth: 200,
                    }}
                >
                    {/* Speed display + gear */}
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                            <span style={{
                                fontFamily: theme.fontMono,
                                fontSize: 36,
                                fontWeight: 700,
                                color: theme.primary,
                                lineHeight: 1,
                                textShadow: `0 0 20px ${theme.primary}60`,
                            }}>
                                {displaySpeed}
                            </span>
                            <span style={{
                                fontFamily: theme.fontMono,
                                fontSize: 11,
                                color: theme.textMuted,
                                textTransform: 'uppercase',
                                letterSpacing: 1,
                            }}>
                                km/h
                            </span>
                        </div>
                        <span style={{
                            fontFamily: theme.fontMono,
                            fontSize: 14,
                            fontWeight: 700,
                            color: theme.secondary,
                            background: `${theme.secondary}15`,
                            padding: '2px 8px',
                            borderRadius: 6,
                            letterSpacing: 1,
                        }}>
                            {gear}
                        </span>
                    </div>

                    {/* Speed bar */}
                    <div style={{
                        height: 3,
                        borderRadius: 2,
                        background: `${theme.primary}20`,
                        marginBottom: 12,
                        overflow: 'hidden',
                    }}>
                        <motion.div
                            animate={{ width: `${speedPct * 100}%` }}
                            transition={{ duration: 0.15, ease: 'easeOut' }}
                            style={{
                                height: '100%',
                                borderRadius: 2,
                                background: speedPct > 0.7
                                    ? `linear-gradient(90deg, ${theme.primary}, ${theme.highlight || '#FF006E'})`
                                    : theme.primary,
                                boxShadow: `0 0 8px ${theme.primary}60`,
                            }}
                        />
                    </div>

                    {/* Nearest district */}
                    {nearestDistrict && (
                        <div style={{
                            fontFamily: theme.fontBody,
                            fontSize: 12,
                            color: theme.secondary,
                            borderTop: `1px solid ${theme.surfaceBorder}`,
                            paddingTop: 8,
                        }}>
                            📍 {nearestDistrict}
                        </div>
                    )}
                </motion.div>

                {/* Controls hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.8 }}
                    style={{
                        marginTop: 10,
                        fontFamily: theme.fontMono,
                        fontSize: 10,
                        color: `${theme.textMuted}99`,
                        letterSpacing: 0.5,
                        display: 'flex',
                        gap: 12,
                    }}
                >
                    <span><kbd style={{ background: `${theme.primary}15`, padding: '1px 5px', borderRadius: 3, color: theme.primary, fontSize: 9 }}>W A S D</kbd> move</span>
                    <span><kbd style={{ background: `${theme.primary}15`, padding: '1px 5px', borderRadius: 3, color: theme.primary, fontSize: 9 }}>SPACE</kbd> brake</span>
                </motion.div>
            </div>

            {isMobile && (
                <>
                    <VirtualJoystick theme={theme} />
                    <BrakeButton theme={theme} />
                </>
            )}
        </>
    );
}
