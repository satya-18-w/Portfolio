import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DISTRICTS } from './DistrictBuilding';

const PROXIMITY_THRESHOLD = 18;
const LEAVE_THRESHOLD = 22; // hysteresis to prevent flicker

export default function ProximityDetector({ carPosition, onApproach }) {
    const activeRef = useRef(null);

    useFrame(() => {
        if (!carPosition.current) return;
        const pos = carPosition.current;

        let closest = null;
        let closestDist = Infinity;

        for (const district of DISTRICTS) {
            const [dx, , dz] = district.position;
            const dist = Math.sqrt((pos.x - dx) ** 2 + (pos.z - dz) ** 2);
            if (dist < closestDist) {
                closestDist = dist;
                closest = district;
            }
        }

        if (activeRef.current) {
            // Currently near a district — check if we left
            if (closestDist > LEAVE_THRESHOLD || closest?.id !== activeRef.current) {
                activeRef.current = null;
                onApproach(null);
            }
        } else {
            // Not near any — check if we entered
            if (closest && closestDist < PROXIMITY_THRESHOLD) {
                activeRef.current = closest.id;
                onApproach(closest.id);
            }
        }
    });

    return null;
}
