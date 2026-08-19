"use client";

import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export function SectionAnimations({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = root.current;
    if (!container) return;
    const sections = Array.from(
      container.querySelectorAll<HTMLElement>("[data-animate-section]"),
    );
    const itemsBySection = new Map(
      sections
        .map(
          (section) =>
            [
              section,
              Array.from(
                section.querySelectorAll<HTMLElement>("[data-animate-item]"),
              ),
            ] as const,
        )
        .filter(([, items]) => items.length > 0),
    );
    const animatedItems = Array.from(itemsBySection.values()).flat();

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (animatedItems.length) {
        gsap.set(animatedItems, { clearProps: "all" });
      }
      return;
    }
    const context = gsap.context(
      () =>
        itemsBySection.forEach((items) =>
          gsap.set(items, {
            autoAlpha: 0,
            y: 28,
          }),
        ),
      container,
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const section = entry.target as HTMLElement;
          const items = itemsBySection.get(section);
          if (!items?.length) return;
          gsap.to(items, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.09,
            ease: "power3.out",
          });
          observer.unobserve(section);
        }),
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );
    itemsBySection.forEach((_, section) => observer.observe(section));
    return () => {
      observer.disconnect();
      context.revert();
    };
  }, []);
  return <div ref={root}>{children}</div>;
}
