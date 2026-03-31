"use client";

import React, { useState } from "react";

export default function AgentsList() {
    const [agent1Status, setAgent1Status] = useState<"Ready" | "Processing" | "Done">("Ready");
    const [agent2Status, setAgent2Status] = useState<"Standby" | "Generating" | "Fetched">("Standby");
    
    const [lastResponse, setLastResponse] = useState<string | null>(null);

    // Simulated AI Processing (Mock API Delay)
    const triggerArchitect = async () => {
        setAgent1Status("Processing");
        setLastResponse("Code Auditor is scanning system architecture...");
        
        // Simulate a 2-second processing delay
        setTimeout(() => {
            setAgent1Status("Done");
            setLastResponse("Code Auditor: No logic vulnerabilities found. System is optimal.");
            
            // Revert back to ready after a few seconds
            setTimeout(() => setAgent1Status("Ready"), 5000);
        }, 2000);
    };

    // Real API Request to AdviceSlip (Acting as an "AI Generator")
    const triggerScribe = async () => {
        setAgent2Status("Generating");
        setLastResponse("Advice Generator is fetching insight via REST API...");
        
        try {
            const res = await fetch("https://api.adviceslip.com/advice", { cache: "no-store" });
            const data = await res.json();
            setLastResponse(`Advice Generator: "${data.slip.advice}"`);
            setAgent2Status("Fetched");
        } catch (error) {
            setLastResponse("Advice Generator encountered an API connection error.");
            setAgent2Status("Standby");
        }

        setTimeout(() => setAgent2Status("Standby"), 5000);
    };

    return (
        <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-[#c0c7d6]">Active API Gateways</h3>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c0c7d6] cursor-pointer hover:underline">Manage All</span>
            </div>

            {/* Notification Banner for API Responses */}
            {lastResponse && (
                <div className="w-full bg-[#c0c7d6]/10 border border-[#c0c7d6]/20 text-[#c0c7d6] p-4 rounded-lg text-sm font-mono animate-pulse">
                    &gt; {lastResponse}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Agent Card 1 */}
                <div className="group bg-[#1c1b1b] rounded-xl p-6 hover:bg-[#201f1f] transition-all duration-300 border border-transparent hover:border-[#ffffff0a]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#c0c7d6] to-[#6b7280] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#2a313d]">
                                <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5ZM18 1.5a.75.75 0 0 1 .728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 0 1 0 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 0 1-1.456 0l-.258-1.036a2.625 2.625 0 0 0-1.91-1.91l-1.036-.258a.75.75 0 0 1 0-1.456l1.036-.258a2.625 2.625 0 0 0 1.91-1.91l.258-1.036A.75.75 0 0 1 18 1.5ZM16.5 15a.75.75 0 0 1 .712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 0 1 0 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 0 1-1.422 0l-.395-1.183a1.5 1.5 0 0 0-.948-.948l-1.183-.395a.75.75 0 0 1 0-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0 1 16.5 15Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="px-3 py-1 bg-[#2a2a2a] text-[10px] uppercase tracking-widest text-[#c5c6cc] rounded-full">Simulated Proxy</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#e5e2e1] mb-2">Code Auditor</h4>
                    <p className="text-sm text-[#c5c6cc] mb-6 leading-relaxed">System-wide infrastructure optimization and code auditing.</p>
                    <div className="flex items-center justify-between border-t border-[#ffffff0a] pt-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${agent1Status === "Ready" ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : agent1Status === "Processing" ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'}`}></div>
                            <span className="text-xs uppercase tracking-tighter">{agent1Status}</span>
                        </div>
                        <button 
                            onClick={triggerArchitect}
                            disabled={agent1Status !== "Ready"}
                            className="text-xs uppercase tracking-widest text-[#c0c7d6] hover:text-[#e5e2e1] transition-colors disabled:opacity-50"
                        >
                            Trigger
                        </button>
                    </div>
                </div>

                {/* Agent Card 2 */}
                <div className="group bg-[#1c1b1b] rounded-xl p-6 hover:bg-[#201f1f] transition-all duration-300 border border-transparent hover:border-[#ffffff0a]">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-lg bg-[#2a2a2a] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#c6c5d8]">
                                <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <span className="px-3 py-1 bg-[#2a2a2a] text-[10px] uppercase tracking-widest text-[#c5c6cc] rounded-full">REST API Fetch</span>
                    </div>
                    <h4 className="text-lg font-bold text-[#e5e2e1] mb-2">Advice Generator</h4>
                    <p className="text-sm text-[#c5c6cc] mb-6 leading-relaxed">External fetch generating random code quotes via API.</p>
                    <div className="flex items-center justify-between border-t border-[#ffffff0a] pt-4">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${agent2Status === "Standby" ? 'bg-[#c6c5d8] shadow-[0_0_8px_rgba(198,197,216,0.5)]' : agent2Status === "Generating" ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] animate-pulse' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}></div>
                            <span className="text-xs uppercase tracking-tighter">{agent2Status}</span>
                        </div>
                        <button 
                            onClick={triggerScribe}
                            disabled={agent2Status !== "Standby"}
                            className="text-xs uppercase tracking-widest text-[#c0c7d6] hover:text-[#e5e2e1] transition-colors disabled:opacity-50"
                        >
                            Trigger
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
