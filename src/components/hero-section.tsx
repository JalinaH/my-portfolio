"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { typeText } from "@/lib/animations";

export default function HeroSection() {
  const typingRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typingRef.current) {
      const phrases = [
        "Web Developer",
        "Mobile App Developer",
        "Problem Solver",
        "Creative Thinker",
      ];
      typeText(typingRef.current, phrases);
    }
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center pt-16 relative"
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div
          className={cn(
            "order-2 md:order-1 animate-fadeIn",
            "flex flex-col space-y-6"
          )}
        >
          <h1 className="text-4xl md:text-6xl font-bold">
            Hi, I&apos;m <span className="text-green-500">Jalina Hirushan</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-300">
            I&apos;m a <span ref={typingRef} className="text-green-500"></span>
          </h2>
          <p className="text-gray-400 text-lg max-w-lg">
            I’m an enthusiastic and dedicated IT undergraduate passionate about
            building creative web and mobile applications. I enjoy learning new
            technologies, solving real-world problems, and working
            collaboratively to bring ideas to life.
          </p>
          <div className="flex space-x-4 pt-4">
            <a
              href="#contact"
              className="bg-green-500 hover:bg-green-600 text-black font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Contact Me
            </a>
            <a
              href="#projects"
              className="border border-green-500 text-green-500 hover:bg-green-500/10 font-medium py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#projects")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              View Work
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center animate-fadeIn">
          <div className="relative">
            {/* Animated background elements */}
            <div className="absolute -inset-4 bg-gradient-to-r from-green-500/20 to-green-300/20 rounded-lg blur-xl opacity-70 animate-pulse"></div>

            {/* Geometric shapes */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 border-2 border-green-500/30 rounded-lg transform rotate-12"></div>
            <div className="absolute -top-6 -left-6 w-20 h-20 border-2 border-green-500/30 rounded-lg transform -rotate-12"></div>

            {/* Dot pattern */}
            <div className="absolute -z-10 inset-0 transform translate-x-8 translate-y-8">
              <div className="absolute inset-0 grid grid-cols-6 gap-2">
                {Array(24)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-green-500/30"
                    ></div>
                  ))}
              </div>
            </div>

            {/* Circular image container */}
            <div className="relative w-72 h-72 md:w-96 md:h-96 overflow-hidden z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-green-700 opacity-80 rounded-full animate-slow-spin"></div>
              <div className="absolute inset-1 bg-black rounded-full z-10"></div>
              <div className="absolute inset-2 overflow-hidden rounded-full z-20">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={"/image.png"}
                    alt="Jalina Hirushan"
                    className="object-contain max-w-[100%] max-h-[100%] scale-150"
                    width={500}
                    height={500}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a
          href="#education"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#education")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <ArrowDown className="text-green-500 h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
