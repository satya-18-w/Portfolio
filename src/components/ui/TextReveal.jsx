import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export function TextReveal({ children, className, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
            className={cn("will-change-[opacity,transform,filter]", className)}
        >
            {children}
        </motion.div>
    );
}
