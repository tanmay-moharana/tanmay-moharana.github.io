"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote } from "lucide-react";

export default function Recommendations() {
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

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-gray-200 dark:border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-16 text-[#1a1a2e] dark:text-white"
                >
                    Recommendations
                </motion.h2>

                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                >
                    {recommendations.map((rec, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex flex-col p-6 sm:p-8 rounded-3xl bg-gray-100/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-colors duration-300 relative overflow-hidden"
                        >
                            <MessageSquareQuote className="text-gray-300 dark:text-gray-600/50 mb-6 w-10 h-10 shrink-0" strokeWidth={1.5} />
                            
                            <p className="text-[#4a4a5a] dark:text-gray-300 italic text-sm sm:text-base leading-relaxed flex-grow mb-8 relative z-10">
                                &quot;{rec.text}&quot;
                            </p>
                            
                            <div className="mt-auto pt-6 border-t border-gray-200 dark:border-white/10 relative z-10">
                                <h3 className="font-bold text-[#1a1a2e] dark:text-white text-base">{rec.name}</h3>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2" title={rec.title}>
                                    {rec.title}
                                </p>
                                <p className="text-xs text-gray-400 dark:text-orange-500/80 mt-2 font-medium">
                                    {rec.date}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
