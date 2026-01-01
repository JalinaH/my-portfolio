"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { useInView } from "@/lib/animations";
import SectionHeading from "./section-heading";
import MacBookFrame from "./MacBookFrame";
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
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-cyan-400"></div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div
                className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-950 p-4 shadow-[0_30px_120px_-60px_rgba(34,211,238,0.75)] transition-all duration-700 hover:-translate-y-2 hover:border-cyan-300/50 ${
                  isInView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 140}ms` }}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_100%_100%,rgba(168,85,247,0.08),transparent_35%)] opacity-70" />

                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3">
                  <MacBookFrame imageUrl={blog.imageUrl} />
                </div>

                <div className="relative p-4">
                  <h3 className="text-xl font-semibold text-slate-100 transition-colors duration-200 group-hover:text-cyan-100">
                    {blog.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-slate-300">
                    {blog.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-cyan-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-400">{blog.date}</span>
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-200 transition-colors duration-200 group-hover:text-cyan-100">
                      Read more <ExternalLink className="h-4 w-4" />
                    </span>
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
