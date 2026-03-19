"use client";

import { motion } from "framer-motion";
import { Trophy, Award, Star } from "lucide-react";

export default function HonorsAwards() {
    const awards = [
        {
            title: "Top 5 Finalist - EIT Jumpstarter 2019",
            organization: "Hermit Labs (out of 70 European startups)",
            date: "11/2019",
            icon: Trophy,
            color: "text-yellow-400",
            bg: "bg-yellow-400/10",
            border: "border-yellow-400/20"
        },
        {
            title: "Audience Award Nominee - futureSax-2019",
            organization: "Hermit Labs (20 startups from Saxony)",
            date: "06/2019",
            icon: Award,
            color: "text-blue-400",
            bg: "bg-blue-400/10",
            border: "border-blue-400/20"
        },
        {
            title: "Design Innovation Workshop - MIT Media Lab",
            organization: "Selected from 50,000+ applicants in India",
            date: "01/2015",
            icon: Star,
            color: "text-purple-400",
            bg: "bg-purple-400/10",
            border: "border-purple-400/20"
        }
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-white"
                >
                    Honors & Awards
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {awards.map((award, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className={`p-6 rounded-2xl bg-white/5 backdrop-blur-md border ${award.border} hover:border-white/20 transition-all duration-400 group flex flex-col items-start`}
                        >
                            <div className={`p-4 rounded-xl ${award.bg} ${award.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <award.icon size={32} strokeWidth={1.5} />
                            </div>
                            
                            <div className="mt-auto w-full">
                                <h3 className="text-xl font-bold text-white leading-tight mb-2">{award.title}</h3>
                                <p className="text-white/60 text-sm mb-4 leading-relaxed">{award.organization}</p>
                                <div className="mt-auto flex justify-between items-center w-full pt-4 border-t border-white/10">
                                    <span className="text-[#a1a1aa] text-sm font-medium tracking-wider">{award.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div >
        </section >
    );
}
