"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";
import Image from "next/image";
import { fetchMediumPosts } from "@/lib/utils";

// Define the Blog interface
interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  date: string;
  tags: string[];
}

// Replace with your Medium username
const MEDIUM_USERNAME = "jalinah";

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef as React.RefObject<Element>, {
    once: true,
    threshold: 0.1,
  });
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMediumPosts() {
      try {
        setIsLoading(true);
        const posts = await fetchMediumPosts(MEDIUM_USERNAME);

        if (posts.length > 0) {
          setBlogs(posts);
        } else {
          // Fallback to example blog posts if no Medium posts found
          setBlogs([
            {
              title: "How to Build a Responsive Website with Tailwind CSS",
              description:
                "Learn how to create a fully responsive website using Tailwind CSS, a utility-first CSS framework that makes styling your projects a breeze.",
              imageUrl: "/placeholder.svg",
              url: "https://medium.com/",
              date: "June 15, 2023",
              tags: ["Tailwind CSS", "Responsive Design", "Web Development"],
            },
            {
              title: "Getting Started with React Hooks",
              description:
                "An introduction to React Hooks and how they can simplify your React components while making them more reusable and maintainable.",
              imageUrl: "/placeholder.svg",
              url: "https://medium.com/",
              date: "May 22, 2023",
              tags: ["React", "Hooks", "JavaScript"],
            },
            {
              title: "The Future of Web Development: What to Expect in 2024",
              description:
                "Explore the upcoming trends and technologies that will shape the future of web development in the coming year.",
              imageUrl: "/placeholder.svg",
              url: "https://medium.com/",
              date: "April 10, 2023",
              tags: ["Web Development", "Future Trends", "Technology"],
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to load Medium posts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMediumPosts();
  }, []);

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="flex min-h-screen flex-col justify-center py-24"
    >
      <SectionHeading title="Blog" />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-emerald-400"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className={`group relative overflow-hidden rounded-3xl border border-emerald-400/20 bg-black/70 shadow-[0_30px_120px_-80px_rgba(16,185,129,0.5)] transition-all duration-700 hover:border-emerald-300/60 hover:shadow-[0_40px_140px_-80px_rgba(16,185,129,0.7)] ${
                  isInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(16,185,129,0.16),transparent_45%),radial-gradient(circle_at_85%_85%,rgba(34,211,238,0.12),transparent_40%)] opacity-70" />
                <div className="pointer-events-none absolute inset-0 space-scanlines opacity-0 transition-opacity duration-700 group-hover:opacity-30" />

                <div className="relative flex flex-col gap-6 p-6 md:flex-row md:items-center">
                  <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60 aspect-[16/9] md:w-[40%]">
                    <Image
                      src={blog.imageUrl}
                      alt={blog.title}
                      fill
                      className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={index < 2}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                    <div className="pointer-events-none absolute inset-0 space-twinkle opacity-40" />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.35em] text-emerald-200/80">
                      <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.7)]" />
                      <span>Transmission</span>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-100 transition-colors duration-200 group-hover:text-emerald-100">
                      {blog.title}
                    </h3>
                    <p className="line-clamp-3 text-slate-300">
                      {blog.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="rounded-full space-chip px-3 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{blog.date}</span>
                      <span className="flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-emerald-100">
                        Read more <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
