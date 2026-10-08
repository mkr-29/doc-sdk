import { useState, useEffect } from 'react';

export interface ScrollSpyOptions {
  rootMargin?: string;
  threshold?: number | number[];
}

/**
 * Headless hook observing visible headings or section IDs on scroll.
 */
export function useScrollSpy(
  targetIds: string[],
  options: ScrollSpyOptions = {}
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    if (!targetIds || targetIds.length === 0) {
      return;
    }

    const { rootMargin = '-80px 0px -40% 0px', threshold = [0, 0.5, 1] } = options;

    const observer = new IntersectionObserver((entries) => {
      // Find the first intersecting entry
      const visible = entries.find((e) => e.isIntersecting);
      if (visible) {
        setActiveId(visible.target.id);
      }
    }, {
      rootMargin,
      threshold,
    });

    const elements: HTMLElement[] = [];
    for (const id of targetIds) {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
        elements.push(el);
      }
    }

    return () => {
      for (const el of elements) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [targetIds, options.rootMargin, options.threshold]);

  return activeId;
}
