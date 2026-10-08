import { useEffect, useCallback } from 'react';

export interface AnchorScrollOptions {
  offset?: number;
  behavior?: ScrollBehavior;
}

/**
 * Headless hook handling deep-linking and smooth scrolling to anchor IDs with header offset compensation.
 */
export function useAnchorScroll(options: AnchorScrollOptions = {}) {
  const { offset = 80, behavior = 'smooth' } = options;

  const scrollToAnchor = useCallback(
    (anchorId: string) => {
      const cleanId = anchorId.replace(/^#/, '');
      const element = document.getElementById(cleanId);

      if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior,
        });

        // Update URL hash without jump
        if (window.history.pushState) {
          window.history.pushState(null, '', `#${cleanId}`);
        }
      }
    },
    [offset, behavior]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleHash = () => {
      if (window.location.hash) {
        scrollToAnchor(window.location.hash);
      }
    };

    // Scroll on initial mount if hash is present
    if (window.location.hash) {
      setTimeout(handleHash, 100);
    }

    window.addEventListener('hashchange', handleHash);
    return () => {
      window.removeEventListener('hashchange', handleHash);
    };
  }, [scrollToAnchor]);

  return { scrollToAnchor };
}
