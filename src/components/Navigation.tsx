"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");

    const navItems = [
        { id: "hero", label: "Home", shortLabel: "Home" },
        { id: "about", label: "About", shortLabel: "About" },
        { id: "skills", label: "Skills", shortLabel: "Skills" },
        { id: "experience", label: "Experience", shortLabel: "Exp" },
        { id: "research", label: "Research", shortLabel: "Res" },
        { id: "awards", label: "Awards", shortLabel: "Awards" },
        { id: "projects", label: "Work", shortLabel: "Work" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            // trigger point is slightly above the middle of the screen
            const scrollPos = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
            
            // Highlight home if at the very top
            if (window.scrollY < 100) {
                 setActiveSection("hero");
            }
        };

        window.addEventListener("scroll", handleScroll);
        // initialize
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;
        
        const targetPosition = element.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        
        // Calculate dynamic duration based on distance, capped between 800ms and 2000ms
        const distanceDuration = Math.min(Math.max(Math.abs(distance) * 0.5, 800), 2000);
        
        let start: number | null = null;
        
        // Easing function (easeInOutCubic) for a very smooth start and end
        const easeInOutCubic = (t: number) => 
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            
        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / distanceDuration, 1);
            
            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
            
            if (timeElapsed < distanceDuration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    };

    return (
        <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="fixed bottom-4 sm:bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-[100] pointer-events-auto w-[calc(100%-2rem)] sm:w-auto max-w-[calc(100%-2rem)]"
        >
            <nav className="flex items-center gap-0.5 sm:gap-1 md:gap-2 p-1 sm:p-1.5 md:p-2 rounded-full bg-[#080808]/70 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-x-auto no-scrollbar justify-center">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`relative px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-medium transition-colors whitespace-nowrap shrink-0 ${
                            activeSection === item.id ? "text-white" : "text-white/40 hover:text-white/80"
                        }`}
                    >
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 rounded-full bg-white/10 border border-white/10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10 hidden sm:inline">{item.label}</span>
                        <span className="relative z-10 sm:hidden">{item.shortLabel}</span>
                    </button>
                ))}
            </nav>
        </motion.div>
    );
}

