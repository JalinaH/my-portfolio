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
const MEDIUM_USERNAME = "jalinahirushan2002";

export default function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });
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
              imageUrl: "/placeholder.svg?height=300&width=500",
              url: "https://medium.com/",
              date: "June 15, 2023",
              tags: ["Tailwind CSS", "Responsive Design", "Web Development"],
            },
            {
              title: "Getting Started with React Hooks",
              description:
                "An introduction to React Hooks and how they can simplify your React components while making them more reusable and maintainable.",
              imageUrl: "/placeholder.svg?height=300&width=500",
              url: "https://medium.com/",
              date: "May 22, 2023",
              tags: ["React", "Hooks", "JavaScript"],
            },
            {
              title: "The Future of Web Development: What to Expect in 2024",
              description:
                "Explore the upcoming trends and technologies that will shape the future of web development in the coming year.",
              imageUrl: "/placeholder.svg?height=300&width=500",
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
      id="blog"
      ref={sectionRef}
      className="py-20 min-h-screen flex flex-col justify-center"
    >
      <SectionHeading title="Blog" />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <a
              key={index}
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block group`}
            >
              <div
                className={`bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-500 transform hover:-translate-y-2 ${
                  isInView
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-20"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  {/* CSS-based MacBook Frame for blog posts */}
                  <MacBookFrame imageUrl={blog.imageUrl} />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-green-500 group-hover:text-green-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">
                    {blog.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-green-500/10 text-green-500 text-xs px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">{blog.date}</span>
                    <span className="flex items-center text-gray-300 group-hover:text-green-500 transition-colors">
                      Read More <ExternalLink className="h-4 w-4 ml-1" />
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
