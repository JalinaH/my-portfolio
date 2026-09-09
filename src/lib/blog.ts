import { XMLParser } from "fast-xml-parser";

export interface Blog {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  date: string;
  tags: string[];
}
function safeUrl(value: unknown, hosts: string[]) {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && hosts.includes(url.hostname) ? url.href : undefined;
  } catch { return undefined; }
}
export function parseMediumPosts(xml: string): Blog[] {
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "", processEntities: false });
  const items = parser.parse(xml)?.rss?.channel?.item;
  if (!items) return [];
  return (Array.isArray(items) ? items : [items]).flatMap(item => {
    const url = safeUrl(item.link, ["medium.com", "jalinah.medium.com"]);
    if (!url || typeof item.title !== "string") return [];
    const content = typeof item["content:encoded"] === "string" ? item["content:encoded"] : "";
    const src = content.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1];
    const description = content.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
    const date = new Date(item.pubDate);
    const categories: unknown[] = Array.isArray(item.category) ? item.category : [item.category];
    return [{
      title: item.title,
      description: description.slice(0, 200) + (description.length > 200 ? "…" : ""),
      imageUrl: safeUrl(src, ["cdn-images-1.medium.com", "cdn-images-2.medium.com", "miro.medium.com"]) || "/placeholder.svg",
      url,
      date: Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }),
      tags: categories.filter((tag): tag is string => typeof tag === "string").slice(0, 3),
    }];
  });
}
export async function getMediumPosts(): Promise<Blog[]> {
  try {
    const response = await fetch("https://medium.com/feed/@jalinah", { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) throw new Error("Feed unavailable");
    return parseMediumPosts(await response.text());
  } catch {
    console.error("Medium feed unavailable");
    return [];
  }
}
