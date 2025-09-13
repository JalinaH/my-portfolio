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
            <div className="relative overflow-hidden">
              {project.isMobile ? (
                <MobileFrame imageUrl={project.image || "/placeholder.svg"} />
              ) : (
                <MacBookFrame imageUrl={project.image || "/placeholder.svg"} />
              )}
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-green-500">
                {project.title}
              </h3>
              <div className="flex items-center mb-2 text-sm">
                <span
                  className={`${
                    project.projectType === "Group"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-purple-500/20 text-purple-400"
                  } px-2 py-0.5 rounded-full`}
                >
                  {project.projectType} Project
                </span>
                {project.projectType === "Group" && project.role && (
                  <span className="bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full ml-2">
                    {project.role}
                  </span>
                )}
                {/* Add a badge for mobile projects */}
                {project.isMobile && (
                  <span className="bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full ml-2">
                    Mobile App
                  </span>
                )}
              </div>
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
