"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed, full-viewport layer of slowly drifting gradient "blobs".
 * Sits behind all content (-z-10) and provides the colour + depth that
 * makes the foreground glass cards actually read as frosted glass.
 * Respects prefers-reduced-motion by holding the blobs still.
 */
export default function AmbientBackground() {
    const reduce = useReducedMotion();

    const drift = (path: { x: number[]; y: number[]; scale: number[] }, duration: number) =>
        reduce
            ? undefined
            : {
                  ...path,
                  transition: {
                      duration,
                      repeat: Infinity,
                      repeatType: "mirror" as const,
                      ease: "easeInOut" as const,
                  },
              };

    return (
        <div aria-hidden className="ambient-bg">
            <motion.div
                className="ambient-blob ambient-blob--a"
                animate={drift({ x: [0, 80, -40, 0], y: [0, -60, 50, 0], scale: [1, 1.15, 0.95, 1] }, 28)}
            />
            <motion.div
                className="ambient-blob ambient-blob--b"
                animate={drift({ x: [0, -90, 50, 0], y: [0, 60, -40, 0], scale: [1, 0.9, 1.1, 1] }, 34)}
            />
            <motion.div
                className="ambient-blob ambient-blob--c"
                animate={drift({ x: [0, 60, -70, 0], y: [0, -40, -10, 0], scale: [1, 1.1, 1, 1] }, 40)}
            />
            {/* Fine grain to break up the gradient banding */}
            <div className="ambient-grain" />
        </div>
    );
}
