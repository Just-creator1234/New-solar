"use client";

import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

export default function SaveBookmarkButton() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    setIsMobile(/Mobi|Android/i.test(userAgent));
  }, []);

  const handleSaveClick = () => {
    if (navigator.share && isMobile) {
      // ✅ Use native share on mobile
      navigator
        .share({
          title: document.title,
          text: "Check out this article!",
          url: window.location.href,
        })
        .catch((err) => console.log("Sharing failed", err));
    } else {
      // ✅ Show shortcut tip on desktop
      alert("Press Ctrl+D (or Cmd+D on Mac) to bookmark this page.");
    }
  };

  return (
    <button
      onClick={handleSaveClick}
      className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 text-green-700 dark:text-green-400 transition-all duration-200 border border-green-200/50 dark:border-green-700/50 hover:border-green-300 dark:hover:border-green-600 shadow-sm hover:shadow-md"
    >
      <Bookmark
        size={18}
        className="group-hover:scale-110 transition-transform"
      />
      <span className="font-medium">Save</span>
    </button>
  );
}
