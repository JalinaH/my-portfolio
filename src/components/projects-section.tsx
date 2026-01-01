"use client";

import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";
import MacBookFrame from "./MacBookFrame";
import MobileFrame from "./MobileFrame";

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  projectType: "Group" | "Individual";
  role?: string; // Only required for group projects
  isMobile?: boolean; // New property to indicate if project is mobile
  isTablet?: boolean; // New property to indicate if project is tablet
}

const projectsData: Project[] = [
  {
    title: "CookPal",
    description:
      "Cookpal is a web application developed as part of our first-year web assignment, aimed at recipe exploration and management. Built with React (Vite) and Firebase, it features secure user authentication, personalized profiles, intuitive recipe creation, detailed recipe views, and tag-based filtering. Deployed on Firebase for easy access.",
    image: "/cookpal.jpeg",
    tags: ["React.js", "Bootstrap", "CSS", "Firebase"],
    liveUrl: "https://cookpal-7029c.web.app/",
    githubUrl: "https://github.com/rithakith/RecipeApp",
    projectType: "Group",
    role: "Frontend Developer",
    isMobile: false,
  },
  {
    title: "Smart Cricket Trainee - CricBOT Mobile App",
    description:
      "As part of our first-year IoT hardware project, I developed a mobile app for CricBOT—an automated cricket practice machine. Built with React Native (Expo) and styled using NativeWind, the app features Firebase authentication and Firestore integration. It communicates with the CricBOT machine via WiFi using API endpoints hosted on an ESP8266 (NodeMCU). Users can customize practice sessions, track player stats through charts, and manage profiles, offering a smooth and interactive IoT experience.",
    image: "/cricbotmobile.jpeg",
    tags: ["React Native", "Tailwind CSS", "Firebase", "IoT"],
    githubUrl: "https://github.com/JalinaH/CricBOT",
    projectType: "Individual",
    isMobile: true, // This is a mobile project
  },
  {
    title: "Smart Cricket Trainee - CricBOT",
    description:
      "As part of our first-year IoT-based hardware project, we developed CricBOT—an automated cricket practice machine aimed at enhancing training with customizable sessions. The system is powered by an Arduino Mega and ESP8266 (NodeMCU) for connectivity. Users can select ball type, count, and delay via a keypad interface or through a companion mobile app built with React Native. Motor speeds and angles adjust dynamically for various ball types (e.g., fast, bouncer, swing). Integrated components like proximity sensors, LCDs, and load cells enable real-time feedback and error detection.",
    image: "/cricbot.jpeg",
    tags: ["Arduino", "NodeMCU", "IoT"],
    githubUrl:
      "https://github.com/JalinaH/CricBOT---Automated-Cricket-Practice-Machine",
    projectType: "Group",
    isMobile: false,
  },
  {
    title: "DebateX - Revolutionizing debate platform",
    description:
      "DebateX is a modern web platform designed to host structured debates efficiently, offering a seamless experience for debaters, judges, and organizers. Built with Next.js, Tailwind CSS, Firebase, and Framer Motion, it features automated time management, role-based interfaces, real-time chat, session recording, and personal note-taking tools. With support for fair coin tosses and clean UI components via Radix UI, DebateX ensures organized and engaging debate sessions. The project was recognized as a semi-finalist at Idealize 2024 for its innovative approach to enhancing online discourse.",
    image: "/debatex.jpeg",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "@stream-io/video-react-sdk",
      "Clerk",
      "Firebase",
      "Radix UI",
    ],
    liveUrl: "https://debate-x-nrd5.vercel.app",
    githubUrl: "https://github.com/VinukaVilhan/DebateXt",
    projectType: "Group",
    role: "Backend Developer",
    isMobile: false,
  },
  {
    title: "CeylonRides - Vehicle Rental Platform",
    description:
      "CeylonRides is a full-stack vehicle rental web application built independently using the MERN stack, designed to serve multiple user roles—Tourists, Drivers, and Administrators. It enables tourists to browse and book vehicles with or without drivers, while providing admins with full control over bookings, drivers, and vehicles through a robust admin panel. Drivers can view their assigned trips and manage their profiles via a dedicated dashboard. Key features include JWT-based authentication, role-based access, dynamic booking management, and calendar-based availability tracking. Deployed using Netlify and Render, CeylonRides reflects my ability to architect and deliver scalable, production-ready applications from the ground up.",
    image: "/ceylonrides.jpeg",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    liveUrl: "https://ceylonrides.netlify.app",
    githubUrl: "https://github.com/JalinaH/CeylonRides",
    projectType: "Individual",
    isMobile: false,
  },
  {
    title: "Pay Sheet Emailer",
    description:
      "A desktop application developed for the Finance Division of the University of Moratuwa to streamline monthly paysheet distribution. Built with Python and CustomTkinter, it features a modern multi-page UI with secure user authentication and role-based access control. The system automates email distribution of paysheets to all university employees with real-time status updates, delivery verification, and centralized settings management. This project demonstrates a real-world solution tailored to administrative workflows.",
    image: "/1753926863994.jpeg", // You can add a specific image for this project later
    tags: ["Python", "CustomTkinter", "SQLite", "Email Automation"],
    projectType: "Group",
    role: "Full Stack Developer",
    isMobile: false,
  },
  {
    title: "Land and Asset Valuation System",
    description:
      "A comprehensive full-stack application designed for land and asset valuation with advanced GIS capabilities. Led the complete development lifecycle from requirement gathering and planning to UI/UX design, development, and testing. The system features a mobile frontend built with Flutter for field data collection, a robust .NET backend for business logic, and integrated PostgreSQL/SQLite databases for data management. Includes GIS-based visualization powered by Mapbox for precise location mapping and asset visualization.",
    image: "/2nd_yr.png", // You can add a specific image for this project later
    tags: ["Flutter", ".NET", "PostgreSQL", "SQLite", "Mapbox", "GIS"],
    projectType: "Group",
    role: "Full Stack Developer",
    isMobile: false,
  },
  {
    title: "Personal Portfolio",
    description:
      "A modern, responsive portfolio website built with Next.js and TailwindCSS. Features include smooth scrolling, animated sections, interactive 3D models, skill categorization, and mobile-responsive design. The portfolio showcases my projects, skills, and education in an engaging user interface with a clean, professional aesthetic.",
    image: "/portfolio.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "3D Models",
    ],
    liveUrl: "https://jalinahirushan.vercel.app/",
    projectType: "Individual",
    isMobile: false,
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    threshold: 0.1,
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center py-24"
    >
      <SectionHeading title="Projects" />

      <div className="grid gap-8 md:grid-cols-2">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-950 p-5 shadow-[0_30px_120px_-60px_rgba(34,211,238,0.75)] transition-all duration-700 hover:-translate-y-2 hover:border-cyan-300/50 ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 140}ms` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08),transparent_35%)] opacity-70" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
              {project.isMobile ? (
                <MobileFrame imageUrl={project.image || "/placeholder.svg"} />
              ) : (
                <MacBookFrame imageUrl={project.image || "/placeholder.svg"} />
              )}
            </div>

            <div className="relative mt-4 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                    project.projectType === "Group"
                      ? "border-blue-300/40 bg-blue-500/10 text-blue-100"
                      : "border-purple-300/40 bg-purple-500/10 text-purple-100"
                  }`}
                >
                  {project.projectType} project
                </span>
                {project.projectType === "Group" && project.role && (
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {project.role}
                  </span>
                )}
                {project.isMobile && (
                  <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    Mobile app
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-semibold text-slate-100">
                {project.title}
              </h3>
              <p className="text-slate-300">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition-colors duration-200 hover:border-cyan-200 hover:text-cyan-50"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:border-purple-200/70 hover:text-purple-100"
                  >
                    <Github className="h-4 w-4" />
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
