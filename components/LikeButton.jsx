"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const randomLikes = Math.floor(Math.random() * 100) + 5;
    setLikes(randomLikes);
  }, []);

  const handleLike = () => {
    setLikes((prev) => prev + 1);
  };

  return (
    <button
      onClick={handleLike}
      className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 dark:hover:from-red-900/30 dark:hover:to-pink-900/30 text-red-700 dark:text-red-400 transition-all duration-200 border border-red-200/50 dark:border-red-700/50 hover:border-red-300 dark:hover:border-red-600 shadow-sm hover:shadow-md"
    >
      <Heart
        size={18}
        className="group-hover:scale-110 transition-transform"
      />
      <span className="font-medium">Like</span>
      <span className="text-xs bg-red-100 dark:bg-red-900/40 px-2 py-1 rounded-full">
        {likes}
      </span>
    </button>
  );
}
