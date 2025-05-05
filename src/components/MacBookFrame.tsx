"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MacBookFrameProps {
  imageUrl: string;
  onClick?: () => void;
}

export default function MacBookFrame({ imageUrl, onClick }: MacBookFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="h-[280px] w-full cursor-pointer relative"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`macbook-frame ${isHovered ? "hovered" : ""}`}>
        <div className="macbook-top">
          <div className="macbook-screen">
            <div className="macbook-camera"></div>
            <div className="macbook-screen-content">
              <Image
                src={imageUrl}
                alt="Project screenshot"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
        <div className="macbook-bottom">
          <div className="macbook-notch"></div>
        </div>
      </div>
    </div>
  );
}
