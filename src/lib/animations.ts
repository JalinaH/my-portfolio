"use client";

import type React from "react";

import { useEffect, useState } from "react";

export function typeText(element: HTMLElement, phrases: string[], speed = 100) {
  let i = 0;
  let j = 0;
  let currentPhrase = "";
  let isDeleting = false;

  function loop() {
    currentPhrase = phrases[i];

    if (isDeleting) {
      element.textContent = currentPhrase.substring(0, j - 1);
      j--;

      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % phrases.length;
        setTimeout(loop, 500);
        return;
      }
    } else {
      element.textContent = currentPhrase.substring(0, j + 1);
      j++;

      if (j === currentPhrase.length) {
        isDeleting = true;
        setTimeout(loop, 1000);
        return;
      }
    }

    const speedFactor = isDeleting ? 0.5 : 1;
    setTimeout(loop, speed * speedFactor);
  }

  loop();
}

interface UseInViewOptions {
  once?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export function useInView(
  ref: React.RefObject<Element>,
  options: UseInViewOptions = {}
) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const currentElement = ref.current; // Store ref.current in a variable

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);

        if (entry.isIntersecting && options.once) {
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: options.threshold || 0,
        rootMargin: options.rootMargin || "0px",
      }
    );

    observer.observe(currentElement);

    return () => {
      observer.unobserve(currentElement); // Use the stored variable
    };
  }, [ref, options.once, options.threshold, options.rootMargin]);

  return isInView;
}
