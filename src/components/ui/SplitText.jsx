import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function SplitText({ text, className, delay = 0 }) {
    const characters = text.split("");

    return (
        <span className={cn("inline-block overflow-hidden", className)}>
            {characters.map((char, index) => (
                <motion.span
                    key={`${char}-${index}`}
                    className="inline-block will-change-transform"
                    initial={{ opacity: 0, y: "100%", filter: "blur(8px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{
                        duration: 0.5,
                        delay: delay + index * 0.02,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    );
}
