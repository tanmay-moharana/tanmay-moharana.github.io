"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ContactModal from "./ContactModal";

export default function ContactHeader() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 p-4 sm:p-6 z-50 flex justify-end items-center pointer-events-none">
            <motion.div
                initial={{ opacity: 0, y: -24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto"
            >
                <motion.button
                    onClick={() => setIsContactOpen(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 py-2.5 rounded-full border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-[#080808]/60 backdrop-blur-xl text-[#1a1a2e] dark:text-white font-medium hover:bg-white dark:hover:bg-white/10 transition-colors text-sm shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                >
                    Contact Me
                </motion.button>
            </motion.div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </header>
    );
}
