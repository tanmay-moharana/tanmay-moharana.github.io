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
        <section className="bg-[#080808] py-32 px-6 md:px-12 relative z-20 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold mb-16 text-white"
                >
                    Experience
                </motion.h2>

                <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.1 * idx }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                        >
                            {/* Timeline dot */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-[#121212] group-hover:bg-white transition-colors duration-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(255,255,255,0.05)] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] z-10">
                                <div className="w-2 h-2 rounded-full bg-white/40 group-hover:bg-black transition-colors duration-400" />
                            </div>

                            {/* Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md group-hover:border-white/20 transition-colors duration-400">
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
                    ))}
                </div>
            </div>
        </section>
    );
}
