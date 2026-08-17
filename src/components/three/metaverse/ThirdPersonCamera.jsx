import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const _targetPos = new THREE.Vector3();
const _lookTarget = new THREE.Vector3();

export default function ThirdPersonCamera({ carState, cameraLock, mouseOffset }) {
    const { camera } = useThree();
    const smoothPos = useRef(new THREE.Vector3(0, 10, -18));
    const smoothLook = useRef(new THREE.Vector3(0, 0, 0));

    const FOLLOW_OFFSET = new THREE.Vector3(0, 7, -13);
    const LOOK_AHEAD = 5;
    const POSITION_LERP = 4.0;
    const LOOK_LERP = 6;
    const BASE_FOV = 60;
    const MAX_FOV_BOOST = 8;
    const MAX_ORBIT_ANGLE = Math.PI / 6;
    const ORBIT_HEIGHT_RANGE = 3;

    useFrame((state, delta) => {
        if (!carState.current) return;
        if (cameraLock?.current) return;

        const { position, rotation, speed = 0 } = carState.current;
        const clampedDelta = Math.min(delta, 0.05);

        // Mouse orbit offset
        const mx = mouseOffset?.current?.x || 0;
        const my = mouseOffset?.current?.y || 0;
        const orbitAngle = mx * MAX_ORBIT_ANGLE;
        const heightOffset = -my * ORBIT_HEIGHT_RANGE;

        // Camera position (behind + above car, with orbit offset)
        const totalRotation = rotation + orbitAngle;
        const sinR = Math.sin(totalRotation);
        const cosR = Math.cos(totalRotation);

        _targetPos.set(
            position.x - sinR * FOLLOW_OFFSET.z + cosR * FOLLOW_OFFSET.x,
            position.y + FOLLOW_OFFSET.y + heightOffset,
            position.z - cosR * FOLLOW_OFFSET.z - sinR * FOLLOW_OFFSET.x
        );

        // Look-at point (always ahead of car direction, not affected by orbit)
        const carSinR = Math.sin(rotation);
        const carCosR = Math.cos(rotation);

        _lookTarget.set(
            position.x + carSinR * LOOK_AHEAD,
            position.y + 1.2,
            position.z + carCosR * LOOK_AHEAD
        );

        // Smooth follow
        smoothPos.current.lerp(_targetPos, 1 - Math.exp(-POSITION_LERP * clampedDelta));
        smoothLook.current.lerp(_lookTarget, 1 - Math.exp(-LOOK_LERP * clampedDelta));

        camera.position.copy(smoothPos.current);
        camera.lookAt(smoothLook.current);

        // Dynamic FOV
        const speedFactor = Math.min(speed / 28, 1);
        camera.fov = THREE.MathUtils.lerp(camera.fov, BASE_FOV + speedFactor * MAX_FOV_BOOST, clampedDelta * 3);
        camera.updateProjectionMatrix();
    });

    return null;
}
