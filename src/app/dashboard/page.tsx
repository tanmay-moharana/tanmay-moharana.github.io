"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Analytics from "../../components/dashboard/Analytics";
import AgentsList from "../../components/dashboard/AgentsList";
import KanbanBoard from "../../components/dashboard/KanbanBoard";

export default function DashboardPage() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center text-[#c0c7d6] tracking-widest text-sm uppercase">Authenticating...</div>;
    }

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        await logout();
        router.push("/");
    };
    return (
        <div className="flex min-h-screen bg-[#0e0e0e] text-[#c5c6cc] font-sans selection:bg-[#c0c7d6] selection:text-[#2a313d]">
            {/* SideNavBar Shell */}
            <aside className="h-full w-64 border-r border-[#ffffff0a] bg-[#0e0e0e] fixed left-0 top-0 z-40 hidden md:flex flex-col py-6 px-4 space-y-2">
                <div className="mb-10 px-2">
                    <h1 className="font-bold text-[#c0c7d6] text-2xl tracking-tighter">TANMAY</h1>
                    <p className="text-sm tracking-wide text-[#6b7280] mt-1">Premium Tier</p>
                </div>

                <nav className="flex-1 space-y-1">
                    {/* Active Tab: Board */}
                    <a className="flex items-center gap-3 px-3 py-2.5 bg-[#1c1c1c] text-[#c0c7d6] rounded-lg font-semibold hover:translate-x-1 transition-transform duration-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM5.25 9a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-.75.75H6a.75.75 0 0 1-.75-.75V9Zm6 2.25a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 .75.75v3a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75v-3Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm tracking-wide">Board</span>
                    </a>
                    
                    <a className="flex items-center gap-3 px-3 py-2.5 text-[#c5c6cc] hover:bg-[#131313] rounded-lg hover:translate-x-1 transition-transform duration-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v1.275a5.253 5.253 0 0 1 3.25 10.74 3.75 3.75 0 0 1 3.25 3.765 1.5 1.5 0 0 1-3 0 2.25 2.25 0 0 0-4.5 0 1.5 1.5 0 0 1-3 0 2.25 2.25 0 0 0-4.5 0 1.5 1.5 0 0 1-3 0 3.75 3.75 0 0 1 3.25-3.765 5.253 5.253 0 0 1 3.25-10.74V3a.75.75 0 0 1 .75-.75Zm3.75 7.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm tracking-wide">AI Agents</span>
                    </a>
                    
                    <a className="flex items-center gap-3 px-3 py-2.5 text-[#c5c6cc] hover:bg-[#131313] rounded-lg hover:translate-x-1 transition-transform duration-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75ZM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 0 1-1.875-1.875V8.625ZM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 0 1 3 19.875v-6.75Z" />
                        </svg>
                        <span className="text-sm tracking-wide">Usage</span>
                    </a>
                    
                    <a className="flex items-center gap-3 px-3 py-2.5 text-[#c5c6cc] hover:bg-[#131313] rounded-lg hover:translate-x-1 transition-transform duration-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm tracking-wide">Settings</span>
                    </a>
                </nav>

                <div className="pt-6 mt-6 border-t border-[#ffffff0a] space-y-1">
                    <a className="flex items-center gap-3 px-3 py-2.5 text-[#6b7280] hover:text-[#c0c7d6] transition-colors duration-200" href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-1.143-3.878-.291-.252.14-.576.035-.732-.236l-.375-.65a.5.5 0 0 1 .15-.694c1.976-1.155 4.194-1.042 5.674.25A4.05 4.05 0 0 1 15.75 10.5c0 1.25-.494 2.196-1.196 3.033-.42.502-.857.925-1.155 1.252A.5.5 0 0 1 13 14.5h-.5a.5.5 0 0 1-.5-.487c-.012-.478.114-.944.331-1.332.25-.447.674-.836 1.078-1.22l.067-.063c.484-.461.774-.91.774-1.423 0-1.299-.861-2.126-2.072-2.185Z" clipRule="evenodd" />
                          <circle cx="12" cy="18" r="1.125" />
                        </svg>
                        <span className="text-[10px] uppercase tracking-[0.2em]">Support</span>
                    </a>
                    <a onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-[#6b7280] hover:text-[#c0c7d6] cursor-pointer transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path fillRule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM6.166 5.106a.75.75 0 0 1 0 1.06 8.25 8.25 0 1 0 11.668 0 .75.75 0 1 1 1.06-1.06c3.808 3.807 3.808 9.98 0 13.788-3.807 3.808-9.98 3.808-13.788 0-3.808-3.807-3.808-9.98 0-13.788a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                        <span className="text-[10px] uppercase tracking-[0.2em]">Logout</span>
                    </a>
                </div>
            </aside>

            {/* Main Content Canvas */}
            <main className="flex-1 md:ml-64 bg-[#131313] min-h-screen pb-12">
                {/* TopAppBar */}
                <header className="fixed top-0 right-0 left-0 md:left-64 z-30 h-20 bg-[#131313]/60 backdrop-blur-xl flex justify-between items-center px-8 shadow-[0px_16px_32px_rgba(0,0,0,0.4)]">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280]">Dashboard</span>
                        <h2 className="text-xl font-bold tracking-tight text-[#c0c7d6]">Welcome back, {user.email?.split('@')[0] || "Commander"}</h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-8">
                            <a className="text-sm tracking-tight text-[#c0c7d6] border-b-2 border-[#c0c7d6] pb-1" href="#">Dashboard</a>
                            <a className="text-sm tracking-tight text-[#c5c6cc] hover:text-[#c0c7d6] transition-colors" href="#">Agents</a>
                            <a className="text-sm tracking-tight text-[#c5c6cc] hover:text-[#c0c7d6] transition-colors" href="#">Work</a>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-[#1c1c1c] flex items-center justify-center cursor-pointer active:scale-95 transition-transform text-[#c0c7d6]">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                              <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </header>

                <div className="pt-28 px-4 md:px-8 max-w-[1600px] mx-auto space-y-12">
                    {/* Bento Grid Section: Top Tier */}
                    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <AgentsList />
                        <Analytics />
                    </section>

                    {/* Kanban Board Section */}
                    <KanbanBoard />
                </div>

                {/* Footer Shell */}
                <footer className="w-full py-12 border-t border-[#ffffff0a] bg-[#080808] mt-24">
                    <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-7xl mx-auto">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280] mb-4 md:mb-0">© 2024 Tanmay. All rights reserved.</p>
                        <div className="flex gap-8">
                            <a className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280] hover:text-[#c0c7d6] transition-colors" href="#">Privacy</a>
                            <a className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280] hover:text-[#c0c7d6] transition-colors" href="#">Terms</a>
                            <a className="text-[10px] uppercase tracking-[0.2em] text-[#6b7280] hover:text-[#c0c7d6] transition-colors" href="#">API Status</a>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
