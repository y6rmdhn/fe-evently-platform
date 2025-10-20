import { useRef } from "react";

const useDebounce = () => {
  const debounceTime = useRef<NodeJS.Timeout | null>(null);

  const debounce = (func: Function, delay: number) => {
    if (debounceTime.current) clearTimeout(debounceTime.current);

    debounceTime.current = setTimeout(() => {
      func();

      debounceTime.current = null;
    }, delay);
  };

  return debounce;
};

export default useDebounce;
