"use client";

import { useRef } from "react";
import SectionHeading from "./section-heading";
import { useInView } from "@/lib/animations";

const workItems = [
  {
    role: "Intern Software Engineer",
    company: "Infinity Innovators (Pvt) Ltd",
    period: "Jan 2026 - Present",
    summary:
      "Contributing to the development of a production-ready mobile application using React Native",
    highlights: [
      "Participating in code reviews and ensuring adherence to best practices.",
      "Working in an Agile environment to deliver high-quality software.",
      "Developing a cross-platform mobile application using React Native.",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Upwork",
    period: "June 2025 - Present",
    summary:
      "Creating web and mobile applications for clients using modern frameworks and best practices.",
    highlights: [
      "Delivered multiple projects using React, Next.js, and Flutter.",
      "Collaborated with clients to refine requirements and ensure satisfaction.",
    ],
  },
  {
    role: "Freelance Developer",
    company: "Lushware Organization",
    period: "Apr 2025 - Oct 2025",
    summary:
      "Delivering web and mobile experiences for clients across multiple stacks.",
    highlights: ["Building web apps with MERN stack for real-world use cases."],
  },
];

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    threshold: 0.2,
  });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center py-24"
    >
      <SectionHeading title="Work" />

      <div className="space-y-6">
        {workItems.map((item, index) => (
          <div
            key={`${item.company}-${item.role}`}
            className={`group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-black/70 p-6 shadow-[0_30px_120px_-80px_rgba(16,185,129,0.5)] transition-all duration-700 hover:border-emerald-300/60 hover:shadow-[0_40px_140px_-80px_rgba(16,185,129,0.7)] ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 140}ms` }}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.16),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.12),transparent_40%)] opacity-70" />
            <div className="pointer-events-none absolute inset-0 space-scanlines opacity-0 transition-opacity duration-700 group-hover:opacity-30" />

            <div className="relative space-y-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">
                    {item.company}
                  </p>
                  <h3 className="text-2xl font-semibold text-slate-100">
                    {item.role}
                  </h3>
                </div>
                <span className="inline-flex items-center rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-100">
                  {item.period}
                </span>
              </div>

              <p className="text-slate-300">{item.summary}</p>

              <ul className="space-y-2 text-sm text-slate-300">
                {item.highlights.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
