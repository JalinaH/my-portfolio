import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  className?: string;
}

export default function SectionHeading({
  title,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", className)}>
      <h2 className="text-3xl md:text-4xl font-bold relative inline-block">
        {title}
        <span className="absolute bottom-0 left-0 w-1/2 h-1 bg-green-500 rounded-full"></span>
      </h2>
    </div>
  );
}
