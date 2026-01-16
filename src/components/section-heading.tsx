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
        <p className="text-[10px] uppercase tracking-[0.35em] text-emerald-300/80">
          Logbook
        </p>
        <h2 className="text-3xl font-semibold text-slate-100 md:text-4xl">
          {title}
        </h2>
        <div className="mt-3 h-px w-28 bg-gradient-to-r from-emerald-300 via-cyan-300 to-transparent" />
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent sm:block" />
    </div>
  );
}
