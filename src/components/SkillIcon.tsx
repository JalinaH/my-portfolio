"use client";

import Image from "next/image";

interface SkillIconProps {
  name: string;
  icon: string;
}

const getSkillMark = (name: string) => {
  const cleaned = name.replace(/\(.*?\)/g, "").trim();
  const parts = cleaned.split(/[^A-Za-z0-9#+]+/).filter(Boolean);

  if (parts.length === 0) return "NA";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
};

export default function SkillIcon({ name, icon }: SkillIconProps) {
  const mark = getSkillMark(name);

  return (
    <div className="skill-icon-wrapper">
      <div className="skill-icon">
        <span className="skill-icon-orbit" aria-hidden="true" />
        <span className="skill-icon-plate" aria-hidden="true" />
        <span className="skill-icon-spark" aria-hidden="true" />
        <span
          className="skill-icon-spark secondary"
          aria-hidden="true"
        />
        <Image
          src={icon}
          alt={name}
          width={40}
          height={40}
          className="skill-icon-image"
        />
        <span className="skill-icon-mark">{mark}</span>
      </div>
      <span className="skill-name">{name}</span>
    </div>
  );
}
