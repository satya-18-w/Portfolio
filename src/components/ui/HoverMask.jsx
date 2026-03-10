import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const HoverMask = ({
    children,
    className = "",
    size = 400,
    maskColor = "#E2D1F9", // Default to Lavender from ToyFight palette
}) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const updateMousePosition = (e) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                setMousePosition({ x, y });

                // Check if mouse is within bounds to toggle hover size
                if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                    setIsHovered(true);
                } else {
                    setIsHovered(false);
                }
            }
        };

        window.addEventListener("mousemove", updateMousePosition);

        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    const maskSize = isHovered ? size : 40;

    return (
        <motion.div
            ref={containerRef}
            className={`absolute inset-0 z-30 pointer-events-none overflow-hidden ${className}`}
            animate={{
                WebkitMaskPosition: `${mousePosition.x - maskSize / 2}px ${mousePosition.y - maskSize / 2}px`,
                WebkitMaskSize: `${maskSize}px`,
            }}
            transition={{ type: "tween", ease: "easeOut", duration: 0.15 }}
            style={{
                backgroundColor: maskColor,
                WebkitMaskImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='black'/%3E%3C/svg%3E")`,
                WebkitMaskRepeat: "no-repeat",
            }}
        >
            <div className="w-full h-full pointer-events-auto">
                {children}
            </div>
        </motion.div>
    );
};
