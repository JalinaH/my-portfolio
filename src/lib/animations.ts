"use client";

import type React from "react";

import { useEffect, useState } from "react";

export function typeText(element: HTMLElement, phrases: string[], speed = 100) {
  let timer: ReturnType<typeof setTimeout>;
  let cancelled = false;
  let phraseIndex = 0;
  let count = 0;
  let deleting = false;
  const phrasesToType = phrases.filter(Boolean);
  if (!phrasesToType.length) return () => {};
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  function loop() {
    if (cancelled) return;
    const phrase = phrasesToType[phraseIndex];
    count += deleting ? -1 : 1;
    element.textContent = phrase.slice(0, count);
    let delay = deleting ? speed / 2 : speed;
    if (count === phrase.length) { deleting = true; delay = 1000; }
    else if (count === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrasesToType.length; delay = 500; }
    timer = setTimeout(loop, delay);
  }
  function updateMotion() {
    clearTimeout(timer);
    if (motion.matches) element.textContent = phrasesToType[0];
    else { count = 0; deleting = false; loop(); }
  }
  motion.addEventListener("change", updateMotion);
  updateMotion();
  return () => { cancelled = true; clearTimeout(timer); motion.removeEventListener("change", updateMotion); };
}

export function scrollToSection(selector: string) {
  document.querySelector(selector)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
  });
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
