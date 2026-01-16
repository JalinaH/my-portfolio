"use client";

import { useRef } from "react";
import SectionHeading from "./section-heading";
import { useInView } from "@/lib/animations";
import SkillIcon from "./SkillIcon";

// Define skills by category
const skillsByCategory = {
  "Programming Languages": [
    { name: "C", icon: "/skills/c.svg" },
    { name: "C#", icon: "/skills/csharp.svg" },
    { name: "Python", icon: "/skills/python.svg" },
    { name: "JavaScript", icon: "/skills/javascript.svg" },
    { name: "TypeScript", icon: "/skills/typescript.svg" },
    { name: "Java", icon: "/skills/java.svg" },
    { name: "Dart", icon: "/skills/dart.svg" },
  ],
  Frontend: [
    { name: "HTML", icon: "/skills/html.svg" },
    { name: "CSS", icon: "/skills/css.svg" },
    { name: "Tailwind CSS", icon: "/skills/tailwindcss.svg" },
    { name: "React", icon: "/skills/react.svg" },
    { name: "Next.js", icon: "/skills/nextjs.svg" },
    { name: "React Native (Mobile)", icon: "/skills/react.svg" },
    { name: "Flutter", icon: "/skills/flutter.svg" },
    { name: "Vue.js", icon: "/skills/vuejs.svg" },
  ],
  Backend: [
    { name: "Node.js", icon: "/skills/nodejs.svg" },
    { name: "Express.js", icon: "/skills/express.svg" },
    { name: "Firebase", icon: "/skills/firebase.svg" },
  ],
  Databases: [
    { name: "MongoDB", icon: "/skills/mongodb.svg" },
    { name: "MySQL", icon: "/skills/mysql.svg" },
  ],
  Other: [
    { name: "Figma", icon: "/skills/figma.svg" },
    { name: "Git", icon: "/skills/git.svg" },
    { name: "GitHub", icon: "/skills/github.svg" },
    { name: "VS Code", icon: "/skills/vscode.svg" },
  ],
};

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    threshold: 0.1,
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center py-24"
    >
      <SectionHeading title="Skills" />

      <div className="grid gap-5 md:grid-cols-2">
        {Object.entries(skillsByCategory).map(
          ([category, skills], categoryIndex) => (
            <div
              key={category}
              className={`rounded-2xl border border-emerald-400/15 bg-black/60 p-6 shadow-[0_20px_70px_-50px_rgba(16,185,129,0.55)] transition-all duration-700 ${
                isInView
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${categoryIndex * 120}ms` }}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_0_6px_rgba(16,185,129,0.2)]" />
                  <h3 className="text-lg font-semibold text-slate-100">
                    {category}
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">
                  {skills.length} tools
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-6">
                {skills.map((skill, skillIndex) => (
                  <div
                    key={skill.name}
                    className="transition-transform duration-500 hover:-translate-y-1"
                    style={{
                      transitionDelay: `${
                        categoryIndex * 80 + skillIndex * 35
                      }ms`,
                    }}
                  >
                    <SkillIcon name={skill.name} icon={skill.icon} />
                  </div>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
