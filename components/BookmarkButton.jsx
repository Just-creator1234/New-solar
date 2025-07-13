"use client";

import React, { useState } from "react";
import { Bookmark, Check, Copy } from "lucide-react";

const BookmarkButton = () => {
  const [isShared, setIsShared] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message) => {
    setShowToast(message);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleBookmark = async () => {
    const url = window.location.href;
    const title = document.title;

    // Check if Web Share API is supported (usually on mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      } catch (error) {
        // User canceled the share or an error occurred
        if (error.name !== "AbortError") {
          console.error("Share failed:", error);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url);
        showToastMessage("Link copied to clipboard!");
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        showToastMessage("Link copied to clipboard!");
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleBookmark}
        className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 transition-colors duration-200 active:scale-95"
        aria-label="Share or bookmark this page"
      >
        {isShared ? (
          <Check size={16} className="text-green-500" />
        ) : (
          <Bookmark size={16} />
        )}
      </button>

      {/* Toast notification */}
      {showToast && (
        <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg z-50 flex items-center gap-2">
          <Copy size={14} />
          {showToast}
        </div>
      )}
    </div>
  );
};

export default BookmarkButton;
