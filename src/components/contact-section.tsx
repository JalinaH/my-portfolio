"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    // Show success message
    alert("Message sent successfully!");
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeading title="Contact Me" />

      <div className="grid md:grid-cols-2 gap-10">
        <div
          className={`transition-all duration-700 transform ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <h3 className="text-2xl font-bold mb-6 text-white">
            Let&apos;s Talk About Your Project
          </h3>
          <p className="text-gray-300 mb-8">
            I&apos;m interested in freelance opportunities – especially
            ambitious or large projects. However, if you have other requests or
            questions, don&apos;t hesitate to contact me using the form.
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="bg-green-500/10 p-3 rounded-full mr-4">
                <Mail className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">Email</h4>
                <p className="text-gray-400">your.email@example.com</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-500/10 p-3 rounded-full mr-4">
                <Phone className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">Phone</h4>
                <p className="text-gray-400">+1 (123) 456-7890</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-500/10 p-3 rounded-full mr-4">
                <MapPin className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">Location</h4>
                <p className="text-gray-400">City, Country</p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`space-y-6 transition-all duration-700 transform ${
            isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formState.name}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formState.email}
                onChange={handleChange}
                required
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-gray-300 mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              required
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-black font-medium py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center"
          >
            Send Message
            <Send className="ml-2 h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
