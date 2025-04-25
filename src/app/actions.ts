"use server";

import { XMLParser } from "fast-xml-parser";

interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  content: string;
  categories?: string[];
  thumbnail?: string;
}

export async function getMediumPosts(username: string): Promise<MediumPost[]> {
  try {
    // Fetch the RSS feed from Medium
    const response = await fetch(`https://medium.com/feed/@${username}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Medium posts: ${response.status}`);
    }

    const xml = await response.text();

    // Parse the XML
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
    });

    const result = parser.parse(xml);
    const items = result.rss.channel.item;

    // Process the items
    return (Array.isArray(items) ? items : [items]).map((item: any) => {
      // Extract the first image from the content if available
      let thumbnail = undefined;
      const imgMatch = item["content:encoded"]?.match(
        /<img[^>]+src="([^">]+)"/
      );
      if (imgMatch && imgMatch[1]) {
        thumbnail = imgMatch[1];
      }

      // Extract a clean excerpt from the content
      let content = item["content:encoded"] || "";
      content = content
        .replace(/<[^>]+>/g, "") // Remove HTML tags
        .substring(0, 150) // Limit to 150 characters
        .trim();

      if (content.length >= 150) {
        content += "...";
      }

      return {
        title: item.title,
        link: item.link,
        pubDate: new Date(item.pubDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        content,
        categories: item.category
          ? Array.isArray(item.category)
            ? item.category
            : [item.category]
          : [],
        thumbnail: thumbnail || "/placeholder.svg?height=300&width=500",
      };
    });
  } catch (error) {
    console.error("Error fetching Medium posts:", error);
    return [];
  }
}
