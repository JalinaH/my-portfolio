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
    <div
      className={cn(
        "mb-12 flex items-center justify-between gap-4",
        className
      )}
    >
      <div>
        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-400">
          / {title}
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-100">
          {title}
        </h2>
        <div className="mt-2 h-[3px] w-24 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500" />
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent sm:block" />
    </div>
  );
}
