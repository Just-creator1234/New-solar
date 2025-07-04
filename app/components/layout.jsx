import React from 'react'

// This layout component wraps all pages in the Slider directory.
// It ensures the theme (dark/light) is applied and provides a consistent structure.
// It expects a 'children' prop to render the page content.

export default function SliderLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {children}
    </div>
  );
}