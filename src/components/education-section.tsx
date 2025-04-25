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
    degree: "Master of Computer Science",
    institution: "University Name",
    duration: "2020 - 2022",
    description:
      "Specialized in Artificial Intelligence and Machine Learning. Completed thesis on Neural Networks for Natural Language Processing.",
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "University Name",
    duration: "2016 - 2020",
    description:
      "Focused on Software Engineering and Web Development. Graduated with honors and completed multiple internships.",
  },
  {
    degree: "High School Diploma",
    institution: "School Name",
    duration: "2012 - 2016",
    description:
      "Science and Mathematics track. Participated in various programming competitions and hackathons.",
  },
];

export default function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeading title="Education" />
      <div className="space-y-12">
        {educationData.map((item, index) => (
          <div
            key={index}
            className={`relative pl-8 border-l-2 border-green-500/50 transition-all duration-700 transform ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="absolute -left-3 top-0 w-6 h-6 bg-black border-2 border-green-500 rounded-full flex items-center justify-center">
              <GraduationCap className="h-3 w-3 text-green-500" />
            </div>
            <div className="mb-1 flex items-center">
              <h3 className="text-xl font-bold text-white">{item.degree}</h3>
            </div>
            <div className="mb-2 text-green-500">{item.institution}</div>
            <div className="mb-4 flex items-center text-gray-400">
              <Calendar className="h-4 w-4 mr-2" />
              {item.duration}
            </div>
            <p className="text-gray-300">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
