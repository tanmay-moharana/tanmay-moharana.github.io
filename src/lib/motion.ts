import type { Variants } from "framer-motion";

// Shared cinematic easing — a single source of truth so every section
// reveal shares the same rhythm (expo-out style curve).
export const cinematicEase = [0.16, 1, 0.3, 1] as const;

// Standard "rise & fade in" for a single element entering the viewport.
export const revealUp: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: cinematicEase },
    },
};

// Parent container that staggers its children as they enter.
export const staggerContainer: Variants = {
    hidden: {},
    show: {
        transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
};

// Child item for use inside a `staggerContainer`.
export const staggerItem: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: cinematicEase },
    },
};

// Default viewport config for scroll-triggered reveals.
export const revealViewport = { once: true, margin: "-100px" } as const;
