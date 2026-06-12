"use client";

import { useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";
import testimonials from "@/../data/testimonials.json";

interface Testimonial {
  image: string;
  platform?: string;
  projectType?: string;
}

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    threshold: 0.1,
  });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="flex min-h-[50vh] flex-col justify-center py-24"
    >
      <SectionHeading title="Testimonials" />

      <div className="grid gap-6 md:grid-cols-2">
        {(testimonials as Testimonial[]).map((testimonial, index) => (
          <div
            key={index}
            className={`group relative overflow-hidden rounded-3xl border border-emerald-400/15 bg-black/70 shadow-[0_30px_120px_-70px_rgba(16,185,129,0.5)] transition-all duration-700 hover:border-emerald-300/40 hover:shadow-[0_40px_140px_-80px_rgba(16,185,129,0.7)] ${
              isInView
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: `${index * 140}ms` }}
          >
            {/* Background gradients */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_15%,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_90%_80%,rgba(34,211,238,0.08),transparent_40%)] opacity-70" />
            <div className="pointer-events-none absolute inset-0 space-scanlines opacity-0 transition-opacity duration-700 group-hover:opacity-30" />

            {/* Header badges */}
            <div className="relative flex items-center justify-between p-5 pb-0">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-emerald-200/80">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                <span>Mission Log — Transmission</span>
              </div>
              <div className="flex items-center gap-2">
                {testimonial.platform && (
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-[10px] uppercase tracking-wider text-emerald-100">
                    {testimonial.platform}
                  </span>
                )}
                {testimonial.projectType && (
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-slate-300">
                    {testimonial.projectType}
                  </span>
                )}
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-200 ring-1 ring-emerald-300/30">
                  <Quote size={16} />
                </div>
              </div>
            </div>

            {/* Screenshot */}
            <div className="relative p-5">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
                <Image
                  src={testimonial.image}
                  alt={`Client review${testimonial.platform ? ` from ${testimonial.platform}` : ""}`}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
