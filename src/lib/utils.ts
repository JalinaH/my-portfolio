import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Fetches blog posts from a Medium RSS feed
 * @param username The Medium username to fetch posts from
 * @returns Array of formatted blog posts
 */
export async function fetchMediumPosts(username: string) {
  try {
    // Fetching from Medium RSS feed with CORS proxy
    const response = await fetch(
      `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch Medium posts");
    }

    const data = await response.json();

    if (data.status !== "ok") {
      throw new Error("Invalid response from RSS feed");
    }

    return data.items.map((item: any) => {
      // Extract first image from content or use placeholder
      const imgRegex = /<img[^>]+src="([^">]+)"/;
      const imgMatch = item.content.match(imgRegex);
      const imageUrl = imgMatch
        ? imgMatch[1]
        : "/placeholder.svg?height=300&width=500";

      // Strip HTML from description and truncate
      const description =
        item.description
          .replace(/<\/?[^>]+(>|$)/g, "") // Remove HTML tags
          .slice(0, 200) + "...";

      // Extract tags from categories
      const tags = item.categories.slice(0, 3);

      // Format the date
      const date = new Date(item.pubDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return {
        title: item.title,
        description,
        imageUrl,
        url: item.link,
        date,
        tags,
      };
    });
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}
