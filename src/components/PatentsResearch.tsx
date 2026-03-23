"use client";

import { motion } from "framer-motion";
import { Award, BookOpen } from "lucide-react";

export default function PatentsResearch() {
    const patents = [
        { title: "Vibrating screen panel health monitoring system.", id: "WO 2014136121 A1" },
        { title: "Trommel assembly.", id: "US 9364864 B2" },
        { title: "Snap fit fixing system for screen panels", id: "US 9327318 B2" },
        { title: "Fixing arrangement having multistage contoured snap-fit fixing means for fixing of a screen panel on a support structure.", id: "WO 2015170334 A1" },
        { title: "Trommel assembly having a spiral assembly with decaying pitch", id: "US 20160129477 A1" },
    ];

    const research = [
        { title: "Developing a remote data acquisition, production information and visualization system in mineral processing industry based on Internet of Things.", journal: "Proceedings of International Conference on Mineral Processing Technology' MPT2014" },
        { title: "A study on usage of Augmented Reality and modern mobile technologies in information management in mining and mineral processing industries.", journal: "Proceedings of International Conference on Mineral Processing Technology' MPT2014" },
        { title: "Analyzing screening operation using discrete element method (DEM) and predicting the strength and wear of polyurethane decks using FEM.", journal: "Proceedings of International Conference on Mineral Processing Technology' MPT2014" },
        { title: "Design and Optimisation of Polymer screen panel using the hyper elastic, visco-elastic and creep properties of polymer material.", journal: "Proceedings of International Conference on Mineral Processing Technology' MPT2014" },
        { title: "Role of renewable energy in building a sustainable mining and mineral processing ecosystem.", journal: "Proceedings of International Conference on Mineral Processing Technology' MPT2017" },
    ];

    return (
        <section className="py-24 md:py-32 px-6 md:px-12 relative z-20 border-t border-gray-200 dark:border-white/5">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

                {/* Patents Column */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-black/5 dark:bg-white/10 rounded-xl text-[#1a1a2e] dark:text-white">
                            <Award size={24} />
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] dark:text-white">Patents</h2>
                    </div>

                    <div className="space-y-6">
                        {patents.map((patent, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="p-6 rounded-2xl bg-gray-100/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:bg-gray-200/60 dark:hover:bg-white/10 transition-colors backdrop-blur-md"
                            >
                                <h3 className="text-lg font-medium text-[#1a1a2e] dark:text-white mb-2 leading-snug">{patent.title}</h3>
                                <span className="text-sm font-mono text-[#6b7280] dark:text-[#a1a1aa] bg-gray-200/60 dark:bg-black/50 px-3 py-1 rounded-md inline-block border border-gray-200 dark:border-white/10">
                                    {patent.id}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Research Column */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center gap-4 mb-10">
                        <div className="p-3 bg-black/5 dark:bg-white/10 rounded-xl text-[#1a1a2e] dark:text-white">
                            <BookOpen size={24} />
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a2e] dark:text-white">Research</h2>
                    </div>

                    <div className="space-y-6">
                        {research.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative pl-6 before:absolute before:left-0 before:top-3 before:w-2 before:h-px before:bg-gray-400 dark:before:bg-white/30"
                            >
                                <h3 className="text-lg font-medium text-[#1a1a2e] dark:text-white mb-2 leading-snug">{item.title}</h3>
                                <p className="text-sm text-[#6b7280] dark:text-[#a1a1aa] leading-relaxed italic border-l-2 border-gray-300 dark:border-white/20 pl-4 mt-3">
                                    {item.journal}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
