import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import EducationSection from "@/components/education-section";
import SkillsSection from "@/components/skills-section";
import ProjectsSection from "@/components/projects-section";
import ContactSection from "@/components/contact-section";
import BlogsSection from "@/components/blog-section";

export default function Home() {
  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4">
        <HeroSection />
        <EducationSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogsSection />
        <ContactSection />
      </div>
    </main>
  );
}
