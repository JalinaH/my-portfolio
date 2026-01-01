"use client";

import { useRef } from "react";
import { GraduationCap, Calendar } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";

interface Education {
  degree: string;
  institution: string;
  duration: string;
  description: string;
}

const educationData: Education[] = [
  {
    degree: "GCE O/L",
    institution: "Malambe Boys' Model School",
    duration: "2017",
    description: "9As",
  },
  {
    degree: "GCE A/L",
    institution: "Nalanda College, Colombo 10",
    duration: "2021",
    description:
      "Combined Maths - A, Chemistry - A, Physics - B, Z-score - 1.758",
  },
  {
    degree: "Bsc. (Hons) in Information Technology",
    institution: "University of Moratuwa",
    duration: "2023 - Present",
    description:
      "Currently pursuing a degree in Information Technology at the University of Moratuwa, passionate about web and mobile app development.",
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    threshold: 0.2,
  });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center py-24"
    >
      <SectionHeading title="Education" />
      <div className="relative">
        <div className="absolute left-3 top-0 h-full w-px bg-gradient-to-b from-cyan-400/60 via-blue-400/30 to-purple-500/40" />
        <div className="space-y-6">
          {educationData.map((item, index) => (
            <div
              key={item.degree}
              className={`relative pl-10 transition-all duration-700 ${
                isInView
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 140}ms` }}
            >
              <div className="absolute left-0 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-cyan-200 shadow-[0_10px_50px_-30px_rgba(34,211,238,0.8)]">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_60px_-40px_rgba(34,211,238,0.75)] backdrop-blur-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-100">
                      {item.degree}
                    </h3>
                    <p className="text-sm text-cyan-200">{item.institution}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                    <Calendar className="h-4 w-4 text-cyan-300" />
                    {item.duration}
                  </span>
                </div>
                <p className="mt-3 text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
