'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface SkillIconProps {
  name: string;
  icon: string;
}

export default function SkillIcon({ name, icon }: SkillIconProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="skill-icon-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`skill-icon ${isHovered ? 'hovered' : ''}`}>
        <div className="skill-icon-face skill-icon-front">
          <Image 
            src={icon}
            alt={name}
            width={40}
            height={40}
          />
        </div>
        <div className="skill-icon-face skill-icon-back">
          <span className="skill-name">{name}</span>
        </div>
        <div className="skill-icon-face skill-icon-right"></div>
        <div className="skill-icon-face skill-icon-left"></div>
        <div className="skill-icon-face skill-icon-top"></div>
        <div className="skill-icon-face skill-icon-bottom"></div>
      </div>
    </div>
  );
}