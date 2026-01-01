"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Blogs", href: "#blogs" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-4 w-full z-50 transition-all duration-500",
        scrolled ? "scale-[0.99]" : "scale-100"
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <div
          className={cn(
            "flex items-center justify-between rounded-2xl border px-4 py-3 backdrop-blur-2xl transition-all duration-500 shadow-[0_20px_120px_-50px_rgba(34,211,238,0.65)]",
            scrolled
              ? "bg-slate-900/80 border-white/15"
              : "bg-slate-900/60 border-white/10"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-400 to-purple-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/30">
              JH
            </div>
            <div className="leading-tight">
              <a
                href="#home"
                className="text-base font-semibold text-slate-100 hover:text-cyan-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#home")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                Jalina Hirushan
              </a>
              <p className="text-xs text-slate-400">
                Full-stack & mobile engineer
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 rounded-full bg-white/5 px-2 py-1 border border-white/10">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative overflow-hidden rounded-full px-3 py-2 text-sm text-slate-200 transition-colors duration-200 hover:text-cyan-100"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                <span className="relative">{item.name}</span>
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to collabs</span>
            </div>
            <a
              href="#contact"
              className="relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition-transform duration-200 hover:-translate-y-0.5"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Let&apos;s talk
            </a>
          </div>

          {/* Mobile Navigation Toggle */}
          <button
            className="md:hidden text-slate-200 hover:text-cyan-100"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-3 rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-4 backdrop-blur-xl animate-fadeIn shadow-[0_20px_80px_-40px_rgba(34,211,238,0.45)]">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-slate-100 transition-colors duration-200 hover:bg-white/5 hover:text-cyan-100"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(item.href)?.scrollIntoView({
                      behavior: "smooth",
                    });
                    setIsOpen(false);
                  }}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="rounded-lg bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 px-3 py-3 text-center text-slate-950 font-semibold shadow-md"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setIsOpen(false);
                }}
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
