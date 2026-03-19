import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import PatentsResearch from "@/components/PatentsResearch";
import HonorsAwards from "@/components/HonorsAwards";
import Projects from "@/components/Projects";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <main className="bg-transparent text-white min-h-screen selection:bg-white/30 font-sans">
      <Navigation />
      
      <div id="hero" className="relative">
        <ScrollyCanvas />
        <Overlay />
      </div>

      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="research">
        <PatentsResearch />
      </div>
      <div id="awards">
        <HonorsAwards />
      </div>
      <div id="projects">
        <Projects />
      </div>

      <footer className="py-12 border-t border-white/5 text-center text-white/30 bg-[#060606] text-sm">
        <p className="hover:text-white/60 transition-colors cursor-pointer tracking-wider">
          © {new Date().getFullYear()} Tanmay Moharana. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
