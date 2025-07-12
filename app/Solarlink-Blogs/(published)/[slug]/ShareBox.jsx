"use client";

import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ShareBox({ title, slug }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const shareUrl = `${baseUrl}/blog/${slug}`;
  const encodedTitle = encodeURIComponent(title || "Check out this article!");

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link.");
    }
  };

  return (
    <div className="p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Share this article
      </h3>
      <div className="grid grid-cols-2 gap-3 ">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
            shareUrl
          )}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-colors"
        >
          <Twitter size={16} />
          <span className="text-sm font-medium">Twitter</span>
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-colors"
        >
          <Facebook size={16} />
          <span className="text-sm font-medium">Facebook</span>
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-400 transition-colors"
        >
          <Linkedin size={16} />
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
        >
          <Link2 size={16} />
          <span className="text-sm font-medium">Copy</span>
        </button>
      </div>
    </div>
  );
}
