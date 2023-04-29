import { useCallback, useRef } from "react";

export const useIntersectionObserver = (
  onIntersection: (entry: IntersectionObserverEntry) => void,
  threshold = 0
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry && entry.isIntersecting) {
        onIntersection(entry);
      }
    },
    [onIntersection]
  );

  const disconnectObserver = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  }, []);

  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (!node) {
        disconnectObserver();
        return;
      }

      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(handleIntersection, {
          threshold,
        });
      }

      observerRef.current.observe(node);

      return node;
    },
    [disconnectObserver, handleIntersection, threshold]
  );

  return lastElementRef;
};
