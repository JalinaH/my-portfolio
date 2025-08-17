import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names with Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Interface for Medium post items
 */
interface MediumItem {
  title: string;
  content: string;
  description: string;
  link: string;
  pubDate: string;
  categories: string[];
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

    return data.items.map((item: MediumItem) => {
      // Try multiple ways to extract images from Medium content
      let imageUrl = "/placeholder.svg";
      
      // Method 1: Look for img tags in content
      const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i;
      const imgMatch = item.content.match(imgRegex);
      
      if (imgMatch && imgMatch[1]) {
        imageUrl = imgMatch[1];
      } else {
        // Method 2: Look for Medium's CDN images in content
        const mediumImgRegex = /https:\/\/cdn-images-\d+\.medium\.com\/[^"\s]+/i;
        const mediumMatch = item.content.match(mediumImgRegex);
        
        if (mediumMatch) {
          imageUrl = mediumMatch[0];
        } else {
          // Method 3: Look for any https image URL
          const generalImgRegex = /https:\/\/[^"\s]+\.(jpg|jpeg|png|gif|webp)/i;
          const generalMatch = item.content.match(generalImgRegex);
          
          if (generalMatch) {
            imageUrl = generalMatch[0];
          }
        }
      }

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
