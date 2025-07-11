"use client";

import { useState, useEffect } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton({ title = "Check this out!" }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
  }, []);

  const handleShare = async () => {
    if (!url) return;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (error) {
        console.warn("Share cancelled or failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 text-blue-700 dark:text-blue-400 transition-all duration-200 border border-blue-200/50 dark:border-blue-700/50 hover:border-blue-300 dark:hover:border-blue-600 shadow-sm hover:shadow-md"
    >
      {copied ? (
        <Check size={18} className="text-green-500 transition-transform" />
      ) : (
        <Share2 size={18} className="group-hover:scale-110 transition-transform" />
      )}
      <span className="font-medium">{copied ? "Copied!" : "Share"}</span>
    </button>
  );
}
