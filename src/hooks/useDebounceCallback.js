"use client";
import { useCallback, useEffect, useRef } from "react";

// Returns a stable debounced function without exposing cancel/flush.
// It automatically clears pending timeouts on re-run and unmount.
const useDebounceCallback = (callback, delay = 300) => {
  const timerRef = useRef();
  const savedCallbackRef = useRef(callback);

  // Always keep latest callback
  useEffect(() => {
    savedCallbackRef.current = callback;
  }, [callback]);

  // Clear on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const debounced = useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = undefined;
        savedCallbackRef.current(...args);
      }, delay);
    },
    [delay]
  );

  return debounced;
};

export default useDebounceCallback;
