"use client";

import { useRef } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectsData: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, cart functionality, user authentication, and payment processing.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
  },
  {
    title: "Task Management App",
    description:
      "A productivity app that helps users organize tasks, set deadlines, and track progress with intuitive UI and real-time updates.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
  },
  {
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects, skills, and professional experience with dark mode and animations.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["HTML/CSS", "JavaScript", "GSAP", "Responsive Design"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
  },
  {
    title: "Weather Dashboard",
    description:
      "A weather application that provides current conditions and forecasts for any location with interactive maps and charts.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["React", "OpenWeather API", "Chart.js", "Geolocation"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/yourusername/project",
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeading title="Projects" />

      <div className="grid md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className={`bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-500 transform hover:-translate-y-2 ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-500">
                {project.title}
              </h3>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="bg-green-500/10 text-green-500 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex space-x-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-green-500 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-green-500 transition-colors"
                  >
                    <Github className="h-4 w-4 mr-1" />
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
