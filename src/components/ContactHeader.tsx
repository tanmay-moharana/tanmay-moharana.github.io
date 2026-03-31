"use client";

import React, { useState } from "react";
import ContactModal from "./ContactModal";

export default function ContactHeader() {
    const [isContactOpen, setIsContactOpen] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 p-4 sm:p-6 z-50 flex justify-end items-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-4">
                <button 
                    onClick={() => setIsContactOpen(true)} 
                    className="px-5 py-2.5 rounded-full border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-[#080808]/50 backdrop-blur-xl text-[#1a1a2e] dark:text-white font-medium hover:bg-white dark:hover:bg-white/10 transition-all text-sm shadow-sm"
                >
                    Contact Me
                </button>
            </div>

            <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </header>
    );
}
