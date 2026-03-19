"use client";

import { motion } from "framer-motion";
import { Briefcase, BarChart3, Cloud, Code2, BadgeCheck } from "lucide-react";

export default function Skills() {
    const keySkills = [
        "IIoT Product Roadmaps", "CBM Solutions", "Remote Optimization", "Agile/Scrum Delivery",
        "IoT Gateways & Sensors", "Data Pipelines", "Edge Computing", "AI-Driven Solutions",
        "Cross-functional Leadership", "Industrial Automation", "Global Stakeholder Mgmt", "Feature Rollouts"
    ];

    const techSkills = [
        {
            category: "Product Management",
            icon: Briefcase,
            skills: "Productboard, Jira, Confluence, HubSpot, Figma, Pendo",
            color: "text-blue-400"
        },
        {
            category: "Data & Analytics",
            icon: BarChart3,
            skills: "SQL, Python, R, Microsoft Power-BI, Azure Cloud, Tableau",
            color: "text-emerald-400"
        },
        {
            category: "IIoT & Cloud",
            icon: Cloud,
            skills: "Edge Computing, MQTT, REST APIs, Cellular IoT (LTE-M, NB-IoT), AWS IoT, Google Cloud, Firebase",
            color: "text-cyan-400"
        },
        {
            category: "Programming",
            icon: Code2,
            skills: "Python, JavaScript/TypeScript, C/C++, HTML/CSS, Flutter",
            color: "text-violet-400"
        }
    ];

    const certificates = [
        "Generative AI for Product Managers – LinkedIn",
        "Lean Six Sigma Yellow Belt – MoreSteam",
        "Product Strategy Micro-Certification (PSC)™ – Product School",
        "Certified Scrum Product Owner® (CSPO®) – Scrum Alliance",
        "Cyber Security Foundation (CSFPC™) – CertiProf",
        "Industrial IoT on Google Cloud Platform – Google",
        "Enterprise Design Thinking Practitioner – IBM"
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-white/5">
            <div className="max-w-4xl mx-auto space-y-24">
                
                {/* Key Skills */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 text-white"
                    >
                        Key Skills
                    </motion.h2>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex flex-wrap gap-3"
                    >
                        {keySkills.map((skill, idx) => (
                            <motion.span
                                key={idx}
                                variants={itemVariants}
                                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>

                {/* Technical Skills */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 text-white"
                    >
                        Technical Skills
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {techSkills.map((tech, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors duration-400 group"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className={`p-3 rounded-lg bg-white/5 ${tech.color} group-hover:scale-110 transition-transform duration-300`}>
                                        <tech.icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{tech.category}</h3>
                                </div>
                                <p className="text-gray-400 text-sm leading-relaxed pl-[3.25rem]">
                                    {tech.skills}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Licenses & Certificates */}
                <div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-10 text-white"
                    >
                        Licenses & Certificates
                    </motion.h2>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-4"
                    >
                        {certificates.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors duration-300"
                            >
                                <BadgeCheck className="text-yellow-400 shrink-0" size={24} strokeWidth={1.5} />
                                <span className="text-gray-200 font-medium text-base sm:text-lg">{cert}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
