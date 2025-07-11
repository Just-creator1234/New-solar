import { useEffect, useRef } from "react";

export function useAutoSave(data, saveCallback, setLastSaved) {
  const timeoutRef = useRef(null);
  const prevDataRef = useRef(JSON.stringify(data));

  useEffect(() => {
    if (data.status === "PUBLISHED") return; // ❌ skip autosave if published

    const currentData = JSON.stringify(data);
    if (currentData === prevDataRef.current) return;

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        await saveCallback();
        prevDataRef.current = currentData;
        if (setLastSaved) setLastSaved(new Date());
      } catch (error) {
        console.error("Auto-save failed:", error);
      }
    }, 2000);

    return () => clearTimeout(timeoutRef.current);
  }, [data, saveCallback, setLastSaved]);
}
