import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Experience from "@/components/Experience";
import PatentsResearch from "@/components/PatentsResearch";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#121212] text-white min-h-screen selection:bg-white/30">
      <div className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>

      <About />
      <Experience />
      <PatentsResearch />
      <Projects />

      <footer className="py-12 border-t border-white/10 text-center text-gray-500 bg-[#080808]">
        <p className="hover:text-white transition-colors cursor-pointer">© {new Date().getFullYear()} Tanmay Moharana. All rights reserved.</p>
      </footer>
    </main>
  );
}
