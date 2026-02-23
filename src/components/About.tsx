"use client";

import { motion } from "framer-motion";

export default function About() {
    return (
        <section className="bg-[#080808] py-20 md:py-32 px-6 md:px-12 relative z-20 border-t border-white/5">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-sm font-semibold tracking-widest text-[#a1a1aa] uppercase mb-8">
                        About Me
                    </h2>
                    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-[1.3] text-white mb-10">
                        A seasoned digital transformation and product development leader with over eight years of experience successfully guiding cross-functional teams from strategy to execution.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-3xl leading-relaxed">
                        My expertise lies in managing the end-to-end product lifecycle to deliver groundbreaking digital solutions and IoT products, specifically tailored to drive efficiency, innovation, and sustainable growth within the demanding manufacturing sector.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl leading-relaxed">
                        Beyond my professional life, I&apos;m an avid gamer with a passion for sim racing. I also enjoy coding, playing Badminton, and listening to music.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
