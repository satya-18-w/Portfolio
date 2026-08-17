import { cn } from "../../lib/utils";

export function BackgroundGrid({ className }) {
    return (
        <div className={cn("fixed inset-0 z-[-1] pointer-events-none", className)}>
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] mask-radial-faded"></div>
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] mask-radial-faded"></div>
        </div>
    );
}
