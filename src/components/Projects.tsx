import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

export default function Projects() {
    const projects = [
        {
            title: "Remote Support",
            description: "AR based remote support project using smart glasses.",
            tags: ["AR", "Smart Glasses", "Innovation"],
            image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Flappy Bird-AI",
            description: "AI based flappybird implemented using Python Pygames.",
            tags: ["Python", "Pygame", "AI"],
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Project Vision",
            description: "A Virtual Reality based classroom experience.",
            tags: ["VR", "Education", "Interactive"],
            image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop",
        },
    ];

    return (
        <section className="min-h-screen bg-[#080808] py-20 md:py-32 px-6 md:px-12 relative z-20">
            <div className="max-w-7xl mx-auto xl:max-w-[1400px]">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-white text-center">Selected Work</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, idx) => (
                        <div
                            key={idx}
                            className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(255,255,255,0.08)] hover:border-white/20"
                        >
                            <div className="h-64 overflow-hidden bg-black/50 relative">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                            </div>
                            <div className="p-8">
                                <h3 className="text-2xl font-semibold text-white mb-3">{project.title}</h3>
                                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="text-xs px-4 py-1.5 rounded-full bg-white/5 text-gray-300 border border-white/10">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4">
                                    <button className="flex items-center justify-center p-3 rounded-full bg-white text-black transition-transform duration-300 hover:scale-105 active:scale-95">
                                        <ExternalLink size={18} />
                                    </button>
                                    <button className="flex items-center justify-center p-3 rounded-full bg-white/10 text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 active:scale-95">
                                        <Github size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
