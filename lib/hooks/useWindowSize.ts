import { useState, useEffect } from 'react';

/**
 * Represents the dimensions of the browser window.
 */
type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

/**
 * A React hook that tracks the browser window size and updates dynamically on resize.
 * Safe for use in SSR environments like Next.js.
 *
 * @returns {WindowSize} An object containing `{ width, height }` representing the window's current size.
 *                       Values are `undefined` during SSR and initial render until the component mounts.
 */

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}
