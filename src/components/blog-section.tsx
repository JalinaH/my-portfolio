"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, ExternalLink } from "lucide-react";
import SectionHeading from "./section-heading";
import { useInView } from "@/lib/animations";
import { getMediumPosts } from "@/app/actions";

interface BlogPost {
  title: string;
  content: string;
  thumbnail?: string; // Allow thumbnail to be optional
  pubDate: string;
  link: string;
}

export default function BlogsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setIsLoading(true);
        // Replace 'yourusername' with your actual Medium username
        const posts = await getMediumPosts("jalinahirushan2002");
        setBlogPosts(posts); // Get the first 3 posts
      } catch (err) {
        console.error("Failed to fetch Medium posts:", err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Fallback content in case of error or while loading
  const fallbackPosts: BlogPost[] = [
    {
      title: "How to Build a Responsive Website with Tailwind CSS",
      content:
        "Learn how to create a fully responsive website using Tailwind CSS, a utility-first CSS framework that makes styling your projects a breeze.",
      thumbnail: "/placeholder.svg?height=300&width=500",
      pubDate: "June 15, 2023",
      link: "https://medium.com/",
    },
    {
      title: "Getting Started with React Hooks",
      content:
        "An introduction to React Hooks and how they can simplify your React components while making them more reusable and maintainable.",
      thumbnail: "/placeholder.svg?height=300&width=500",
      pubDate: "May 22, 2023",
      link: "https://medium.com/",
    },
    {
      title: "The Future of Web Development: What to Expect in 2024",
      content:
        "Explore the upcoming trends and technologies that will shape the future of web development in the coming year.",
      thumbnail: "/placeholder.svg?height=300&width=500",
      pubDate: "April 10, 2023",
      link: "https://medium.com/",
    },
  ];

  // Use fallback posts if loading or error
  const displayPosts =
    isLoading || error || blogPosts.length === 0 ? fallbackPosts : blogPosts;

  return (
    <section
      id="blogs"
      ref={sectionRef}
      className="py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeading title="Medium Blogs" />

      {error && (
        <div className="text-red-500 mb-8 p-4 bg-red-500/10 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {displayPosts.map((post, index) => (
          <a
            key={index}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-500 transform ${
              isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-20"
            } hover:-translate-y-2`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.thumbnail || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-400 mb-3">
                <Calendar className="h-4 w-4 mr-1" />
                <span>{post.pubDate}</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-500 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-300">{post.content}</p>
              <div className="mt-4 text-green-500 font-medium group-hover:underline flex items-center">
                Read More <ExternalLink className="ml-1 h-4 w-4" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
