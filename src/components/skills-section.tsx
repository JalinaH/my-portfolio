"use client";

import type React from "react";

import { useRef } from "react";
import SectionHeading from "./section-heading";
import { useInView } from "@/lib/animations";
import {
  Code2,
  FileJson,
  Braces,
  Layers,
  Database,
  Server,
  PenTool,
  Figma,
  GitBranch,
  Globe,
  Cpu,
  Coffee,
  Hash,
  Target,
  Smartphone,
} from "lucide-react";

interface Skill {
  name: string;
  icon: React.ReactNode;
  category:
    | "languages"
    | "frontend"
    | "backend"
    | "database"
    | "design"
    | "other";
}

const skillsData: Skill[] = [
  // Programming Languages
  {
    name: "JavaScript",
    icon: <FileJson className="h-10 w-10" />,
    category: "languages",
  },
  {
    name: "TypeScript",
    icon: <Braces className="h-10 w-10" />,
    category: "languages",
  },
  {
    name: "Python",
    icon: <Code2 className="h-10 w-10" />,
    category: "languages",
  },
  {
    name: "Java",
    icon: <Coffee className="h-10 w-10" />,
    category: "languages",
  },
  {
    name: "C",
    icon: <Hash className="h-10 w-10" />,
    category: "languages",
  },
  {
    name: "C#",
    icon: <Hash className="h-10 w-10" />,
    category: "languages",
  },
  {
    name: "Dart",
    icon: <Target className="h-10 w-10" />,
    category: "languages",
  },

  // Frontend
  {
    name: "HTML/CSS",
    icon: <Code2 className="h-10 w-10" />,
    category: "frontend",
  },
  {
    name: "React",
    icon: <Layers className="h-10 w-10" />,
    category: "frontend",
  },
  {
    name: "Next.js",
    icon: <Globe className="h-10 w-10" />,
    category: "frontend",
  },
  {
    name: "Flutter",
    icon: <Smartphone className="h-10 w-10" />,
    category: "frontend",
  },
  {
    name: "React Native",
    icon: <Smartphone className="h-10 w-10" />,
    category: "frontend",
  },
  {
    name: "Vue.js",
    icon: <Layers className="h-10 w-10" />,
    category: "frontend",
  },

  // Backend
  {
    name: "Node.js",
    icon: <Server className="h-10 w-10" />,
    category: "backend",
  },
  {
    name: "Express",
    icon: <Cpu className="h-10 w-10" />,
    category: "backend",
  },

  // Database
  {
    name: "MongoDB",
    icon: <Database className="h-10 w-10" />,
    category: "database",
  },
  {
    name: "SQL",
    icon: <Database className="h-10 w-10" />,
    category: "database",
  },

  // Design
  {
    name: "Figma",
    icon: <Figma className="h-10 w-10" />,
    category: "design",
  },

  // Other
  {
    name: "Git",
    icon: <GitBranch className="h-10 w-10" />,
    category: "other",
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const categories = [
    { id: "languages", name: "Programming Languages" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "database", name: "Databases" },
    { id: "design", name: "Design" },
    { id: "other", name: "Other" },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeading title="Skills" />

      <div className="grid grid-cols-1 gap-10">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`transition-all duration-700 transform ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionDelay: `${
                categories.findIndex((c) => c.id === category.id) * 200
              }ms`,
            }}
          >
            <h3 className="text-xl font-semibold mb-6 text-green-500 border-b border-green-500/30 pb-2">
              {category.name}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {skillsData
                .filter((skill) => skill.category === category.id)
                .map((skill, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 bg-gray-900/30 rounded-lg hover:bg-gray-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/10"
                  >
                    <div className="text-green-500 mb-3">{skill.icon}</div>
                    <span className="text-gray-300 text-sm font-medium text-center">
                      {skill.name}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
