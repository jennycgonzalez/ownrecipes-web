import { useLayoutEffect, useState } from 'react';

/**
 * Coded by Sophie Alpert.
 *
 * See: https://stackoverflow.com/a/19014495
 */

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return size;
}
