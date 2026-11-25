import { useEffect, useRef, useState } from 'react';

/**
 * The project's single reveal-on-scroll implementation.
 *
 * Returns a ref to attach to the element and whether it has entered the
 * viewport yet. Pair with the global `.reveal` class and the
 * `data-revealed` attribute, which carry the transition.
 */
export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Without observer support, show the content rather than hide it forever.
    if (typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
