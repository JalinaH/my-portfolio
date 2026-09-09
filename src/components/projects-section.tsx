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
  repositories?: { label: string; url: string }[];
  projectType: "Group" | "Individual";
  role?: string; // Only required for group projects
  isMobile?: boolean; // New property to indicate if project is mobile
  isTablet?: boolean; // New property to indicate if project is tablet
}

const projectsData: Project[] = [
  {
    title: "TerraFix",
    description:
      "Built an AI-powered DevOps platform as part of the Ascentic AI Launch Pad to diagnose failed Terraform CI pipelines and generate human-reviewable repairs. Analyzes bounded evidence from the exact failing revision in at most two semantic stages, then converts proposed edits into deterministic Git patches with strict scope restrictions. Verifies repairs with Terraform tooling and requires human approval before repository modification, followed by fresh verification before committing to the PR. Uses a Next.js control plane, PostgreSQL job coordination, and a separate worker with disposable workspaces. Never executes terraform apply, auto-merges PRs, or force-pushes changes.",
    image: "/terrafix.png",
    liveUrl: "https://terrafix-dashboard.vercel.app/",
    repositories: [
      { label: "Agent Code", url: "https://github.com/JalinaH/semantic-terraform-agent" },
      { label: "Dashboard Code", url: "https://github.com/JalinaH/semantic-terraform-dashboard" },
    ],
    tags: [
      "Python",
      "Terraform",
      "DevOps",
      "AI / LLMs",
      "IaC",
      "CI/CD",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "GitHub Apps",
      "GitHub Actions",
      "OpenRouter",
      "Gemini",
      "AWS",
    ],
    projectType: "Individual",
    isMobile: false,
  },
  {
    title: "AutoNova",
    description:
      "Contributed as a full stack developer to a cloud-native automobile service management platform for enterprise service centers. Combines Java Spring Boot and C# ASP.NET Core microservices with PostgreSQL and Docker to manage employee work hours, task lifecycles, customer appointments, and vehicle service history. Features validation and approval workflows, JWT and OAuth2 role-based access, real-time notifications, and service progress monitoring. Uses Netflix Eureka for service discovery, Spring Cloud Gateway for API routing, and REST APIs for inter-service communication.",
    image: "/autonova.png",
    repositories: [
      { label: "Frontend Code", url: "https://github.com/void-squad/autonova-frontend-v1" },
      { label: "Backend Code", url: "https://github.com/void-squad/autonova-backend" },
    ],
    tags: [
      "React.js",
      "Spring Boot",
      "Java",
      "C#",
      "ASP.NET Core",
      "Docker",
      "Docker Hub",
      "REST APIs",
      "Microservices",
      "PostgreSQL",
    ],
    projectType: "Group",
    role: "Full Stack Developer",
    isMobile: false,
  },
  {
    title: "The Fuzzball Theorem - Exoplanet AI",
    description:
      "An AI-powered web application developed for NASA Space Apps Challenge 2025 that detects exoplanets from TESS (Transiting Exoplanet Survey Satellite) light curve data using machine learning and signal processing techniques. The system integrates the Box Least Squares (BLS) algorithm for feature extraction and XGBoost for classification to identify potential exoplanet transit signals. Features TIC ID-based and CSV light curve analysis, real-time transit detection with confidence metrics, interactive 3D planet visualization, and CI/CD pipelines via GitHub Actions. Deployed on Vercel (frontend) and HuggingFace Spaces (backend).",
    image: "/exoplanet.png", // You can add the actual image later
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "Python", "XGBoost", "HuggingFace"],
    liveUrl: "https://the-fuzzball-theorem-exoplanet-ai-f.vercel.app/", // Add live URL if available
    githubUrl: "https://github.com/VishwaJaya01/the-fuzzball-theorem-exoplanet-ai", // Add GitHub URL if available
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
    liveUrl: "https://itsjalina.me/",
    projectType: "Individual",
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
    title: "CeylonRides - Vehicle Rental Platform",
    description:
      "Independently architected and shipped a full MERN-stack vehicle rental platform supporting three distinct user roles with dedicated dashboards. Built JWT auth, calendar-based availability, booking approval workflows, and driver assignment from scratch. Deployed frontend on Netlify and backend on Render—live and handling real user flows end-to-end.",
    image: "/ceylonrides.jpeg",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js", "Tailwind CSS"],
    liveUrl: "https://ceylonrides.netlify.app",
    githubUrl: "https://github.com/JalinaH/CeylonRides",
    projectType: "Individual",
    isMobile: false,
  },
  {
    title: "DebateX - Revolutionizing debate platform",
    description:
      "Shipped a real-time debate platform with role-based views for judges, debaters, and organizers—featuring live video via Stream.io, automated timers, session recording, and integrated note-taking. Built with Next.js, Firebase, and Framer Motion. Reached the semi-finals at Idealize 2024, validating the platform's approach to structured online discourse.",
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
    title: "Smart Cricket Trainee - CricBOT",
    description:
      "Co-designed and built an automated cricket practice machine from the ground up—Arduino Mega + ESP8266 controlling DC motors, servos, and sensors for five distinct ball types. Integrated proximity detection, load-cell calibration, and real-time LCD feedback. Paired with a custom React Native app for wireless control, delivering a complete hardware-to-mobile IoT training system.",
    image: "/cricbot.jpeg",
    tags: ["Arduino", "NodeMCU", "IoT"],
    githubUrl:
      "https://github.com/JalinaH/CricBOT---Automated-Cricket-Practice-Machine",
    projectType: "Group",
    isMobile: false,
  },
  {
    title: "Smart Cricket Trainee - CricBOT Mobile App",
    description:
      "Solo-built the companion mobile app for an IoT-powered cricket training machine. Engineered real-time WiFi communication with ESP8266 hardware, Firebase auth, session customization, and player stat tracking with interactive charts. Delivered a polished React Native experience that bridges physical hardware with a seamless digital interface.",
    image: "/cricbotmobile.jpeg",
    tags: ["React Native", "Tailwind CSS", "Firebase", "IoT"],
    githubUrl: "https://github.com/JalinaH/CricBOT",
    projectType: "Individual",
    isMobile: true, // This is a mobile project
  },
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

      <div className="space-y-6">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-black/70 shadow-[0_30px_120px_-80px_rgba(16,185,129,0.5)] transition-all duration-700 hover:border-emerald-300/60 hover:shadow-[0_40px_140px_-80px_rgba(16,185,129,0.7)] ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 140}ms` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.16),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.12),transparent_40%)] opacity-70" />
            <div className="pointer-events-none absolute inset-0 space-scanlines opacity-0 transition-opacity duration-700 group-hover:opacity-30" />

            <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center">
              <div
                className={`relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 ${
                  project.isMobile ? "aspect-[3/5]" : "aspect-[4/3]"
                } md:w-[42%]`}
              >
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                <div className="pointer-events-none absolute inset-0 space-twinkle opacity-35" />
              </div>

              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-emerald-200/80">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                  <span>Mission File</span>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-slate-100">
                    {project.title}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[10px] text-emerald-100">
                      {project.projectType}
                    </span>
                    {project.projectType === "Group" && project.role && (
                      <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-100">
                        {project.role}
                      </span>
                    )}
                    {project.isMobile && (
                      <span className="rounded-full border border-emerald-300/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-100">
                        Mobile app
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-slate-300">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full space-chip px-3 py-1 text-xs"
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
                      className="inline-flex items-center gap-2 rounded-full border border-emerald-300/50 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-100 transition-colors duration-200 hover:border-emerald-200 hover:text-emerald-50"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  {(project.repositories ?? (project.githubUrl
                    ? [{ label: "Code", url: project.githubUrl }]
                    : [])).map((repository) => (
                    <a
                      key={repository.url}
                      href={repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:border-emerald-200/70 hover:text-emerald-100"
                    >
                      <Github className="h-4 w-4" />
                      {repository.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
