"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            onClick={toggleTheme}
            className="relative flex items-center w-[44px] h-[24px] rounded-full transition-colors duration-500 focus:outline-none"
            style={{
                backgroundColor: isDark ? "rgba(53, 53, 52, 0.8)" : "rgba(255, 223, 159, 0.5)",
                boxShadow: isDark
                    ? "0 0 12px rgba(255,255,255,0.08), inset 0 1px 2px rgba(0,0,0,0.3)"
                    : "0 0 12px rgba(251,191,36,0.25), inset 0 1px 2px rgba(0,0,0,0.05)",
            }}
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
            {/* Thumb */}
            <motion.div
                layout
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute flex items-center justify-center w-[18px] h-[18px] rounded-full"
                style={{
                    left: isDark ? "3px" : "23px",
                    backgroundColor: isDark ? "#ffffff" : "#ffdf9f",
                    boxShadow: isDark
                        ? "0 0 8px rgba(255,255,255,0.4)"
                        : "0 0 8px rgba(251,191,36,0.6)",
                }}
            >
                {isDark ? (
                    <Moon size={10} className="text-[#131313]" strokeWidth={2.5} />
                ) : (
                    <Sun size={10} className="text-[#8B6914]" strokeWidth={2.5} />
                )}
            </motion.div>
        </button>
    );
}
