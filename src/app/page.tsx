import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import EducationSection from "@/components/education-section";
import SkillsSection from "@/components/skills-section";
import WorkSection from "@/components/work-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import BlogsSection from "@/components/blog-section";
import Chatbot from "@/components/chatbot";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-slate-100">
      <div className="pointer-events-none absolute inset-0 space-bg" />
      <div className="pointer-events-none absolute inset-0 space-aurora" />
      <div className="pointer-events-none absolute inset-0 astronaut-overlay" />
      <div className="pointer-events-none absolute inset-0 space-twinkle" />
      <div className="pointer-events-none absolute inset-0 space-scanlines" />
      <div className="pointer-events-none absolute inset-0 space-noise" />

      <Navbar />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24">
        <HeroSection />
        <EducationSection />
        <SkillsSection />
        <WorkSection />
        <ProjectsSection />
        <BlogsSection />
        <ContactSection />
      </div>
      <Chatbot />
    </main>
  );
}
