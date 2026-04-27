"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const projects = [
        {
            title: "IoT Edge Hardware Platform",
            description: (
                <div className="flex flex-col gap-2">
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Problem:</strong> High maintenance downtime due to lack of real-time asset visibility.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Strategy:</strong> Develop a scalable IoT gateway to process sensor data at the edge.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Execution:</strong> Led cross-functional teams across hardware, firmware, and cloud domains.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Impact:</strong> Reduced maintenance downtime by 30% and improved data reliability.</span>
                </div>
            ),
            tags: ["IoT", "Hardware", "Edge Computing"],
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "AR Remote Support Solution",
            description: (
                <div className="flex flex-col gap-2">
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Problem:</strong> Field engineers lacked immediate expert guidance, extending repair times.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Strategy:</strong> Implement an AR smart glasses product for real-time spatial annotation.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Execution:</strong> Partnered with OEM vendors and guided UX/engineering to launch the platform.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Impact:</strong> Decreased mean time-to-resolution by 40% in pilot deployments.</span>
                </div>
            ),
            tags: ["AR", "B2B SaaS", "Hardware Integration"],
            image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "AI Predictive Maintenance",
            description: (
                <div className="flex flex-col gap-2">
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Problem:</strong> Unexpected equipment failures causing costly production halts.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Strategy:</strong> Productize machine learning models to predict anomalies proactively.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Execution:</strong> Collaborated with data science to build an actionable customer dashboard.</span>
                    <span className="block"><strong className="text-[#1a1a2e] dark:text-white">The Impact:</strong> Prevented over 50 hours of unplanned downtime in the first quarter.</span>
                </div>
            ),
            tags: ["AI", "Data Analytics", "Product Strategy"],
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        },
    ];

    useEffect(() => {
        if (isHovered) return;

        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % projects.length);
        }, 5000); 

        return () => clearInterval(interval);
    }, [isHovered, projects.length]);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % projects.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-gray-200 dark:border-white/5 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] dark:text-white">Projects</h2>
                    
                    {/* Rotation Timer Indicator (Top Right) */}
                    <div className="hidden md:flex items-center justify-center relative w-12 h-12">
                        <svg className="w-10 h-10 -rotate-90 text-[#1a1a2e] dark:text-white">
                           <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="none" className="opacity-10" />
                           <motion.circle 
                               cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="none" 
                               strokeDasharray={2 * Math.PI * 16}
                               initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
                               animate={{ strokeDashoffset: isHovered ? undefined : 0 }}
                               transition={{ duration: 5, ease: "linear" }}
                               key={activeIndex}
                           />
                        </svg>
                        <span className="absolute text-xs font-bold">{activeIndex + 1}/{projects.length}</span>
                    </div>
                </div>

                <div 
                    className="relative rounded-3xl overflow-hidden bg-gray-100/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:shadow-[0_0_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-500"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                >
                    <div className="relative h-[650px] md:h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full flex flex-col md:flex-row"
                            >
                                <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden bg-gray-200/50 dark:bg-black/50">
                                    <Image
                                        src={projects[activeIndex].image}
                                        alt={projects[activeIndex].title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent dark:from-black/50" />
                                </div>
                                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                    <h3 className="text-2xl lg:text-3xl font-semibold text-[#1a1a2e] dark:text-white mb-4">{projects[activeIndex].title}</h3>
                                    <div className="text-[#4a4a5a] dark:text-gray-400 mb-8 text-sm lg:text-base leading-relaxed">{projects[activeIndex].description}</div>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {projects[activeIndex].tags.map(tag => (
                                            <span key={tag} className="text-xs px-4 py-1.5 rounded-full bg-black/[0.03] dark:bg-white/5 text-[#4a4a5a] dark:text-gray-300 border border-gray-200 dark:border-white/10 font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-4 mt-auto">
                                        <button className="flex items-center justify-center p-3 rounded-full bg-[#1a1a2e] dark:bg-white text-white dark:text-black transition-transform duration-300 hover:scale-105 active:scale-95 shadow-md">
                                            <ExternalLink size={18} />
                                        </button>
                                        <button className="flex items-center justify-center p-3 rounded-full bg-black/5 dark:bg-white/10 text-[#1a1a2e] dark:text-white transition-all duration-300 hover:bg-black/10 dark:hover:bg-white/20 hover:scale-105 active:scale-95 border border-transparent dark:border-white/5">
                                            <Github size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons inside frame */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
                        <button 
                            onClick={prevSlide}
                            className="p-2.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md text-[#1a1a2e] dark:text-white border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-black transition-colors shadow-lg"
                        >
                            <ChevronLeft size={20} />
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
                        <button 
                            onClick={nextSlide}
                            className="p-2.5 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md text-[#1a1a2e] dark:text-white border border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-black transition-colors shadow-lg"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Dot Indicators */}
                <div className="flex justify-center items-center gap-3 mt-8">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                activeIndex === idx 
                                    ? "w-8 bg-[#1a1a2e] dark:bg-white" 
                                    : "w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-400 dark:hover:bg-white/40"
                            }`}
                        />
                    ))}
                    
                    {/* Mobile Rotation Timer (Bottom) */}
                    <div className="md:hidden ml-2 flex items-center justify-center relative w-6 h-6">
                        <svg className="w-6 h-6 -rotate-90 text-[#1a1a2e] dark:text-white">
                           <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-10" />
                           <motion.circle 
                               cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" 
                               strokeDasharray={2 * Math.PI * 10}
                               initial={{ strokeDashoffset: 2 * Math.PI * 10 }}
                               animate={{ strokeDashoffset: isHovered ? undefined : 0 }}
                               transition={{ duration: 5, ease: "linear" }}
                               key={activeIndex}
                           />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
