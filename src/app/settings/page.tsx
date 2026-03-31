"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";

export default function SettingsPage() {
    const { user, loading, logout } = useAuth();
    const { settings, updateSettings, loadingSettings } = useSettings();
    const router = useRouter();
    
    const [githubUsername, setGithubUsername] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [savedMsg, setSavedMsg] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!loadingSettings) {
            setGithubUsername(settings.githubUsername || "");
        }
    }, [loadingSettings, settings]);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        await updateSettings({ githubUsername });
        setIsSaving(false);
        setSavedMsg(true);
        setTimeout(() => setSavedMsg(false), 3000);
    };

    if (loading || !user || loadingSettings) {
        return (
            <div className="min-h-screen bg-[#080808] flex items-center justify-center p-4">
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c0c7d6] animate-pulse"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c0c7d6] animate-pulse delay-75"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#c0c7d6] animate-pulse delay-150"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#080808] text-white selection:bg-[#c0c7d6] selection:text-[#080808] pb-32">
            <nav className="fixed top-0 w-full z-50 bg-[#080808]/80 backdrop-blur-xl border-b border-[#ffffff0a]">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push('/dashboard')}>
                        <div className="w-8 h-8 rounded bg-[#1c1b1b] border border-[#ffffff0a] flex items-center justify-center text-[#c0c7d6] hover:bg-[#201f1f] transition cursor-pointer">
                            &larr;
                        </div>
                        <span className="text-xl font-bold tracking-tight text-[#e5e2e1]">Settings</span>
                    </div>
                </div>
            </nav>

            <main className="pt-28 px-4 md:px-8 max-w-[800px] mx-auto space-y-12">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="bg-[#0e0e0e] rounded-xl border border-[#ffffff0a] overflow-hidden">
                        <div className="px-6 py-5 border-b border-[#ffffff0a] bg-[#1c1b1b]/50">
                            <h3 className="text-lg font-semibold text-[#e5e2e1]">Global Preferences</h3>
                            <p className="text-sm text-[#6b7280] mt-1">Manage external API integrations driving the developer metrics.</p>
                        </div>
                        <div className="p-6">
                            <form onSubmit={handleSave} className="space-y-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-widest text-[#c0c7d6] mb-2 font-bold">
                                        GitHub Username
                                    </label>
                                    <input 
                                        type="text" 
                                        value={githubUsername}
                                        onChange={(e) => setGithubUsername(e.target.value)}
                                        placeholder="tanmay-moharana"
                                        className="w-full bg-[#1c1c1c] border border-[#ffffff0a] focus:border-[#c0c7d6] outline-none text-[#e5e2e1] px-4 py-3 rounded-lg text-sm transition"
                                    />
                                    <p className="text-xs text-[#6b7280] mt-2">
                                        This dynamically links your public repositories and gists to the Dashboard UI models module.
                                    </p>
                                </div>

                                <div className="border-t border-[#ffffff0a] pt-6 flex items-center justify-end gap-4">
                                    <span className={`text-xs text-emerald-500 font-bold tracking-widest uppercase transition-opacity ${savedMsg ? 'opacity-100' : 'opacity-0'}`}>
                                        Saved successfully
                                    </span>
                                    <button 
                                        type="submit" 
                                        className={`px-6 py-2.5 bg-[#c0c7d6] text-[#2a313d] rounded-lg text-xs font-bold uppercase tracking-widest active:scale-95 transition-all ${isSaving ? 'opacity-70 pointer-events-none' : ''}`}
                                    >
                                        {isSaving ? "Saving..." : "Save Config"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                     <div className="bg-[#1c1b1b] rounded-xl border border-red-500/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h4 className="text-[#e5e2e1] font-semibold mb-1">Account Destruction</h4>
                            <p className="text-sm text-[#6b7280]">Sign out of your current administration scope.</p>
                        </div>
                        <button onClick={logout} className="px-5 py-2.5 bg-red-500/10 text-red-500 rounded-lg text-xs font-bold uppercase tracking-widest active:scale-95 transition hover:bg-red-500/20 whitespace-nowrap">
                            Secure Logout
                        </button>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
