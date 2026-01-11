import {useCallback, useEffect, useState} from "react";

/**
 * useInfiniteScroll Hook
 *
 * Custom hook for implementing infinite scroll functionality.
 * Detects when user scrolls to bottom and triggers a callback.
 *
 * Features:
 * - Window-based scroll detection
 * - Configurable bottom threshold
 * - Prevents multiple rapid triggers
 * - Cleanup of event listeners
 * - Simple callback-based interface
 *
 * @param {Function} onScrollBottom - Callback function when scroll reaches bottom
 * @param {Object} options - Configuration options
 * @param {number} [options.threshold=500] - Distance from bottom to trigger (px)
 * @param {number} [options.delay=1000] - Delay before next trigger allowed (ms)
 * @param {boolean} [options.enabled=true] - Enable/disable the hook
 *
 * @returns {Object} Hook state and methods
 * @returns {boolean} isLoading - Currently loading state
 * @returns {Function} reset - Reset loading state manually
 *
 * @example
 * const { isLoading } = useInfiniteScroll(() => {
 *   console.log("Load more posts");
 *   dispatch(getMorePosts());
 * }, { threshold: 500, delay: 1000 });
 *
 * return isLoading ? <Loading /> : null;
 */

interface UseInfiniteScrollOptions {
  threshold?: number;
  delay?: number;
  enabled?: boolean;
}

export const useInfiniteScroll = (
  onScrollBottom: () => void,
  options: UseInfiniteScrollOptions = {}
) => {
  const {threshold = 500, delay = 500, enabled = true} = options;

  const [isLoading, setIsLoading] = useState(false);

  const reset = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const clientHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;

      if (isAtBottom && !isLoading) {
        setIsLoading(true);
        onScrollBottom();
      }
    };

    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeout);
    }

    window.addEventListener("scroll", handleScroll, {passive: true});

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, enabled, threshold, delay, onScrollBottom]);

  return {isLoading, reset};
};

export default useInfiniteScroll;
