"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Home, User, Wrench, Briefcase, BookOpen, Trophy, FolderOpen, MessageSquare, CircleUser } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LoginModal from "./LoginModal";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navigation() {
    const [activeSection, setActiveSection] = useState("hero");
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const { user } = useAuth();
    const router = useRouter();

    const navItems = [
        { id: "hero", label: "Home", icon: Home },
        { id: "about", label: "About", icon: User },
        { id: "skills", label: "Skills", icon: Wrench },
        { id: "experience", label: "Experience", icon: Briefcase },
        { id: "research", label: "Research", icon: BookOpen },
        { id: "awards", label: "Awards", icon: Trophy },
        { id: "projects", label: "Work", icon: FolderOpen },
        { id: "recommendations", label: "Kudos", icon: MessageSquare },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections = navItems.map(item => document.getElementById(item.id));
            const scrollPos = window.scrollY + window.innerHeight / 3;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPos) {
                    setActiveSection(navItems[i].id);
                    break;
                }
            }
            
            if (window.scrollY < 100) {
                 setActiveSection("hero");
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (!element) return;
        
        const targetPosition = element.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        
        const distanceDuration = Math.min(Math.max(Math.abs(distance) * 0.5, 800), 2000);
        
        let start: number | null = null;
        
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
            className="fixed bottom-4 sm:bottom-6 md:bottom-10 left-0 right-0 flex justify-center z-[100] pointer-events-none px-4"
        >
            <nav className="flex items-center gap-1.5 md:gap-3 p-1.5 md:p-2.5 rounded-full bg-white/70 dark:bg-[#080808]/70 backdrop-blur-2xl border border-gray-200/50 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`relative flex items-center justify-center rounded-full transition-colors ${
                            activeSection === item.id 
                                ? "text-[#1a1a2e] dark:text-white" 
                                : "text-[#1a1a2e]/40 hover:text-[#1a1a2e]/80 dark:text-white/40 dark:hover:text-white/80"
                        } px-2.5 py-2 sm:px-3 sm:py-2 md:px-4 md:py-2`}
                    >
                        {activeSection === item.id && (
                            <motion.div
                                layoutId="nav-pill"
                                className="absolute inset-0 rounded-full bg-black/5 border border-gray-200/50 dark:bg-white/10 dark:border-white/10"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        {/* Icon is always visible on mobile; alongside text on sm+ */}
                        <item.icon className="relative z-10 w-4 h-4 sm:mr-2" strokeWidth={1.5} />
                        <span className="relative z-10 hidden sm:inline text-xs md:text-sm font-bold tracking-wide">{item.label}</span>
                    </button>
                ))}

                {/* Divider + Theme Toggle — only visible after scrolling past hero */}
                <AnimatePresence>
                    {activeSection !== "hero" && (
                        <motion.div
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex items-center gap-1 overflow-hidden"
                        >
                            <div className="w-px h-6 bg-gray-300/50 dark:bg-white/10 mx-1 md:mx-2" />
                            <ThemeToggle />
                            <button
                                onClick={() => user ? router.push('/dashboard') : setIsLoginModalOpen(true)}
                                className="relative flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full transition-colors duration-500 focus:outline-none bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 ml-1 md:ml-2 overflow-hidden border border-transparent dark:hover:border-white/20"
                                aria-label={user ? "Go to Dashboard" : "Open Login Modal"}
                            >
                                {user?.photoURL ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <CircleUser size={16} className={user ? "text-emerald-500 dark:text-emerald-400" : "text-[#1a1a2e] dark:text-white"} strokeWidth={2} />
                                )}
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </motion.div>
    );
}
