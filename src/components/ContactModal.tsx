"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("https://formsubmit.co/ajax/tanmay.moharana@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                    _subject: "New Contact Form Submission - Portfolio"
                })
            });

            if (res.ok) {
                setStatus("success");
                setTimeout(() => {
                    onClose();
                    setStatus("idle");
                    setName("");
                    setEmail("");
                    setMessage("");
                }, 2000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error", error);
            setStatus("error");
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 pointer-events-auto">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-[#080808]/80 backdrop-blur-md"
                    onClick={onClose}
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative w-full max-w-lg bg-white dark:bg-[#0e0e0e] border border-gray-200 dark:border-white/10 rounded-3xl shadow-[0_24px_48px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_48px_rgba(0,0,0,0.8)] overflow-hidden"
                >
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-[#1a1a2e] dark:text-[#e5e2e1] tracking-tight">Get in touch</h2>
                                <p className="text-sm text-gray-500 dark:text-[#6b7280] mt-1">Send an email directly to my primary inbox.</p>
                            </div>
                            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>

                        {status === "success" ? (
                            <div className="py-12 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-[#1a1a2e] dark:text-white">Message Sent!</h3>
                                <p className="text-sm text-gray-500 mt-2">I will get back to you as soon as possible.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-[#6b7280]">Name</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-[#1c1b1b] border border-gray-200 dark:border-white/10 text-sm p-3 rounded-xl outline-none focus:border-blue-500 dark:focus:border-white/30 transition-colors"
                                            placeholder="Your Name"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-[#6b7280]">Email</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-gray-50 dark:bg-[#1c1b1b] border border-gray-200 dark:border-white/10 text-sm p-3 rounded-xl outline-none focus:border-blue-500 dark:focus:border-white/30 transition-colors"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-500 dark:text-[#6b7280]">Message</label>
                                    <textarea 
                                        required
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        className="w-full bg-gray-50 dark:bg-[#1c1b1b] border border-gray-200 dark:border-white/10 text-sm p-3 rounded-xl min-h-[120px] outline-none focus:border-blue-500 dark:focus:border-white/30 transition-colors resize-y"
                                        placeholder="How can I help you?"
                                        style={{scrollbarWidth: 'thin'}}
                                    />
                                </div>

                                {status === "error" && (
                                    <p className="text-red-500 text-xs font-semibold">Something went wrong. Please try again or use mailto directly.</p>
                                )}

                                <div className="pt-4 flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={status === "sending"}
                                        className="px-6 py-2.5 bg-[#1a1a2e] text-white dark:bg-white dark:text-[#080808] rounded-xl text-sm font-semibold hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
                                    >
                                        {status === "sending" ? "Sending..." : "Send Message"}
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </motion.div>
            </div>
            )}
        </AnimatePresence>
    );
}
