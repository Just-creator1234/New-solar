import { useEffect, useRef } from "react";

export function useAutoSave(data, saveCallback, setLastSaved) {
  const timeoutRef = useRef(null);
  const prevDataRef = useRef(JSON.stringify(data));

  useEffect(() => {
    const currentData = JSON.stringify(data);

    // If data hasn't changed, skip
    if (currentData === prevDataRef.current) return;

    // Debounce save
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        await saveCallback(); // Custom save function (calls server)
        prevDataRef.current = currentData;
        if (setLastSaved) {
          setLastSaved(new Date());
        }
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 2000); // 2 seconds debounce

    return () => clearTimeout(timeoutRef.current);
  }, [data, saveCallback, setLastSaved]);
}
