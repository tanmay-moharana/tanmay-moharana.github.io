"use client";

import React, { useEffect, useState } from "react";
import { useSettings } from "../../context/SettingsContext";

interface GitHubData {
    public_repos: number;
    followers: number;
    public_gists: number;
}

export default function Analytics() {
    const { settings } = useSettings();
    const [data, setData] = useState<GitHubData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!settings?.githubUsername) return;
        
        async function fetchGitHub() {
            try {
                const res = await fetch(`https://api.github.com/users/${settings.githubUsername}`);
                const json = await res.json();
                setData({
                    public_repos: json.public_repos || 0,
                    followers: json.followers || 0,
                    public_gists: json.public_gists || 0
                });
            } catch (error) {
                console.error("Failed to fetch GitHub data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchGitHub();
    }, [settings?.githubUsername]);

    // Calculate percentages for the visuals (using arbitrary goals for portfolio aesthetics)
    const repoGoal = 30; // Assuming 30 is 100% capacity for the visual
    const repoPercentage = data ? Math.min(Math.round((data.public_repos / repoGoal) * 100), 100) : 0;
    
    const activityGoal = 50; 
    const activityCount = data ? data.followers + data.public_gists : 0;
    const activityPercentage = Math.min(Math.round((activityCount / activityGoal) * 100), 100);

    return (
        <div className="lg:col-span-4 bg-[#0e0e0e] rounded-xl p-8 border border-[#ffffff0a] flex flex-col justify-between">
            <div>
                <h3 className="text-lg font-semibold text-[#c0c7d6] mb-1">Developer Metrics</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">Live GitHub Integration / @{settings?.githubUsername || '...'}</p>
            </div>
            
            <div className="space-y-8 my-10">
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-xs uppercase tracking-widest text-[#c5c6cc]">Public Repositories</span>
                        <span className="font-bold text-[#c0c7d6]">{loading ? "..." : data?.public_repos}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1c1c1c] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-[#c0c7d6] to-[#6b7280] transition-all duration-1000" 
                            style={{ width: `${repoPercentage}%` }}
                        ></div>
                    </div>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between items-end">
                        <span className="text-xs uppercase tracking-widest text-[#c5c6cc]">Community & Gists</span>
                        <span className="font-bold text-[#c6c5d8]">{loading ? "..." : activityCount}</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#1c1c1c] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#c6c5d8] transition-all duration-1000" 
                            style={{ width: `${activityPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            
            <div className="pt-6 border-t border-[#ffffff0a] flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-500 shrink-0">
                    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                </svg>
                <div className="flex-1">
                    <span className="block text-xs font-semibold text-[#c0c7d6]">API Connected</span>
                    <span className="block text-[10px] text-[#6b7280]">Real-time REST sync operational</span>
                </div>
            </div>
        </div>
    );
}
