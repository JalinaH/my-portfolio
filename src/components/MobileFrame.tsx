"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MobileFrameProps {
  imageUrl: string;
  onClick?: () => void;
}

export default function MobileFrame({ imageUrl, onClick }: MobileFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-[280px] w-full cursor-pointer relative"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`mobile-frame ${isHovered ? "hovered" : ""}`}>
        <div className="mobile-body">
          <div className="mobile-notch"></div>
          <div className="mobile-screen">
            <Image
              src={imageUrl}
              alt="Mobile project screenshot"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="mobile-home-indicator"></div>
        </div>
      </div>
    </div>
  );
}
