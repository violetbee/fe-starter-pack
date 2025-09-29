import { useState, useEffect, useRef } from "react";

interface UseDebounceOptions {
  leading?: boolean;
  trailing?: boolean;
}

function useDebounce<T>(
  value: T,
  delay: number,
  options: UseDebounceOptions = { leading: false, trailing: true }
): T {
  const { leading = false, trailing = true } = options;

  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const leadingCalledRef = useRef(false);

  useEffect(() => {
    if (leading && !leadingCalledRef.current) {
      setDebouncedValue(value);
      leadingCalledRef.current = true;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (trailing) {
      timeoutRef.current = setTimeout(() => {
        if (!leading || leadingCalledRef.current) {
          setDebouncedValue(value);
        }
        leadingCalledRef.current = false;
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, delay, leading, trailing]);

  return debouncedValue;
}

export default useDebounce;
