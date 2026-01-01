import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import EducationSection from "@/components/education-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import BlogsSection from "@/components/blog-section";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.12),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(168,85,247,0.12),transparent_25%),radial-gradient(circle_at_50%_85%,rgba(14,165,233,0.12),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:140px_140px] opacity-40" />

      <Navbar />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <HeroSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogsSection />
        <ContactSection />
      </div>
      <Chatbot />
    </main>
  );
}
