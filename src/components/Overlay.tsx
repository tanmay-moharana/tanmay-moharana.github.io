"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Github, Linkedin, Mail, Facebook } from "lucide-react";

// Helper component for typewriter effect
const TypewriterText = ({ phrases }: { phrases: string[] }) => {
    const [displayText, setDisplayText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const text = phrases[phraseIndex];
        let timer: NodeJS.Timeout;

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayText((prev) => prev.slice(0, -1));
                if (displayText.length <= 1) {
                    setIsPaused(true);
                    setIsDeleting(false);
                    setTimeout(() => {
                        setPhraseIndex((prev) => (prev + 1) % phrases.length);
                        setIsPaused(false);
                    }, 500); // brief pause before next phrase
                }
            }, 60); // Slower, smoother deletion
        } else {
            timer = setTimeout(() => {
                setDisplayText((prev) => text.slice(0, prev.length + 1));
                if (displayText.length + 1 >= text.length) {
                    setIsPaused(true);
                    // Wait before starting to delete
                    setTimeout(() => {
                        setIsDeleting(true);
                        setIsPaused(false);
                    }, 2500); // 2.5s pause to read before deleting
                }
            }, 120); // Slower, more natural typing speed
        }
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, phraseIndex, phrases, isPaused]);

    return <span>{displayText}</span>;
};

export default function Overlay() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Section 1 (0% to 20%)
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.2], ["0%", "-50%"]);

    // Section 2 (20% to 50%)
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], ["50%", "-50%"]);

    // Section 3 (50% to 80%)
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.8], ["50%", "-50%"]);

    return (
        <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-10">
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center px-6">

                {/* Section 1 */}
                <motion.div
                    style={{ opacity: opacity1, y: y1 }}
                    className="absolute right-[5%] md:right-[10%] xl:right-[15%] text-right flex flex-col items-end pointer-events-none"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-2 drop-shadow-xl">
                        Tanmay Moharana.
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl text-gray-300 drop-shadow-md mb-8 flex items-center justify-end h-[40px]">
                        <TypewriterText phrases={[
                            "Hi, I am Tanmay.",
                            "A Product Leader and Digital Innovator.",
                            "I Love to Develop.",
                            "I Love to Innovate.",
                            "I am from India."
                        ]} />
                        <motion.span
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-[2px] md:w-[3px] h-[20px] md:h-[30px] bg-gray-300 ml-1"
                        />
                    </p>

                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2 sm:mt-4 justify-end pointer-events-auto">
                        <a href="https://www.linkedin.com/in/tanmay-moharana/" target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95">
                            <Linkedin size={24} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a href="https://github.com/tanmay-moharana" target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95">
                            <Github size={24} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a href="https://medium.com/@tanmaymoharana" target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95">
                            <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" /></svg>
                        </a>
                        <a href="https://www.facebook.com/tanmay.mailme" target="_blank" rel="noreferrer" className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95">
                            <Facebook size={24} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                        <a href="mailto:tanmay.moharana@gmail.com" className="p-3 md:p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all hover:scale-110 active:scale-95">
                            <Mail size={24} className="w-5 h-5 md:w-6 md:h-6" />
                        </a>
                    </div>
                </motion.div>

                {/* Section 2 */}
                <motion.div
                    style={{ opacity: opacity2, y: y2 }}
                    className="absolute left-[5%] md:left-[10%] xl:left-[15%] max-w-lg pointer-events-none"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4 md:mb-6 drop-shadow-xl">
                        I build connected products.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 drop-shadow-md">
                        Focusing on IoT, hardware platforms, and digital transformation.
                    </p>
                </motion.div>

                {/* Section 3 */}
                <motion.div
                    style={{ opacity: opacity3, y: y3 }}
                    className="absolute right-[5%] md:right-[10%] xl:right-[15%] max-w-lg text-right pointer-events-none"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-4 md:mb-6 drop-shadow-xl">
                        Bridging strategy and execution.
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 drop-shadow-md">
                        Guiding cross-functional teams from vision to reality.
                    </p>
                </motion.div>

            </div>
        </div>
    );
}
