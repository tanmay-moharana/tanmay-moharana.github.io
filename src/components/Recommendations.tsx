"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareQuote, ChevronLeft, ChevronRight } from "lucide-react";

export default function Recommendations() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const recommendations = [
        {
            name: "David Kronmüller",
            title: "Head of Product @ DENPAFLUX",
            date: "January 29, 2024",
            text: "I worked alongside Tanmay for over 2 years as a fellow product manager at KONUX. He made a significant impact with his work like the product process definition of done, core product competition analysis and new product development. He was always very eager, creative and diligent about achieving his assigned outcomes."
        },
        {
            name: "Rohit Raju",
            title: "Export Manager | Business Development International | B2B | Medical Devices | Endoprosthetics",
            date: "January 15, 2019",
            text: "I met Tanmay during my business studies in Germany. He is a man of extraordinary caliber at the same time extremely down to earth personality. Tanmay will be definitely one of the first in my peers whom I would consult if I ever plan to start a business on my own. He has co-founded some interesting startups and I firmly believe the best is yet to come. All the best wishes Tanmay!"
        },
        {
            name: "Dexin Luo",
            title: "Global Head of Artificial Intelligence and Digital @ Linde plc",
            date: "July 27, 2018",
            text: "Tanmay was a colleague of mine during his internship at Linde Digitalization in 2017. I enjoyed discussing digital innovation topics with Tanmay. He always contributes to the discussion with valuable insights, and takes initiatives in giving new ideas. Tanmay is very hands-on with development, and is a valuable member of the team."
        },
        {
            name: "Kanishka Raj Rathore",
            title: "Programme Officer at United Nations Industrial Development Organization | Urban Innovation",
            date: "May 17, 2016",
            text: "Tanmay is a consummate and passionate techno-commercial professional. He understands complex technologies and is able to creatively present them in a simple, engaging manner. In front of customers, Tanmay is a statesman: a thorough professional, an excellent listener, and always seeking the common ground. I have been working in 'Setalyt' with Tanmay for the past many months and as a technical lead for the company, Tanmay has never failed to surprise us. Within the company, he is a collaborative team player, and can be relied upon to lead multi-functional projects diligently and through example. Beyond his role, he is ready to provide a helping hand wherever necessary. I recommend him highly."
        }
    ];

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % recommendations.length);
        }, 6000); // 6 seconds to give enough time to read
        return () => clearInterval(interval);
    }, [isHovered, recommendations.length]);

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % recommendations.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + recommendations.length) % recommendations.length);

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-gray-200 dark:border-white/5 overflow-hidden">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] dark:text-white">Kudos</h2>
                    
                    {/* Rotation Timer Indicator (Top Right) */}
                    <div className="hidden md:flex items-center justify-center relative w-12 h-12">
                        <svg className="w-10 h-10 -rotate-90 text-[#1a1a2e] dark:text-white">
                           <circle cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="none" className="opacity-10" />
                           <motion.circle 
                               cx="20" cy="20" r="16" stroke="currentColor" strokeWidth="3" fill="none" 
                               strokeDasharray={2 * Math.PI * 16}
                               initial={{ strokeDashoffset: 2 * Math.PI * 16 }}
                               animate={{ strokeDashoffset: isHovered ? undefined : 0 }}
                               transition={{ duration: 6, ease: "linear" }}
                               key={activeIndex}
                           />
                        </svg>
                        <span className="absolute text-xs font-bold">{activeIndex + 1}/{recommendations.length}</span>
                    </div>
                </div>

                <div 
                    className="relative rounded-3xl overflow-hidden bg-gray-100/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md hover:shadow-[0_0_40px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] transition-all duration-500"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                >
                    <div className="relative h-[650px] md:h-[450px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="absolute inset-0 w-full h-full flex p-6 sm:p-12 items-center justify-center"
                            >
                                <div className="w-full h-full flex flex-col justify-center items-center text-center">
                                    <MessageSquareQuote className="text-gray-300 dark:text-gray-600/50 mb-6 lg:mb-8 w-12 h-12 shrink-0" strokeWidth={1.5} />
                                    
                                    <p className="text-[#4a4a5a] dark:text-gray-300 italic text-base md:text-xl lg:text-2xl leading-relaxed max-w-4xl mb-8 flex-grow flex items-center">
                                        &quot;{recommendations[activeIndex].text}&quot;
                                    </p>
                                    
                                    <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10 relative w-full max-w-2xl px-8">
                                        <h3 className="font-bold text-[#1a1a2e] dark:text-white text-lg md:text-xl">{recommendations[activeIndex].name}</h3>
                                        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
                                            {recommendations[activeIndex].title}
                                        </p>
                                        <p className="text-xs md:text-sm text-gray-400 dark:text-orange-500/80 mt-2 font-medium">
                                            {recommendations[activeIndex].date}
                                        </p>
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
                    {recommendations.map((_, idx) => (
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
                               transition={{ duration: 6, ease: "linear" }}
                               key={activeIndex}
                           />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
