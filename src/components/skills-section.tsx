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
      className="py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeading title="Skills" />

      <div className="space-y-12">
        {Object.entries(skillsByCategory).map(
          ([category, skills], categoryIndex) => (
            <div
              key={category}
              className={`${
                isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-20"
              } transition-all duration-700 ease-out`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <h3 className="text-xl font-bold mb-6 text-green-500">
                {category}
              </h3>

              <div className="flex flex-wrap gap-4">
                {skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className={`transition-all duration-500`}
                    style={{
                      transitionDelay: `${
                        categoryIndex * 100 + skillIndex * 50
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
