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
