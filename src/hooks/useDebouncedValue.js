"use client";
import { useEffect, useState } from "react";
import useDebounceCallback from "./useDebounceCallback";

const useDebouncedValue = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // Create debounced function to update the debounced value
  const debouncedSetValue = useDebounceCallback((newValue) => {
    setDebouncedValue(newValue);
  }, delay);

  // Update debounced value when input value changes
  useEffect(() => {
    debouncedSetValue(value);
  }, [value, debouncedSetValue]);

  return {
    debouncedValue,
    isDebouncing: value !== debouncedValue,
  };
};

export default useDebouncedValue;
