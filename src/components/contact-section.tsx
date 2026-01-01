"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Mail, Send, Github, Linkedin } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";
import { sendContactEmail } from "@/app/actions";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    try {
      const result = await sendContactEmail(formState);

      if (result.success) {
        setStatus({
          type: "success",
          message: "Your message has been sent! I'll get back to you soon.",
        });

        // Reset form
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message:
            result.message || "Something went wrong. Please try again later.",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center py-24"
    >
      <SectionHeading title="Contact Me" />

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div
          className={`transition-all duration-700 transform ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/70 via-slate-900/50 to-slate-950 p-8 shadow-[0_30px_120px_-60px_rgba(34,211,238,0.7)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(34,211,238,0.08),transparent_35%),radial-gradient(circle_at_90%_10%,rgba(168,85,247,0.08),transparent_35%)]" />
            <div className="relative space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Let&apos;s collaborate</span>
              </div>
              <h3 className="text-3xl font-semibold text-slate-100">
                Let&apos;s design something daring.
              </h3>
              <p className="text-lg leading-relaxed text-slate-300">
                I&apos;m drawn to ambitious ideas—whether it&apos;s a sleek mobile app,
                a production-ready web platform, or an IoT experiment. Tell me
                what you&apos;re dreaming up and I&apos;ll help you ship it with clarity
                and polish.
              </p>

              <div className="flex flex-wrap gap-3">
                {["Web", "Mobile", "IoT prototypes", "UI polish"].map((pill) => (
                  <span
                    key={pill}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-cyan-100"
                  >
                    {pill}
                  </span>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="rounded-full bg-cyan-500/10 p-3 text-cyan-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-100">
                      Email
                    </h4>
                    <p className="text-slate-300">
                      jalinahirushan2002@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="https://github.com/JalinaH"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-100 transition-all duration-200 hover:border-cyan-300/50 hover:text-cyan-100"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/jalinahirushan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-100 transition-all duration-200 hover:border-cyan-300/50 hover:text-cyan-100"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 transform ${
            isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_30px_120px_-60px_rgba(34,211,238,0.75)] backdrop-blur-lg">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_100%_0%,rgba(168,85,247,0.08),transparent_35%)]" />
            <div className="relative space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-slate-300">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition-all focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/40"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-slate-300">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition-all focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/40"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="mb-2 block text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition-all focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/40"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full resize-none rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-slate-100 outline-none transition-all focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/40"
                ></textarea>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition-transform duration-200 hover:-translate-y-0.5"
              >
                Send Message
                <Send className="h-4 w-4" />
              </button>
              {status.type !== "idle" && (
                <p
                  className={`mt-4 text-sm ${
                    status.type === "success"
                      ? "text-emerald-400"
                      : status.type === "error"
                      ? "text-rose-400"
                      : "text-slate-400"
                  }`}
                >
                  {status.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
