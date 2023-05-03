import { useCallback, useRef } from "react";

const useIntersectionObserver = (
  onIntersection: (entry: IntersectionObserverEntry) => void // callback function containing the fetchNextPage function
) => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  // useCallback is used to prevent the function from being recreated on every render

  // event listener for the intersection observer
  const handleIntersection = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (entry && entry.isIntersecting) {
        // if the element is in view, call the callback function that contains the fetchNextPage function
        onIntersection(entry);
      }
    },
    // triggers lastElementRef to be called since lastElementRef's dependency array contains handleIntersection
    [onIntersection]
  );

  // disconnect previous observer if any
  const disconnectObserver = () => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  // function will be called first time when the component is mounted. dependency array will trigger handleIntersection function to be called
  const lastElementRef = useCallback(
    (node: Element | null) => {
      if (!node) {
        disconnectObserver();
        return;
      }

      if (!observerRef.current) {
        observerRef.current = new IntersectionObserver(handleIntersection, {});
      }

      observerRef.current.observe(node);

      return node;
    },
    // receives the last element ref and triggers lastElementRef to be called
    [handleIntersection]
  );

  return lastElementRef;
};

export default useIntersectionObserver;
