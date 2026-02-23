"use client";

import { motion } from "framer-motion";

export default function Experience() {
    const experiences = [
        {
            company: "Bridgestone Mobility Solutions",
            role: "Product Manager – Hardware Platform",
            duration: "11/2023 – Present",
            description: "Managing the end-to-end product lifecycle for hardware platforms in mobility solutions.",
        },
        {
            company: "KONUX, GmbH",
            role: "Junior Product Manager",
            duration: "09/2021 – 11/2023",
            description: "Guided cross-functional teams from strategy to execution for IoT products in the manufacturing and railway sectors.",
        },
        {
            company: "Hermit Labs",
            role: "Co-Founder / Chief Product Officer",
            duration: "08/2018 – 08/2021",
            description: "Spearheaded digital solutions tailored to drive efficiency, innovation, and sustainable growth.",
        },
        {
            company: "MotionTag GmbH",
            role: "Data Analyst Intern",
            duration: "09/2018 – 12/2018",
            description: "Analyzed mobility data to improve product algorithms.",
        },
        {
            company: "The Linde Group",
            role: "Intern - Digital Innovation",
            duration: "04/2017 – 09/2017",
            description: "Explored digital transformation strategies and new digital solutions.",
        },
        {
            company: "Tega Industries Ltd.",
            role: "Snr. Research & Development Engineer",
            duration: "07/2011 – 09/2015",
            description: "Led R&D for mineral processing products and polymer materials.",
        },
    ];

    return (
        <section className="bg-[#080808] py-20 md:py-32 px-6 md:px-12 relative z-20 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 sm:mb-16 text-white"
                >
                    Experience
                </motion.h2>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group w-full">
                            {/* Timeline Dot */}
                            <div className="absolute left-[20px] md:left-1/2 -ml-1.5 md:-translate-x-1/2 w-3 h-3 rounded-full bg-white/20 border-2 border-[#080808] z-10 
                                transition-all duration-300 group-hover:bg-white group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            </div>

                            {/* Timeline Content */}
                            <motion.div
                                initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-[calc(100%-3rem)] md:w-5/12 ml-auto md:ml-0"
                            >
                                {/* Card */}
                                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:border-white/20 transition-colors duration-400">
                                    <div className="flex flex-col mb-2">
                                        <span className="text-sm font-medium text-[#a1a1aa] mb-1 tracking-wider">{exp.duration}</span>
                                        <h3 className="text-xl font-bold text-white leading-tight">{exp.role}</h3>
                                        <span className="text-white/60 font-medium text-sm mt-1">{exp.company}</span>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mt-4">
                                        {exp.description}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div >
        </section >
    );
}
