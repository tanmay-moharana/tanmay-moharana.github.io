"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";

interface Task {
    id: string;
    title: string;
    description: string;
    status: "todo" | "in-progress" | "done";
    priority: "High" | "Medium" | "Low";
}

interface TaskModalProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function TaskModal({ task, isOpen, onClose }: TaskModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<"High"|"Medium"|"Low">("Medium");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description || "");
            setPriority(task.priority);
        }
    }, [task]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: globalThis.KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSave = async () => {
        if (!task || !title.trim()) return;
        setIsSaving(true);
        try {
            await updateDoc(doc(db, "tasks", task.id), {
                title,
                description,
                priority
            });
            onClose();
        } catch (error) {
            console.error("Failed to update task", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (!isOpen || !task) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#080808]/80 backdrop-blur-md"
                    onClick={onClose}
                />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative w-full max-w-2xl bg-[#0e0e0e] border border-[#ffffff0a] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#ffffff0a] bg-[#1c1b1b]/50 shrink-0">
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] text-[#6b7280] font-mono tracking-widest uppercase">ID-{task.id.slice(0, 4)}</span>
                            <span className={`px-2 py-0.5 rounded text-[8px] uppercase font-bold tracking-widest ${
                                task.status === 'done' ? 'bg-emerald-500/10 text-emerald-500' :
                                task.status === 'in-progress' ? 'bg-amber-500/10 text-amber-500' :
                                'bg-[#c0c7d6]/10 text-[#c0c7d6]'
                            }`}>
                                {task.status.replace('-', ' ')}
                            </span>
                        </div>
                        <button onClick={onClose} className="text-[#6b7280] hover:text-[#e5e2e1] transition-colors p-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                        <div>
                            <input 
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-transparent text-xl md:text-2xl font-bold text-[#e5e2e1] placeholder-[#6b7280] outline-none border-b border-transparent focus:border-[#c0c7d6]/30 pb-2 transition-colors"
                                placeholder="Task Title"
                            />
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="space-y-1">
                                <label className="text-[10px] uppercase text-[#6b7280] tracking-widest font-bold">Priority</label>
                                <select 
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value as "High"|"Medium"|"Low")}
                                    className="bg-[#1c1b1b] border border-[#ffffff0a] text-sm text-[#c0c7d6] py-1.5 px-3 rounded-lg outline-none focus:border-[#c0c7d6]"
                                >
                                    <option value="High">🔴 High</option>
                                    <option value="Medium">🟡 Medium</option>
                                    <option value="Low">🟢 Low</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] uppercase text-[#6b7280] tracking-widest font-bold mb-3">Notebook / Markdown</label>
                            <textarea 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Write detailed checklists, notes, or implementation constraints here..."
                                className="w-full bg-[#1c1b1b] border border-[#ffffff0a] text-sm text-[#e5e2e1] p-4 rounded-xl min-h-[200px] outline-none focus:border-[#c0c7d6] transition-colors leading-relaxed resize-y"
                                style={{scrollbarWidth: 'thin'}}
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-6 py-4 bg-[#1c1b1b]/50 border-t border-[#ffffff0a] shrink-0">
                        <span className="text-xs text-[#6b7280]">
                            Press <kbd className="font-mono bg-[#2a2a2a] px-1.5 py-0.5 rounded text-[#c5c6cc]">Esc</kbd> to discard
                        </span>
                        <div className="flex gap-3">
                            <button onClick={onClose} className="px-4 py-2 text-[#e5e2e1] text-xs font-bold uppercase tracking-widest hover:bg-[#ffffff0a] rounded-lg transition">
                                Cancel
                            </button>
                            <button 
                                onClick={handleSave} 
                                disabled={isSaving || !title.trim()}
                                className="px-6 py-2 bg-[#c0c7d6] text-[#2a313d] rounded-lg text-xs font-bold uppercase tracking-widest active:scale-95 transition-all disabled:opacity-50"
                            >
                                {isSaving ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
