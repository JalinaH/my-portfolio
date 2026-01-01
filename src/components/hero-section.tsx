"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Cpu, Rocket, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { typeText } from "@/lib/animations";

const heroHighlights = [
  {
    title: "Currently",
    description: "BSc (Hons) in IT @ University of Moratuwa.",
    icon: Sparkles,
  },
  {
    title: "Latest builds",
    description: "DebateX, CeylonRides, CricBOT — shipped for real users.",
    icon: Rocket,
  },
  {
    title: "Toolbox",
    description: "Next.js, React Native, Flutter, Firebase, .NET, IoT.",
    icon: Cpu,
  },
];

export default function HeroSection() {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      const phrases = [
        "digital products",
        "immersive web apps",
        "mobile-first experiences",
        "IoT-powered ideas",
      ];
      typeText(typingRef.current, phrases, 90);
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-28 pb-16"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:140px_140px] opacity-30" />
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div
          className={cn(
            "order-2 flex flex-col space-y-8 lg:order-1",
            "animate-fadeIn"
          )}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-slate-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Future-ready craft</span>
          </div>

          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-tight text-slate-100 md:text-6xl">
              Jalina Hirushan
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                Designing luminous experiences for the web, mobile, and beyond.
              </span>
            </h1>
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400">
              Building for{" "}
              <span ref={typingRef} className="text-cyan-200"></span>
            </p>
            <p className="max-w-2xl text-lg leading-relaxed text-slate-300">
              I&apos;m an enthusiastic IT undergraduate who blends product thinking
              with playful, production-ready engineering. From IoT prototypes to
              polished Next.js and React Native apps, I love shipping interfaces
              that feel alive.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="#contact"
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/40 transition-transform duration-200 hover:-translate-y-0.5"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Start a project
            </a>
            <a
              href="#projects"
              className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition-all duration-200 hover:border-cyan-300/60 hover:text-cyan-100 hover:-translate-y-0.5"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              View portfolio
            </a>
            <a
              href="/cv.pdf"
              download="Jalina_Hirushan_CV.pdf"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-cyan-300/60 hover:text-cyan-100 hover:-translate-y-0.5"
            >
              Download CV
            </a>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {heroHighlights.map(({ title, description, icon: Icon }, index) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_20px_70px_-50px_rgba(34,211,238,0.85)]"
                style={{ transitionDelay: `${index * 60}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative mb-3 flex items-center gap-2 text-sm font-semibold text-slate-100">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300 ring-1 ring-cyan-300/20">
                    <Icon size={18} />
                  </span>
                  {title}
                </div>
                <p className="relative text-sm leading-relaxed text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative order-1 animate-fadeIn lg:order-2">
          <div className="absolute -inset-10 -z-10 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-purple-500/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_30px_120px_-60px_rgba(34,211,238,0.65)] backdrop-blur-2xl">
            <div className="absolute inset-x-6 top-6 h-32 rounded-full bg-gradient-to-r from-cyan-400/15 via-blue-400/10 to-purple-500/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/70 p-3">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:90px_90px] opacity-30" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/5">
                <Image
                  src={"/image.png"}
                  alt="Jalina Hirushan"
                  className="h-full w-full object-cover"
                  width={720}
                  height={900}
                  priority
                />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    label: "Shipped",
                    value: "Group + solo products (web/mobile/IoT)",
                  },
                  {
                    label: "Stacks",
                    value: "Next.js · React Native · Flutter · Firebase",
                  },
                  {
                    label: "Mindset",
                    value: "Human-first UX, reliable systems, bold polish.",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/5 bg-white/5 p-3"
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-100">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-cyan-100">
                Crafting the v2 aesthetic
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <a
          href="#education"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#education")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cyan-200 backdrop-blur-md transition-colors hover:border-cyan-300/60"
        >
          <ArrowDown className="h-6 w-6" />
        </a>
      </div>
    </section>
  );
}
