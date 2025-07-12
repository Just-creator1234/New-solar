"use client";

import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

export default function ViewCounter() {
  const [views, setViews] = useState(0);

  useEffect(() => {
    const randomViews = Math.floor(Math.random() * 2000) + 100;
    setViews(randomViews);
  }, []);

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400">
      <Eye size={16} />
      <span>{views.toLocaleString()} views</span>
    </div>
  );
}
