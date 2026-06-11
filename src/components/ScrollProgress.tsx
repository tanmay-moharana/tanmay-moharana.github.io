"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Slim gradient progress bar pinned to the top of the viewport that
 * fills as the user scrolls the page. Spring-smoothed for a premium feel.
 */
export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden
            style={{ scaleX }}
            className="fixed top-0 left-0 right-0 z-[200] h-[3px] origin-left bg-gradient-to-r from-[#c0c7d6] via-[#8b93ff] to-[#c0c7d6] shadow-[0_0_12px_rgba(192,199,214,0.6)]"
        />
    );
}
