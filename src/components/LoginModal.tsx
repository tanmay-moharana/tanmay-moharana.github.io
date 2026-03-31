import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { auth, googleProvider, githubProvider } from "../lib/firebase";

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
            setError(null);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onClose();
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            onClose();
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Failed to sign in with Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleBackdropClick}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm text-gray-200 font-sans pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 10 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 10 }}
                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                        className="w-full max-w-md bg-[#131313] border border-[#45474c]/30 rounded-xl shadow-[0px_16px_32px_rgba(0,0,0,0.6)] overflow-hidden"
                    >
                        <div className="p-8 md:p-10 space-y-8">
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <div className="flex justify-center mb-6">
                                    <div className="h-12 w-12 bg-[#c0c7d6] flex items-center justify-center rounded-lg shadow-lg">
                                        {/* Material Symbol Alternative Using SVGs/Tailwind */}
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#2a313d]">
                                            <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.825 8.784L12 10.155l2.675 2.379zm-7.075-8.034h19.5v1.275l-9.75 8.665-9.75-8.665V4.5z" />
                                        </svg>
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight text-[#e5e2e1]">Welcome back</h2>
                                <p className="text-[#c5c6cc] text-sm">Log in to your DASHBOARD account to continue.</p>
                            </div>

                            {/* Social Login Cluster */}
                            <div className="grid grid-cols-1 gap-3">
                                <button 
                                    onClick={handleGoogleLogin} 
                                    disabled={loading}
                                    className="flex items-center justify-center gap-3 w-full h-12 bg-[#2a2a2a] hover:bg-[#393939] text-[#e5e2e1] rounded-lg transition-all duration-300 border border-[#45474c]/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                                    </svg>
                                    <span className="text-sm font-medium">Continue with Google</span>
                                </button>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 h-12 bg-[#2a2a2a] hover:bg-[#393939] text-[#e5e2e1] rounded-lg transition-all duration-300 border border-[#45474c]/20 group">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                                          <path fillRule="evenodd" d="M14.447 3.026a.75.75 0 0 1 .527.921l-4.5 16.5a.75.75 0 0 1-1.448-.394l4.5-16.5a.75.75 0 0 1 .921-.527ZM16.72 6.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 1 1-1.06-1.06L21.44 12l-4.72-4.72a.75.75 0 0 1 0-1.06Zm-9.44 0a.75.75 0 0 1 0 1.06L2.56 12l4.72 4.72a.75.75 0 0 1-1.06 1.06L.97 12.53a.75.75 0 0 1 0-1.06l5.25-5.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs font-medium uppercase tracking-wider">GitHub</span>
                                    </button>
                                    <button className="flex items-center justify-center gap-2 h-12 bg-[#2a2a2a] hover:bg-[#393939] text-[#e5e2e1] rounded-lg transition-all duration-300 border border-[#45474c]/20 group">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 group-hover:scale-110 transition-transform">
                                          <path fillRule="evenodd" d="M8.25 10.5a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0Zm-2.47 10.697a11.965 11.965 0 0 0 12.44 0c-.06-.06-.118-.124-.176-.188-1.554-1.745-3.818-2.76-6.234-2.76-2.416 0-4.68 1.015-6.234 2.76-.058.064-.116.128-.176.188Z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-xs font-medium uppercase tracking-wider">LinkedIn</span>
                                    </button>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="h-[1px] flex-1 bg-[#45474c]/40"></div>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c5c6cc]">or</span>
                                <div className="h-[1px] flex-1 bg-[#45474c]/40"></div>
                            </div>

                            {/* Email Form */}
                            <form onSubmit={handleLogin} className="space-y-5">
                                {error && (
                                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-lg text-center">
                                        {error}
                                    </div>
                                )}
                                <div className="space-y-1.5">
                                    <label className="text-xs uppercase tracking-widest text-[#c5c6cc] ml-1" htmlFor="email">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8f9096]">
                                              <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                              <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                            </svg>
                                        </div>
                                        <input 
                                            className="block w-full pl-12 pr-4 py-3 bg-[#0e0e0e] border border-[#45474c]/40 rounded-lg text-[#e5e2e1] placeholder:text-[#8f9096] focus:ring-1 focus:ring-[#c0c7d6] focus:border-[#c0c7d6] transition-all outline-none text-sm" 
                                            id="email" 
                                            name="email" 
                                            placeholder="name@company.com" 
                                            type="email"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-xs uppercase tracking-widest text-[#c5c6cc]" htmlFor="password">Password</label>
                                        <a className="text-[10px] uppercase tracking-widest text-[#c0c7d6] hover:text-[#e5e2e1] transition-colors" href="#">Forgot?</a>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8f9096]">
                                              <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <input 
                                            className="block w-full pl-12 pr-4 py-3 bg-[#0e0e0e] border border-[#45474c]/40 rounded-lg text-[#e5e2e1] placeholder:text-[#8f9096] focus:ring-1 focus:ring-[#c0c7d6] focus:border-[#c0c7d6] transition-all outline-none text-sm" 
                                            id="password" 
                                            name="password" 
                                            placeholder="••••••••" 
                                            type="password"
                                        />
                                    </div>
                                </div>
                                <button disabled={loading} className="w-full h-12 bg-[#c0c7d6] text-[#2a313d] font-bold text-sm rounded-lg hover:shadow-[0px_0px_20px_rgba(192,199,214,0.3)] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed" type="submit">
                                    {loading ? "Signing in..." : "Sign In to Dashboard"}
                                </button>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="bg-[#1c1b1b] py-6 px-10 flex justify-center">
                            <p className="text-xs text-[#c5c6cc]">
                                Don't have an account? 
                                <a className="text-[#c0c7d6] font-semibold hover:underline ml-1" href="#">Create one now</a>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
